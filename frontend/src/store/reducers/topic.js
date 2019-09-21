import { 
    TOPIC_HOME,
    TOPIC_MARKET,
    TOPIC_CARPOOL,
    TOPIC_NETWORK
} from "../actions/ActionTypes";

import { 
    HOME,
    MARKET,
    CARPOOL,
    NETWORK
} from "../actions/topic";


const InitialState = {
    topic: HOME
}

export default function topic(state = InitialState, action) {

    switch (action.type) {
        case TOPIC_HOME:
            return {
                ...state,
                topic: HOME
            }

        case TOPIC_MARKET:
            return {
                ...state,
                topic: MARKET
            }

        case TOPIC_CARPOOL:
            return {
                ...state,
                topic: CARPOOL
            }

        case TOPIC_NETWORK:
            return {
                ...state,
                topic: NETWORK
            }
    
        default:
            return state
    }



}