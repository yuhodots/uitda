import axios from "axios";

import {
    MANAGE_GET_MY_POST_SUCCESS,
    MANAGE_GET_MY_POST_FAILURE
} from './ActionTypes';



/* '/manage/post' 에서 내 포스팅 데이터를 get 요청하는 액션 */

export function getMyPostRequest (boardName, user) {
    return (dispatch) => {

        const getURL = '';

        return axios.get(getURL)
    }
}

export function getMyPostSuccess () {
    return {
        type: MANAGE_GET_MY_POST_SUCCESS,
    }
}

export function getMyPostFailure () {
    return {
        type: MANAGE_GET_MY_POST_FAILURE,
    }
}