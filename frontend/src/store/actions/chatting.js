import axios from "axios";

import { 
    CHATTING_GET_CHAT_DATA_START,
    CHATTING_GET_CHAT_DATA_SUCCESS,
    CHATTING_STORE_INPUT_DATA,
    CHATTING_SOCKET_ON_CHAT_MESSAGE,
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
export const getChatDataSuccess = (roomList, current_room) => {
    
    /* Backend 변수명 (pot_hole_case) => Frontend 변수명 (camelCase) */
    const { id, opponent_user, message_list } = current_room;
    const currentRoom = { 
        id: Number(id), 
        opntUser: opponent_user, 
        messageList: message_list 
    }

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


/* chat message 이벤트에 대한 socket on 메서드를 처리하는 액션
   추가될 message 데이터와 변경될 room 데이터를 받는다.
   room의 경우, room_id에 해당하는 방을 roomList의 가장 앞으로 이동하고, 시간 값을 변경
   message의 경우, room_id값과 current_room의 id와 일치하면, currentRoom의 messageList에 추가한다.
*/
export const socketOnChatMessage = (data) => {

    console.log('action')

    const { room_id, message_id, writer, message, time, is_unread } = data;
    return {
        type: CHATTING_SOCKET_ON_CHAT_MESSAGE,
        room_id, message_id, writer, message, time, is_unread    
    }
}