import initialState from "./initialState";
import { 
    FETCH_COUNTRY_DATA,
    FETCH_COUNTRY_DATA_ERROR,
    RECEIVE_COUNTRY_DATA,
 } from "../actions/actionTypes";
import { mergeDeepRight } from "ramda";

export default function stuff(state = initialState.data, action) {
    switch (action.type) {
        case FETCH_COUNTRY_DATA:
            return mergeDeepRight(state, action.data);
        case FETCH_COUNTRY_DATA_ERROR:
            return mergeDeepRight(state, action.data);
        case RECEIVE_COUNTRY_DATA:
            return mergeDeepRight(state, action.data);
        default:
            return state;
    }
}