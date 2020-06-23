import * as actionTypes from '../constants/ActionTypes';

export const setKilometers = (kilometers)=>{
    return {
        type: actionTypes.SET_KILOMETERS_RADIUS,
        kilometers
    }
}

