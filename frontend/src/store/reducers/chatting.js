import { 
    CHATTING_GET_CHAT_DATA_START,
    CHATTING_GET_CHAT_DATA_SUCCESS, 
    CHATTING_STORE_INPUT_DATA,
} from "../actions/ActionTypes";


const InitialState = {
    isChatDataGetDone: false,       // Chatting 데이터 GET 요청 완료 여부
    
    roomList: [],                   // 채팅방 목록 데이터
    currentRoom: {                  // 현재 채팅방 데이터
        id: 0,
        opntUser: 0,
        messageList: []
    },

    chatInputData: {                // 채팅창에 입력된 데이터
        text: ''        
    }
}

export default function chatting ( state = InitialState, action ) {

    switch ( action.type ) {

        case CHATTING_GET_CHAT_DATA_START:
            return {
                ...state,
                isChatDataGetDone: false,
            }

        /* GET요청을 통해 받은 Chatting 데이터를 저장하는 액션 */
        case CHATTING_GET_CHAT_DATA_SUCCESS:
            return {
                ...state,
                isChatDataGetDone: true,
                roomList: action.roomList,
                currentRoom: action.currentRoom
            }

        /* 채팅창에 입력한 데이터를 저장하는 액션 */
        case CHATTING_STORE_INPUT_DATA: 
            for ( let key in state.chatInputData) {
                if ( key === action.dataKey ) {
                    state.chatInputData[key] = action.dataValue
                }
            }
            return state;


        default:
            return { ...state }
    }
}