import { useEffect, useReducer } from "react";
import axios from 'axios';

const moviesFetchInit = 'MOVIES_FETCH_INIT';
const moviesFetchSuccess = 'MOVIES_FETCH_SUCCESS';
const moviesFetchFailure = 'MOVIES_FETCH_FAILURE';
const api_key = "b6fc758812b079a8170bcb081bb7da04";
const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=";

interface MoviesState {
  data: any[];
  isLoading: boolean;
  isError: boolean;
}

interface MoviesAction {
  type: string;
  payload?: any;
}


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

const ItensListRow = () => {

  const [movies, dispatchMovies] = useReducer(moviesReducer,{data:[],isLoading:false,isError:false});
  const genreId = 12;
  const url_to_fetch = `${url}${genreId}&api_key=${api_key}`;

  useEffect(() => {
    dispatchMovies({ type: moviesFetchInit });

    axios.get(url_to_fetch)
      .then((result) => {
      console.log(result.data);
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
    <article>
      
    </article>
  );
};

export { ItensListRow };
