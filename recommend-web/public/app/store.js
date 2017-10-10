import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import messageReducer from "./pf-lib/message/messageReducer";
import modalReducer from "./pf-lib/modal/modalReducer";
import movieReducer from "./movieRating/movieReducers";
import arReducer from "./addRating/addRatingReducers";


export default createStore(
  combineReducers({
    modalReducer,
    messageReducer,
    movieReducer,
    arReducer,
  }),
  applyMiddleware(thunk)
);

