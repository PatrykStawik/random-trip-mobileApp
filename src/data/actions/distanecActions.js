import * as actionTypes from '../constants/ActionTypes';

export const setKilometers = (kilometers)=>{
    return {
        type: actionTypes.SET_KILOMETERS_RADIUS,
        kilometers
    }
}

export const setCityPopulation = (cityPopulation)=>({
    type: actionTypes.SET_CITY_POPULATION,
    cityPopulation
})

export const setRandomCord = (randomCord)=>({
    type: actionTypes.SET_RANDOM_CORD,
    randomCord
})