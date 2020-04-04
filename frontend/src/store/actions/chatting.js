import axios from "axios";

import { 
    CHATTING_GET_BEGINING_CHAT_DATA, 
    CHATTING_GET_BEGINING_ROOM_LIST,
} from "./ActionTypes";


export const getBeginingRoomListRequest = () => {
    return ( dispatch ) => {
        /* GET 요청 보낼 url */
        const GETurl = `/api/chatting/`

        return axios.get(GETurl)
        .then( res => dispatch(getBeginingRoomListSuccess(res.data.roomlist)) )
    }
}

export const getBeginingRoomListSuccess = (roomList) => {
    return {
        type: CHATTING_GET_BEGINING_ROOM_LIST,
        roomList
    }
}


export const getBeginingChatDataRequest = ( opntID ) => {
    return ( dispatch ) => {
        /* GET 요청 보낼 url */
        const GETurl = `/api/chatting/user/${opntID}`

        return axios.get(GETurl)
        .then( res => {
            console.log(res.data);
            // dispatch(getBeginingChatDataSuccess())
        } )
    }
}

export const getBeginingChatDataSuccess = () => {
    return {
        type: CHATTING_GET_BEGINING_CHAT_DATA,

    }
}

