import axios from "axios";
import { useReducer, useEffect } from "react";
import { useParams } from "react-router";

interface ItemInfoState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
}

interface ItemInfoAction {
  type: string;
  payload?: any;
}

const BASE_QUERY = "https://api.themoviedb.org/3/movie/";
const api_key = "b6fc758812b079a8170bcb081bb7da04";

const detailsFetchInit = "DETAILS_FETCH_INIT";
const detailsFetchSuccess = "DETAILS_FETCH_SUCCESS";
const detailsFetchFailure = "DETAILS_FETCH_FAILURE";

const creditsFetchInit = "CREDITS_FETCH_INIT";
const creditsFetchSuccess = "CREDITS_FETCH_SUCCESS";
const creditsFetchFailure = "CREDITS_FETCH_FAILURE";

const videosFetchInit = "VIDEOS_FETCH_INIT";
const videosFetchSuccess = "VIDEOS_FETCH_SUCCESS";
const videosFetchFailure = "VIDEOS_FETCH_FAILURE";

const detailsReducer = (state: ItemInfoState, action: ItemInfoAction) => {
  switch (action.type) {
    case detailsFetchInit:
      return { ...state, isLoading: true, isError: false };
    case detailsFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case detailsFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const creditsReducer = (state: ItemInfoState, action: ItemInfoAction) => {
  switch (action.type) {
    case creditsFetchInit:
      return { ...state, isLoading: true, isError: false };
    case creditsFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case creditsFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const videosReducer = (state: ItemInfoState, action: ItemInfoAction) => {
  switch (action.type) {
    case videosFetchInit:
      return { ...state, isLoading: true, isError: false };
    case videosFetchSuccess:
      return { ...state, isLoading: false, isError: false, data: action.payload };
    case videosFetchFailure:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error();
  }
};

const ItemInfo = () => {
  const { itemId } = useParams();
  const [details, dispatchDetails] = useReducer(detailsReducer, {
    data: "",
    isLoading: false,
    isError: false,
  });
  const [videos, dispatchVideos] = useReducer(videosReducer, {
    data: { results: [] },
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatchDetails({ type: detailsFetchInit });
    axios
      .get(`${BASE_QUERY}${itemId}?api_key=${api_key}`)
      .then((result) => {
        dispatchDetails({ type: detailsFetchSuccess, payload: result.data });
      })
      .catch(() => dispatchDetails({ type: detailsFetchFailure }));
  }, [itemId]);

  useEffect(() => {
    dispatchVideos({ type: videosFetchInit });
    axios
      .get(`${BASE_QUERY}${itemId}/videos?api_key=${api_key}`)
      .then((result) => {
        dispatchVideos({ type: videosFetchSuccess, payload: result.data });
      })
      .catch(() => dispatchVideos({ type: videosFetchFailure }));
  }, []);

  return (
    <main className="max-w-[1600px] m-auto mt-10 p-4">
      <section>
        <article className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6 w-full items-center">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{details.data.title}</h2>
              <img
                className="rounded mt-2 h-[400px] mx-auto md:mx-0"
                src={`https://image.tmdb.org/t/p/w200${details.data.poster_path}`}
                alt={details.data.title}
              />
            </div>

            {videos.data.results.length > 0 && (
              <iframe
                title={details.data.title}
                className="w-full md:flex-1 h-[250px] md:h-[500px] rounded"
                src={`https://www.youtube.com/embed/${videos.data.results[0].key}`}
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          <title>{details.data.title + " | JWMovies"}</title>
          <meta name="description" content={details.data.overview} />
          <meta
            property="og:title"
            content={details.data.title + " | JWMovies"}
          />
          <meta property="og:description" content={details.data.overview} />

          <div className="w-full flex flex-col md:flex-row items-start justify-between gap-6">
            <section className="md:max-w-[60ch]">
              <h3 className="mt-4 font-semibold">Overview</h3>
              <p className="mt-2">{details.data.overview}</p>
            </section>

            <div className="flex flex-col md:flex-row md:items-start md:gap-10 w-full md:w-auto">
              <Credits itemId={itemId} />

              <div className="flex flex-col mt-4 md:mt-0">
                <section>
                  <h3 className="mt-4 font-semibold">Runtime</h3>
                  <p>{details.data.runtime} minutes</p>
                </section>

                <section>
                  <h3 className="mt-4 font-semibold">Genres</h3>
                  <p>
                    {details.data?.genres
                      ?.map((genre: any) => genre.name)
                      .join(", ")}
                  </p>
                </section>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

interface CreditsProps {
  itemId?: string;
}

const Credits = ({ itemId }: CreditsProps) => {
  const [credits, dispatchCredits] = useReducer(creditsReducer, {
    data: { cast: [] },
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    if (!itemId) return;
    dispatchCredits({ type: creditsFetchInit });

    axios
      .get(`${BASE_QUERY}${itemId}/credits?api_key=${api_key}`)
      .then((result) => {
        dispatchCredits({ type: creditsFetchSuccess, payload: result.data });
      })
      .catch(() => dispatchCredits({ type: creditsFetchFailure }));
  }, []);

  return (
    <section className="mx-0 md:mx-10 mt-4 md:mt-0">
      <h3 className="mt-4 font-semibold">Cast</h3>

      {!credits.isLoading && credits.data?.cast?.length > 0 && (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
          {credits.data.cast.slice(0, 10).map((actor: any) => (
            <li key={actor.id} className="flex flex-col">
              <span className="font-medium">{actor.name}</span>
              <span className="text-xs">{actor.character}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export { ItemInfo };
