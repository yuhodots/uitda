import axios from 'axios';

import {
    AUTH_GET_STATUS_SUCCESS,
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT
} from "./ActionTypes";


// User 상태 정보 액션 생성자
export function getStatusRequest() {
    return (dispatch) => {        
        return axios.get('/api/users')
        .then(res => dispatch(getStatusSuccess(res.data.user)) )
        .catch(err => dispatch(getStatusFailure(err)) )
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


// 로그아웃 액션 생성자
export function localLogoutRequest() {
    return (dispatch) => {
        return axios.get('/api/logout/local')
        .then((res) => {
            dispatch(logout());
        });
    };
}

export function outlookLogoutRequest() {
    return (dispatch) => {
        return axios.get('/api/logout/outlook')
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