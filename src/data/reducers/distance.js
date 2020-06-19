import {
    SET_KILOMETERS_RADIUS,
SET_CITY_POPULATION,
SET_RANDOM_CORD
} from '../constants/ActionTypes'

const initialsState = {
    randomCord: null,
    kilometersRadius: 0,
    cityPopulation: 0
}

export default function distance(state = initialsState, action){
    switch (action.type){
        case SET_KILOMETERS_RADIUS:
            return (
               { ...state,
                    kilometersRadius: action.kilometers 
                }
            )
           case SET_CITY_POPULATION:
               return (
                   {
                       ...state,
                       cityPopulation: action.cityPopulation
                   }
               )
               case SET_RANDOM_CORD:
                   return (
                       {
                           ...state,
                           randomCord: action.randomCord
                       }
                   )
        default: return state
    }
}