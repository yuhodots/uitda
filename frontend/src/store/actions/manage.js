import axios from "axios";

import {
    MANAGE_GET_MY_POST_SUCCESS,
    MANAGE_GET_MY_POST_FAILURE,
    MANAGE_EDIT_GET_POST_SUCCESS,
    MANAGE_EDIT_GET_POST_FAILURE,
    MANAGE_EDIT_CREATE_POST_SUCCESS,
    MANAGE_EDIT_CREATE_POST_FAILURE,
    MANAGE_EDIT_UPDATE_POST_SUCCESS,
    MANAGE_EDIT_UPDATE_POST_FAILURE,
    MANAGE_DELETE_POST_SUCCESS,
    MANAGE_DELETE_POST_FAILURE,
} from './ActionTypes';


////////////////////////////////////////////////////////////
/* '/manage/post/:board' 에서 내 포스팅 데이터를 get 요청하는 액션 */

export function getMyPostRequest (boardName) {
    return (dispatch) => {

        /* get 요청을 보낼 URL */
        const GETurl = `/api/manage/${boardName}`;

        /* get 요청 보내기 */
        return axios.get(GETurl)

        /* 성공하면 res.data.postlist를 성공 액션으로 보낸다. */
        .then(res => res.data)
        .then(data => {
            dispatch(getMyPostSuccess(data.postlist))
        })

        /* 실패하면 error내용을 실패 액션으로 보낸다. */
        .catch(err => {
            dispatch(getMyPostFailure(err))
        })
    }
}

export function getMyPostSuccess (postlist) {
    return {
        type: MANAGE_GET_MY_POST_SUCCESS,       // postlist GET요청 성공
        postlist
    }
}

export function getMyPostFailure (err) {
    return {
        type: MANAGE_GET_MY_POST_FAILURE,       // postlist GET요청 실패
        err
    }
}


////////////////////////////////////////////////////////////////////////////
/* '/manage/update/:board/:id' 에서 해당 페이지에 알맞는 데이터를 불러오는 (GET) 액션 */

export function getUpdatePostRequest(board, id) {
    return (dispatch) => {

        /* get 요청을 보낼 url */
        const GETurl = `/api/${board}/update/${id}`;

        /* get 요청 보내기 */
        return axios.get(GETurl)

        /* 성공하면, data 안의 (제목, 글 내용, 사진 리스트)를 받아서 성공 액션으로 dispatch */
        .then(res => res.data)
        .then(data => {
            const {
                title,
                content,
                fileList
            } = data;
            dispatch(getUpdatePostSuccess(title, content, fileList));
        })

        /* 실패하면, err를 실패 액션으로 dispatch */
        .catch(err => {
            dispatch(getUpdatePostFailure(err))
        })
    }
}

export function getUpdatePostSuccess(title, content, fileList) {
    return {
        type: MANAGE_EDIT_GET_POST_SUCCESS,     // edit 페이지의 get 요청 성공
        title,
        content,
        fileList,
    }
}

export function getUpdatePostFailure() {
    return {
        type: MANAGE_EDIT_GET_POST_FAILURE,     // edit 페이지의 get 요청 실패
        err,
    }
}


/////////////////////////////////////////////////////////////////////
/* '/manage/edit/'에서의 POST 메서드로 글 생성 및 없데이트 액션 
   id의 여부에 따라 update/create를 구분 (id 있으면 update, 없으면 create) */

export function EditPostRequest (board, title, content, fileList, id) {       // post 요청이 필요로하는 data 물어보기 !
    return (dispatch) => {

        /* POST 요청 시 사용되는 url */
        const POSTurl = id ?
        `/api/${board}/update/${id}`:   // id가 있으면 update
        `/api/${board}/create`;         // id가 없으면 create

        /* POST 요청 성공 시 보내지는 액션 생성자 */
        const successAction = id ?
        updatePostSuccess :
        createPostSuccess ;

        /* POST 요청 실패 시 보내지는 액션 생성자 */
        const failureAction = id ?
        updatePostFailure :
        createPostFailure ;

        /* create POST 요청 */
        return axios.post(POSTurl, {
            title,          // 글 제목
            content,        // 글 내용
            fileList,       // 사진 리스트
            /* 추가하기 */
        })

        /* 성공, 실패 시 각각에 맞는 액션을 dispatch하기 */
        .then(res => {dispatch(successAction())})
        .catch(err => {dispatch(failureAction(err))})
    }
}

/* create POST 액션 생성자 함수들 */
export function createPostSuccess () {
    return {
        type: MANAGE_EDIT_CREATE_POST_SUCCESS,  // 글 생성 POST 요청 성공
    }
}

export function createPostFailure (err) {
    return {
        type: MANAGE_EDIT_CREATE_POST_FAILURE,  // 글 생성 POST 요청 실패
        err,
    }
}

/* update POST 액션 생성자 함수들 */
export function updatePostSuccess () {
    return {
        type: MANAGE_EDIT_UPDATE_POST_SUCCESS,  // 글 업데이트 POST 요청 성공
    }
}

export function updatePostFailure (err) {
    return {
        type: MANAGE_EDIT_UPDATE_POST_FAILURE,  // 글 업데이트 POST 요청 실패
        err,
    }
}


////////////////////////////////////////////
/* '/manage/post/:board'에서의 포스팅 삭제 액션 */

export function deletePostRequest (board, id) {
    return (dispatch) => {

        /* POST 요청 보낼 url */
        const POSTurl = `/api/${board}/delete/${id}`;

        /* POST 요청 */
        return axios.post(POSTurl)

        /* 성공과 실패 시, 각각에 알맞는 액션 dispatch */
        .then(res => {dispatch(deletePostSuccess())})
        .catch(err => {dispatch(deletePostFailure(err))})
    }
}

export function deletePostSuccess () {
    return {
        type: MANAGE_DELETE_POST_SUCCESS,   // 포스팅 삭제 성공
    }
}

export function deletePostFailure (errr) {
    return {
        type: MANAGE_DELETE_POST_FAILURE,   // 포스팅 삭제 실패
        err,
    }
}