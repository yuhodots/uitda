import { 
    CARPOOL_SELECT_DATE,
} from "../actions/ActionTypes";

const InitialState = {
    selectedDate: new Date(),
}


export default function carpool (state = InitialState, action) {


    switch (action.type) {

        case CARPOOL_SELECT_DATE:
            return {
                ...state,
                selectedDate: action.date
            }


        default:
            return state;
    }
}