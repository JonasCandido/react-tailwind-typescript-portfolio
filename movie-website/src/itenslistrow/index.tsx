import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router";
import axios from 'axios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const moviesFetchInit = 'MOVIES_FETCH_INIT';
const moviesFetchSuccess = 'MOVIES_FETCH_SUCCESS';
const moviesFetchFailure = 'MOVIES_FETCH_FAILURE';
const api_key = "b6fc758812b079a8170bcb081bb7da04";
const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

interface MoviesState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
};

interface MoviesAction {
  type: string;
  payload?: any;
};

interface ItensListRowProps {
  genre_id: number;
  row_title: string;
};

const moviesReducer = (state: MoviesState, action: MoviesAction) => {
    switch(action.type){
      case moviesFetchInit:
        return {...state,isLoading:true,isError:false,};
      case moviesFetchSuccess:
        return{...state,isLoading:false,isError:false,data:action.payload,};
      case moviesFetchFailure:
        return{...state,isLoading:false,isError:true,};
      default:
        throw new Error();
    };
};

const ItensListRow = ({genre_id, row_title}: ItensListRowProps) => {

  const [movies, dispatchMovies] = useReducer(moviesReducer,{data:[],isLoading:false,isError:false});
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null);

  const url_to_fetch = `${url}${genre_id}&api_key=${api_key}`;

  useEffect(() => {
    dispatchMovies({ type: moviesFetchInit });

    axios.get(url_to_fetch)
      .then((result) => {
      dispatchMovies({
        type: moviesFetchSuccess,
        payload: result.data.results,
      });
    })
    .catch(() =>
      dispatchMovies({ type: moviesFetchFailure })
    );
  }, []);
  
  return (
    <article className="my-5 ml-5">
      <h2 className="text-3xl my-5">{row_title}</h2>
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 10,
          },
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
        className="group relative"
      >
        {movies.data.map((movie: Movie) => (
          <SwiperSlide key={movie.id} className="relative">
            <div
              className="overflow-hidden rounded-lg cursor-pointer relative"
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
                    <Link to="/iteminfo" >
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className={`w-full h-full object-cover transition-transform duration-300 transform ${hoveredMovie === movie.id ? "scale-110" : ""
                                }`}
                        />

                        <div
                            className={`absolute inset-0 bg-black/70 text-white transition-opacity duration-300 p-4 flex flex-col justify-end ${hoveredMovie === movie.id ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <h3 className="text-lg font-bold">{movie.title}</h3>
                            <p className="text-sm mt-1">Release: {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
                            <p className="text-sm mt-1 line-clamp-3">
                                {movie.overview ? movie.overview : "No description available."}
                            </p>
                        </div>
                    </Link>
            </div>
          </SwiperSlide>
        ))}


        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity z-50" aria-label="prevButton">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity z-50" aria-label="prevButton">
          <ChevronRightIcon className="w-8 h-8" />
        </button>
      </Swiper>

    </article>
  );
};

export { ItensListRow };
