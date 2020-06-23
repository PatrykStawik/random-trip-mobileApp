import {
    SET_KILOMETERS_RADIUS,
} from '../constants/ActionTypes'

const initialsState = {
    kilometersRadius: 0,
}

export default function distance(state = initialsState, action){
    switch (action.type){
        case SET_KILOMETERS_RADIUS:
            return (
               { ...state,
                    kilometersRadius: action.kilometers 
                }
            )
           
        default: return state
    }
}