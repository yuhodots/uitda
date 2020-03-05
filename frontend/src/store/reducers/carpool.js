import { 
    CARPOOL_SELECT_DATE,
} from "../actions/ActionTypes";

const InitialState = {

}


export default function carpool (state = InitialState, action) {


    switch (action.type) {

        case CARPOOL_SELECT_DATE:
            return state;


        default:
            return state;
    }
}