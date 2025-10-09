import axios from 'axios';
import { useParams } from "react-router";

const BASE_QUERY = ' https://api.themoviedb.org/3/movie/';

const detailsFetchInit = 'DETAILS_FETCH_INIT';
const detailsFetchSuccess = 'DETAILS_FETCH_SUCCESS';
const detailsFetchFailure = 'DETAILS_FETCH_FAILURE';

const creditsFetchInit = 'CREDITS_FETCH_INIT';
const creditsFetchSuccess = 'CREDITS_FETCH_SUCCESS';
const creditsFetchFailure = 'CREDITS_FETCH_SUCCESS';

const videosFetchInit = 'VIDEOS_FETCH_INIT';                                                                                     
const videosFetchSuccess = 'VIDEOS_FETCH_SUCCESS';                                                                               
const videosFetchFailure = 'VIDEOS_FETCH_SUCCESS';                                                                                    

const detailsReducer = (state,action) => {
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

const creditsReducer = (state,action) => {
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

const videosReducer = (state,action) => {
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
  const [details, dispatchDetails] = React.useReducer(detailsReducer, {data:"", isLoading:false,isError:false});
  const [videos, dispatchVideos] = React.useReducer(videosReducer, {data:"", isLoading:false,isError:false});
  
  return ( "AAAAAA" );
};

const Credits = () => {
  
};

export { ItemInfo };
