import { 
    CARPOOL_SELECT_DATE,
} from "./ActionTypes";


export function carpoolSelectDate (date) {
    return {
        type: CARPOOL_SELECT_DATE,
        date
    }
}