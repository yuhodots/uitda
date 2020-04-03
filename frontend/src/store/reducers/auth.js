import { 
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from "../actions/ActionTypes";

const initialState = {
    isGetStatusDone: false,
    user: 0,
}

export default function auth (state = initialState, action) {

    switch (action.type) {
        
        // 유저 정보 확인 액션
        case AUTH_GET_STATUS_SUCCESS:
            // console.log(action.user);
            return {
                ...state,
                isGetStatusDone: true,
                user: action.user
            };

        case AUTH_GET_STATUS_FAILURE:
            return {
                ...state,
                isGetStatusDone: false,
                user: 0
            };

        // 로그아웃 액션
        case AUTH_LOGOUT:
            return {
                ...state,
                isGetStatusDone: false,
                user: 0
            };
    
        default:
            return state;
    }
}