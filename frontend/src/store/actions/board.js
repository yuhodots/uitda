import axios from 'axios';

import { 
    BOARD_INIT,
    BOARD_GET_SUCCESS,
    BOARD_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_DETAIL_GET_SUCCESS,
    BOARD_DETAIL_GET_FAILURE
} from "./ActionTypes";


// Board 초기화 액션 생성자

export function initiateBoard() {
    return {
        type: BOARD_INIT
    }
}


// Board Data GET 액션 생성자

export function getBoardRequest(boardName, scroll, search, successAction = getBoardSuccess, failureAction = getBoardFailure) {
    return (dispatch) => {

        /* search 데이터를 정제하는 과정(함수) 필요 */

        // GET 요청을 보낼 url
        // ex) '/api/market/?scroll=1', '/api/network/?scroll=2&q=전공책'
        const GETurl = `/api/${boardName}/?scroll=${scroll}${search?`&q=${search}`:''}`;    

        // GETurl로 GET 요청 보내기
        return axios.get(GETurl)
        
        // 성공하면, postlist 데이터를 가져와서 성공 액션을 dispatch 하고,
        .then(res => res.data)
        .then(data => {
            dispatch(successAction(search, data.postlist, data.isLast))
        })
        
        // 실패하면, 실패 액션을 dispatch 한다.
        .catch(err => {
            dispatch(failureAction(err))
        })
    }
}

export function getBoardSuccess(search = '', postlist, isLast) {
    return {
        type: BOARD_GET_SUCCESS,
        search,
        postlist,
        isLast
    }
}

export function getBoardFailure(err) {
    return {
        type: BOARD_GET_FAILURE,
        err
    }
}


export function getBoardRequestByScroll(boardName, scroll, search) {
    return (dispatch) => {
        dispatch(getBoardByScroll());
        setTimeout(() => {
            dispatch(getBoardRequest(boardName, scroll, search, getBoardByScrollSuccess, getBoardByScrollFailure));
        }, 750);
    }
}

export function getBoardByScroll() {
    return {
        type: BOARD_SCROLL_GET
    }
}

export function getBoardByScrollSuccess(search = '', postlist, isLast) {
    return {
        type: BOARD_SCROLL_GET_SUCCESS,
        search,
        postlist,
        isLast
    }
}

export function getBoardByScrollFailure(err) {
    return {
        type: BOARD_SCROLL_GET_FAILURE,
        err
    }
}


//////////////////////////////////////////////////////
// Board Detail Actions //

export function getBoardDetailRequest(boardName, id) {
    return (dispatch) => {
        // GET 요청을 보낼 url
        // ex) '/api/market/1', '/api/network/13'
        const GETurl = `/api/${boardName}/${id}`;

        // GETurl로 GET 요청 보내기
        return axios.get(GETurl)
        
        // 성공하면, post 데이터를 가져와서 성공 액션을 dispatch 하고,
        .then(res => res.data)
        .then(data => {
            dispatch(getBoardDetailSuccess(data.post))
        })
        
        // 실패하면, 실패 액션을 dispatch 한다.
        .catch(err => {
            dispatch(getBoardDetailFailure(err))
        })
    }
}

export function getBoardDetailSuccess (post) {
    return {
        type: BOARD_DETAIL_GET_SUCCESS,
        post
    }
}

export function getBoardDetailFailure (err) {
    return {
        type: BOARD_DETAIL_GET_FAILURE,
        err
    }
}