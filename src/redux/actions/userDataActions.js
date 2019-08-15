import * as types from "./actionTypes";
import { fetchCountries } from "../../service/api";

const receivedData = json => ({
    type: types.RECEIVE_COUNTRY_DATA,
    data: {
      entities: json,
      waiting: false,
      error: false,
      error_detail: {}
    }
  });

const executingAPI = () => ({
    type: types.FETCH_COUNTRY_DATA,
    data: {
      waiting: true,
      error: false,
      error_detail: {}
    }
  });

  const errorOnExecuteAPIRequest = e => {
    return {
      type: types.FETCH_COUNTRY_DATA_ERROR,
      data: {
        waiting: false,
        error: true,
        error_detail: e
      }
    };
  };
  
  export const getCountries = () => {
    return (dispatch) => {
      dispatch(executingAPI());
      return fetchCountries()
        .then(json => dispatch(receivedData(json)))
        .catch(e => dispatch(errorOnExecuteAPIRequest(e)));
    };
  };