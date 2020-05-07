import { 
    CHATTING_GET_CHAT_DATA_START,
    CHATTING_GET_CHAT_DATA_SUCCESS, 
    CHATTING_STORE_INPUT_DATA,
    CHATTING_SOCKET_ON_CHAT_MESSAGE,
} from "../actions/ActionTypes";


const InitialState = {
    isChatDataGetDone: false,       // Chatting 데이터 GET 요청 완료 여부
    
    roomList: [],                   // 채팅방 목록 데이터 
        /* room: {
            id: 방 id,
            updated: 가장 최근 메시지가 생성된 시각,
            unread: 현재 유저가 안 읽은 메시지 개수,
            opponent_user: {
                id, email, username, pic_location
            },
            last_chat: 가장 최근 메시지 내용
        } */
    currentRoom: {                  // 현재 채팅방 데이터
        id: 0,
        opntUser: 0,
        messageList: []
        /* message: {
            id: message id
            room_id: room id

            description:
            content: {
                type: [text / image]
                value: 해당 데이터 값
            }

            email: 작성자 email
            created: 메시지 생성 시각
            isUnread: 안 읽은 메시지인지
        } */
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
        case CHATTING_GET_CHAT_DATA_SUCCESS:{
            const { roomList, currentRoom } = action;
            return {
                ...state,
                isChatDataGetDone: true,
                roomList, currentRoom
            }
        }

        /* 채팅창에 입력한 데이터를 저장하는 액션 */
        case CHATTING_STORE_INPUT_DATA: 
            for ( let key in state.chatInputData) {
                if ( key === action.dataKey ) {
                    state.chatInputData[key] = action.dataValue
                }
            }
            return { ...state };

        /* Socket On을 통해 Chatting Message 데이터를 받은 액션 */
        case CHATTING_SOCKET_ON_CHAT_MESSAGE:{
            const { room_id, message_id, writer, message, time, is_unread } = action;
            const { id, messageList } = state.currentRoom

            console.log('in reducer')

            /* 새로운 메시지의 room_id와 user의 currentRoom id가 일치하는 경우에는
               currentRoom의 메시지 리스트에 새로운 메시지 데이터 추가 */
            if ( room_id === id ) {
                const newMessage = {
                    id: message_id,
                    room_id,
                    description: message,
                    email: writer.email,
                    created: time,
                    is_unread
                };
                messageList.push(newMessage);
            }

            return {
                ...state,
                currentRoom: {
                    ...state.currentRoom,
                    messageList
                }
            }
        }

        default:
            return { ...state }
    }
}