import { 
    CHATTING_GET_BEGINING_CHAT_DATA, 
    CHATTING_GET_BEGINING_ROOM_LIST,
} from "../actions/ActionTypes";


const InitialState = {
    roomList: []
}

export default function chatting ( state = InitialState, action ) {

    switch ( action.type ) {

        case CHATTING_GET_BEGINING_ROOM_LIST:
            return {
                ...state,
                roomList: action.roomList
            }


        default:
            return {...state}
    }
}