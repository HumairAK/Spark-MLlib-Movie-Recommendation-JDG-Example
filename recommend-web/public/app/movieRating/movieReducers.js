import { AR } from "./movieRatingConstants"

const initialState = {
  stuff: {},
};

const movieRatingReducer = (state = initialState, action) => {
  switch (action.type) {
    case AR.DO_STUFF: {
      break;
    }
  }
  return state
};


export default movieRatingReducer;