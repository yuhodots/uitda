import axios from "axios";

import { 
    CHATTING_GET_CHAT_DATA_START,
    CHATTING_GET_CHAT_DATA_SUCCESS,
    CHATTING_STORE_INPUT_DATA,
} from "./ActionTypes";


/* 채팅 데이터를 GET 요청하는 함수 */
export const getChatDataRequest = ( opntID ) => {
    return ( dispatch ) => {
        /* GET 요청 보내기 시작을 알림 */
        dispatch(getChatDataStart());

        /* GET 요청 보낼 url 
           opntID 가 없는 경우, index에 해당하는 room/0으로 GET 요청 */
        const GETurl = opntID ?
        `/api/chatting/user/${opntID}`:
        '/api/chatting/room/0'

        return axios.get(GETurl)
        .then( res => {
            const { roomlist, current_room } = res.data
            dispatch(getChatDataSuccess( roomlist, current_room ))
        } )
    }
}

export const getChatDataStart = () => {
    return {
        type: CHATTING_GET_CHAT_DATA_START,
    }
}

/* GET 요청을 통해 받은 데이터를 reducer로 넘겨주는 액션 */
export const getChatDataSuccess = (roomList, currentRoom) => {
    return {
        type: CHATTING_GET_CHAT_DATA_SUCCESS,
        roomList, currentRoom
    }
}


/* 채팅창에 입력한 값을 reducer에 넘겨주는 액션 */
export const storeChatInputData = (dataKey, dataValue) => {
    return {
        type: CHATTING_STORE_INPUT_DATA,
        dataKey, dataValue
    }
}