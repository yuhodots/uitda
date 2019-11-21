import { 
    TOPIC_HOME,
    TOPIC_MARKET,
    TOPIC_CARPOOL,
    TOPIC_NETWORKING
} from "./ActionTypes";


export const HOME = 'home';
export const MARKET = 'market';
export const CARPOOL = 'carpool';
export const NETWORKING = 'networking';


export function topicSelect(topic) {
    switch (topic) {
        case HOME:
            return {
                type: TOPIC_HOME
            }
        
        case MARKET:
            return {
                type: TOPIC_MARKET
            }

        case CARPOOL:
            return {
                type: TOPIC_CARPOOL
            }
    
        case NETWORKING:
            return {
                type: TOPIC_NETWORKING
            }

        default:
            return
    }
}

// export function topicHome() {
//     return {
//         type: TOPIC_HOME
//     }
// }

// export function topicMarket() {
//     return {
//         type: TOPIC_MARKET
//     }
// }

// export function topicCarpool() {
//     return {
//         type: TOPIC_CARPOOL
//     }
// }

// export function topicNetworking() {
//     return {
//         type: TOPIC_NETWORKING
//     }
// }
