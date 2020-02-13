import { 
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT
} from "../actions/ActionTypes";

const initialState = {
    isLoggedIn: false,
    user: 0,

    // 로그인 성공 여부
    loginSuccess: false,

    // 회원가입 성공 여부
    registerSuccess: false,
    registerError: ""
}

export default function auth (state = initialState, action) {

    switch (action.type) {
        
        // 유저 정보 확인 액션
        case AUTH_GET_STATUS_SUCCESS:
            // console.log(action.user);
            return {
                ...state,
                isLoggedIn: true,
                user: action.user
            };

        case AUTH_GET_STATUS_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {
                    id: null,
                    username: ""
                }
            };

        // 회원가입 액션
        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                registerSuccess: true
            }

        case AUTH_REGISTER_FAILURE:
            return{
                ...state,
                isLoggedIn: false,
                registerSuccess: false
            }

        // 로그인 액션
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                loginSuccess: true,
            }

        case AUTH_LOGIN_FAILURE:
            return{
                ...state,
                loginSuccess: false
            }

        // 로그아웃 액션
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                userInfo: {
                    id: null,
                    username: ""
                }
            };
    
        default:
            return state;
    }
}