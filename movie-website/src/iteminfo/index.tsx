import axios from 'axios';
import { useReducer, useEffect } from "react";
import { useParams } from "react-router";

interface ItemInfoState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
};


interface ItemInfoAction {
  type: string;
  payload?: any;
};

const BASE_QUERY = 'https://api.themoviedb.org/3/movie/';
const api_key = "b6fc758812b079a8170bcb081bb7da04";

const detailsFetchInit = 'DETAILS_FETCH_INIT';
const detailsFetchSuccess = 'DETAILS_FETCH_SUCCESS';
const detailsFetchFailure = 'DETAILS_FETCH_FAILURE';

const creditsFetchInit = 'CREDITS_FETCH_INIT';
const creditsFetchSuccess = 'CREDITS_FETCH_SUCCESS';
const creditsFetchFailure = 'CREDITS_FETCH_FAILURE';

const videosFetchInit = 'VIDEOS_FETCH_INIT';                                                                                     
const videosFetchSuccess = 'VIDEOS_FETCH_SUCCESS';                                                                               
const videosFetchFailure = 'VIDEOS_FETCH_FAILURE';                                                                                    

const detailsReducer = (state: ItemInfoState,action: ItemInfoAction) => {
    switch(action.type){
        case detailsFetchInit:
            return {...state,isLoading:true,isError:false,};
        case detailsFetchSuccess:
            return {...state,isLoading:false,isError:false,data:action.payload,};
        case detailsFetchFailure:
            return {...state, isLoading:false, isError:true,};
        default: throw new Error();
    };
};

const creditsReducer = (state: ItemInfoState,action: ItemInfoAction) => {
    switch(action.type){
        case creditsFetchInit:
            return {...state,isLoading:true,isError:false,};
        case creditsFetchSuccess:
            return {...state,isLoading:false,isError:false,data:action.payload,};
        case creditsFetchFailure:
            return {...state, isLoading:false, isError:true,};
        default: throw new Error();
    };
};

const videosReducer = (state: ItemInfoState,action: ItemInfoAction) => {
    switch(action.type){
        case videosFetchInit:
            return {...state,isLoading:true,isError:false,};
        case videosFetchSuccess:
            return {...state,isLoading:false,isError:false,data:action.payload,};
        case videosFetchFailure:
            return {...state, isLoading:false, isError:true,};
        default: throw new Error();
    };
};

const ItemInfo = () => {
  const { itemId } = useParams();
  const [details, dispatchDetails] = useReducer(detailsReducer, {data:"", isLoading:false,isError:false});
  const [videos, dispatchVideos] = useReducer(videosReducer, {data: { results: [] }, isLoading:false,isError:false});

  useEffect(() => {
    dispatchDetails({type:detailsFetchInit})
    axios.get(`${BASE_QUERY}${itemId}?api_key=${api_key}`).then(result => {
      console.log(result);
      dispatchDetails({type:detailsFetchSuccess, payload:result.data,})
    })
      .catch(() => dispatchDetails({type: detailsFetchFailure}));
  },[itemId]);

  useEffect(() => {
    dispatchVideos({type:videosFetchInit})
    axios.get(`${BASE_QUERY}${itemId}/videos?api_key=${api_key}`).then(result => {
      console.log(result);
      dispatchVideos({type:videosFetchSuccess, payload:result.data,});
    })
      .catch(() => dispatchVideos({type: videosFetchFailure}));
  },[]);
  
    
  return (
      <main>
          <section>
              <article>
                  <div>
                      <h2>{details.data.title}</h2>
                      <img src={`https://image.tmdb.org/t/p/w200${details.data.poster_path}`} />
                  </div>
                  {videos.data.results.length > 0 && (
                      <iframe
                          src={`https://www.youtube.com/embed/${videos.data.results[0].key}`}
                          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                      ></iframe>
                  )}
                  <title>{details.data.title + " | JWMovies"}</title>
                  <meta name="description" content={details.data.overview} />
                  <meta property="og:title" content={details.data.title + " | JWMovies"} />
                  <meta property="og:description" content={details.data.overview} />
                  <p>{details.data.overview}</p>
                  <Credits itemId={itemId}/>
                  <h3>Runtime</h3>
                  <p>{details.data.runtime} minutes</p>
                  <h3>Genres</h3>
                  {details.data?.genres?.map((genre: any) => genre.name).join(", ")}
              </article>
          </section>
      </main>
  );
};

interface CreditsProps {
  itemId?: string;
}

const Credits = ( {itemId}: CreditsProps ) => {
  const [credits, dispatchCredits] = useReducer(creditsReducer, {data: { cast: [] }, isLoading:false,isError:false});

  useEffect(() => {
    if (!itemId) return;
    dispatchCredits({type:creditsFetchInit});
      
    axios.get(`${BASE_QUERY}${itemId}/credits?api_key=${api_key}`).then(result => {
      dispatchCredits({type:creditsFetchSuccess, payload:result.data,})
    })
      .catch(() => dispatchCredits({type: creditsFetchFailure}))
  },[]);

  return (
      <section>
          <h3>Cast</h3>

          {!credits.isLoading && credits.data?.cast?.length > 0 && (
              <ul>
                  {credits.data.cast.slice(0, 10).map((actor: any) => (
                      <li key={actor.id}>
                          {actor.name} — {actor.character}
                      </li>
                  ))}
              </ul>
          )}
      </section>
  );
    
};

export { ItemInfo };
