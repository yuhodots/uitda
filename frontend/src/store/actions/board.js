import axios from 'axios';
import qs from 'qs';

import { 
    BOARD_INIT,
    BOARD_GET_SUCCESS,
    BOARD_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_DETAIL_INIT,
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

export function getBoardDetailSuccess (post, commentlist) {
    return {
        type: BOARD_DETAIL_GET_SUCCESS,
        post,
        commentlist
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
export function createComment (description, type_board, board_id, parent_comment) {
    return (dispatch) => {
        const POSTurl = `/api/comment/create`
        const is_re_comment = parent_comment ? true : false;
        let requestBody = { description, type_board, board_id, is_re_comment }
        if (parent_comment) { requestBody = {...requestBody, parent_comment} }
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        return axios.post(POSTurl, qs.stringify(requestBody), config)
    }
}

/* Comment Update Action */
export function updateComment (comment_id, description) {
    return (dispatch) => {
        const POSTurl = `/api/comment/update/${comment_id}`
        const requestBody = { description };
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        return axios.post(POSTurl, qs.stringify(requestBody), config)
    }
}

/* Comment Delete Action */
export function deleteComment (comment_id) {
    return (dispatch) => {
        const POSTurl = `/api/comment/delete/${comment_id}`;
        return axios.post(POSTurl)
    }
}