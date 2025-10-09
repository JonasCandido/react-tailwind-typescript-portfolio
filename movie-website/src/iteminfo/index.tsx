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
const creditsFetchFailure = 'CREDITS_FETCH_SUCCESS';

const videosFetchInit = 'VIDEOS_FETCH_INIT';                                                                                     
const videosFetchSuccess = 'VIDEOS_FETCH_SUCCESS';                                                                               
const videosFetchFailure = 'VIDEOS_FETCH_SUCCESS';                                                                                    

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
  const [videos, dispatchVideos] = useReducer(videosReducer, {data:"", isLoading:false,isError:false});

  useEffect(() => {
    dispatchDetails({type:detailsFetchInit})
    axios.get(`${BASE_QUERY}${itemId}?api_key=${api_key}`).then(result => {
      console.log(result);
      dispatchDetails({type:detailsFetchSuccess, payload:result.data.data,})
    })
      .catch(() => dispatchDetails({type: detailsFetchFailure}))
  },[itemId])
  
  return ( "AAAAAA" );
};

const Credits = () => {
  const [credits, dispatchCredits] = useReducer(creditsReducer, {data:"", isLoading:false,isError:false});
};

export { ItemInfo };
