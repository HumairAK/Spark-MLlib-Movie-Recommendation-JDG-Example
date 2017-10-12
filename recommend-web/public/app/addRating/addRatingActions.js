import { AR } from './addRatingConstants'
import { ROUTES } from '../routes.js'
export function handleGetRec(data){
  console.log(data);
  return (dispatch) => {
    $.ajax({
      type: 'POST',
      url: ROUTES.AR.ADD_MOVIE_RATING,
      data: JSON.stringify(data),
      dataType: 'json',
      contentType: 'application/json',
      success: function (result) {
        // result should have columns and dataSet
        console.log(result);
        dispatch(submitReq(result));
      },
      error: function () {}
    })
  };
}

export function submitReq(results){
  return {
    type: AR.UPDATE_DATASET,
    payload: results,
  }
}