import axios from 'axios';

import {
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT
} from "./ActionTypes";


// User 상태 정보 액션 생성자
export function getStatusRequest() {
    return (dispatch) => {
        return axios.get('/api/users')
        .then(res => res.data.user)
        .then(user => { dispatch(getStatusSuccess(user)) })
        .catch(err => getStatusFailure(err))
    }
}

export function getStatusSuccess(user) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        user
    }
}

export function getStatusFailure(err) {
    return {
        type: AUTH_GET_STATUS_FAILURE,
        err
    }
}


// 회원가입 액션 생성자

export function registerRequest(username, password) {

    return (dispatch) => {
        return axios.post('/login/register', {
            username, password
        })
        .then(res => {
            console.log(res);
            dispatch(registerSuccess())
        })
        .catch(err => {
            console.log(err);
            dispatch(registerFailure())
        })
    }
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    }
}

export function registerFailure() {
    return {
        type: AUTH_REGISTER_FAILURE
    }
}


// 로그인 액션 생성자

// export function loginRequest(username, password) {
//     return (dispatch) => {
//         return axios.post('/login', {
//             username, password
//         })
//         .then(res => {
//             return res.data.user})
//         .then(user => dispatch(loginSuccess(user)))
//         .catch(res => dispatch(loginFailure()))
//     }
// }

export function loginRequest () {
    return (dispatch) => {
        return axios.get('/api/login/outlook')
        .then(res => dispatch(loginSuccess()))
        .catch(err => dispatch(loginFailure()))
    }
}

export function loginSuccess() {
    return {
        type: AUTH_LOGIN_SUCCESS,
    }
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    }
}

// 로그아웃 액션 생성자

export function logoutRequest() {
    return (dispatch) => {
        return axios.get('/api/logout')
        .then((res) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}