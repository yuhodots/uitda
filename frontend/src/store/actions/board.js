import axios from 'axios';

import { 
    BOARD_INIT,
    BOARD_FIRST_GET_SUCCESS,
    BOARD_FIRST_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_HEADER_ON,
    BOARD_HEADER_OFF,
    BOARD_DETAIL_INIT,
    BOARD_DETAIL_GET_SUCCESS,
    BOARD_DETAIL_GET_FAILURE,
    BOARD_SOCKET_ON_COMMENT_CREATE,
    BOARD_SOCKET_ON_COMMENT_UPDATE,
    BOARD_SOCKET_ON_COMMENT_DELETE,
} from "./ActionTypes";


// Board 초기화 액션 생성자
export function initiateBoard() {
    return {
        type: BOARD_INIT
    }
}


// Board Data GET 액션 생성자
export function getBoardRequest(boardName, scroll = 0, search, successAction = getBoardSuccess, failureAction = getBoardFailure) {
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
        type: BOARD_FIRST_GET_SUCCESS,
        search,
        postlist,
        isLast
    }
}

export function getBoardFailure(err) {
    return {
        type: BOARD_FIRST_GET_FAILURE,
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

export function boardHeaderOn() {
    return {
        type: BOARD_HEADER_ON
    }
}

export function boardHeaderOff() {
    return {
        type: BOARD_HEADER_OFF
    }
}


//////////////////////////////////////////////////////
// Board Detail Actions //
export function initiateDetailPage() {
    return {
        type: BOARD_DETAIL_INIT
    }
}

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
            dispatch(getBoardDetailSuccess(data.post, data.commentlist))
        })
        
        // 실패하면, 실패 액션을 dispatch 한다.
        .catch(err => {
            dispatch(getBoardDetailFailure(err))
        })
    }
}

export function getBoardDetailSuccess (post, commentList) {
    return {
        type: BOARD_DETAIL_GET_SUCCESS,
        post,
        commentList
    }
}

export function getBoardDetailFailure (err) {
    console.log('get board detail fail')
    console.log(err)
    return {
        type: BOARD_DETAIL_GET_FAILURE,
        err
    }
}

/* Comment Actions */
/* Comment Create Action */
export function socketOnCreateComment (user, comment) {
    return {
        type: BOARD_SOCKET_ON_COMMENT_CREATE,
        user, comment
    }
}

/* Comment Update Action */
export function socketOnUpdateComment (comment_id, description, updated) {
    return {
        type: BOARD_SOCKET_ON_COMMENT_UPDATE,
        comment_id, description, updated
    }
}

/* Comment Delete Action */
export function socketOnDeleteComment (comment_id) {
    return {
        type: BOARD_SOCKET_ON_COMMENT_DELETE,
        comment_id
    }
}