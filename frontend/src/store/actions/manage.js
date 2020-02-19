import axios from "axios";
import qs from 'qs';

import {
    MANAGE_GET_MY_POSTS_SUCCESS,
    MANAGE_GET_MY_POSTS_FAILURE,
    MANAGE_EDIT_INIT_PAGE,
    MANAGE_EDIT_SET_INIT_FALSE,
    MANAGE_EDIT_GET_POST_SUCCESS,
    MANAGE_EDIT_GET_POST_FAILURE,
    MANAGE_EDIT_CREATE_POST_SUCCESS,
    MANAGE_EDIT_CREATE_POST_FAILURE,
    MANAGE_EDIT_UPDATE_POST_SUCCESS,
    MANAGE_EDIT_UPDATE_POST_FAILURE,
    MANAGE_EDIT_STORE_TITLE_DATA,
    MANAGE_EDIT_ADD_FILE_DATA,
    MANAGE_EDIT_DELETE_FILE_DATA,
    MANAGE_EDIT_STORE_DESCRIPTION_DATA,
    MANAGE_DELETE_POST_SUCCESS,
    MANAGE_DELETE_POST_FAILURE,
    MANAGE_EDIT_CLICK_BOLD,
    MANAGE_EDIT_CLICK_ITELIC,
    MANAGE_EDIT_CLICK_UNDERLINE,
    MANAGE_EDIT_CLICK_STRIKETHROUGH,
    MANAGE_EDIT_SELECT_TEXT_ALIGN,
} from './ActionTypes';

/* Error Types */
import {
    NO_USER
} from '../../constants/error_types'


// Manage Board 시작 //
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
            data.user ?
            dispatch(getMyPostSuccess(data.postlist, data.user)) :
            dispatch(getMyPostFailure(NO_USER))
        })

        /* 실패하면 error내용을 실패 액션으로 보낸다. */
        .catch(err => {
            dispatch(getMyPostFailure(err))
        })
    }
}

export function getMyPostSuccess (postlist, user) {
    return {
        type: MANAGE_GET_MY_POSTS_SUCCESS,       // postlist GET요청 성공
        postlist,
        user
    }
}

export function getMyPostFailure (err) {
    return {
        type: MANAGE_GET_MY_POSTS_FAILURE,       // postlist GET요청 실패
        err
    }
}

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

export function deletePostFailure (err) {
    return {
        type: MANAGE_DELETE_POST_FAILURE,   // 포스팅 삭제 실패
        err,
    }
}

/* '/manage/post/:board'에서의 포스팅 상태 변경 액션 */
export function updatePostConditionRequest (board, id, condition) {
    return (dispatch) => {

        const POSTurl = `/api/${board}/update/condition/${id}`;

        let requestBody = { condition }
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        return axios.post(POSTurl, qs.stringify(requestBody), config)
    }
}


/////////////////////////////////////////////////////////////////
// Manage board 끝 //



// Manage Edit 시작 //
//////////////////////////////
/* Edit Page 데이터 초기화 액션 */
export function initEditPage() {
    return {
        type: MANAGE_EDIT_INIT_PAGE
    }
}

export function setInitFalse(hi) {
    return {
        type: MANAGE_EDIT_SET_INIT_FALSE,
        hi
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
            dispatch(getUpdatePostSuccess(data.post));
        })

        /* 실패하면, err를 실패 액션으로 dispatch */
        .catch(err => {
            dispatch(getUpdatePostFailure(err))
        })
    }
}

export function getUpdatePostSuccess(post) {
    return {
        type: MANAGE_EDIT_GET_POST_SUCCESS,     // edit 페이지의 get 요청 성공
        title: post.title,
        description: post.description,
        filelist: post.filelist,
    }
}

export function getUpdatePostFailure(err) {
    return {
        type: MANAGE_EDIT_GET_POST_FAILURE,     // edit 페이지의 get 요청 실패
        err,
    }
}


/////////////////////////////////////////////////////////////////////
/* '/manage/edit/'에서의 POST 메서드로 글 생성 및 없데이트 액션 
   id의 여부에 따라 update/create를 구분 (id 있으면 update, 없으면 create) */

export function EditPostRequest (board, title, description, files, id, deletedFileIDs) {
    return (dispatch) => {

        /* POST 요청 시 사용되는 url */
        const POSTurl = id ?
        `/api/${board}/update/${id}`:   // id가 있으면 update
        `/api/${board}/create`;         // id가 없으면 create

        /* POST 요청에 사용되는 Form Data */
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        files.forEach(file => {
            /* 현재 file은 데이터를 가진 Object 객체이고,
               originFileObj 프로퍼티에 File 객체를 담음 */
            const FILE_TYPE = id ? 'added' : 'userfile';
            formData.append(FILE_TYPE, file.originFileObj);
        });

        /* update의 경우, delete_id list를 추가 */
        if (id) { formData.append('deleted_files', deletedFileIDs) }

        /* POST 요청 성공 시 보내지는 액션 생성자 */
        const successAction = id ?
        updatePostSuccess :
        createPostSuccess ;

        /* POST 요청 실패 시 보내지는 액션 생성자 */
        const failureAction = id ?
        updatePostFailure :
        createPostFailure ;

        /* create POST 요청 */
        return axios.post(POSTurl, formData, {
            headers: { 'Content-Type': 'multipart/form-data'}
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

/* Edit 페이지에서 작성 내용을 앱 state에 기록하는 함수들 */
export function storeEditTitleData (editedTitle) {
    return {
        type: MANAGE_EDIT_STORE_TITLE_DATA,
        editedTitle
    }
}

export function addFileData (file) {
    return {
        type: MANAGE_EDIT_ADD_FILE_DATA,
        file
    }
}

export function deleteFileData (file, isNew) {
    return {
        type: MANAGE_EDIT_DELETE_FILE_DATA,
        file,
        isNew
    }
}

export function storeEditDescriptionData (editedDescription) {
    return {
        type: MANAGE_EDIT_STORE_DESCRIPTION_DATA,
        editedDescription
    }
}


/* Edit page BIUS select 함수 */
export function editClickB () {
    return {
        type: MANAGE_EDIT_CLICK_BOLD
    }
}

export function editClickI () {
    return {
        type: MANAGE_EDIT_CLICK_ITELIC
    }
}

export function editClickU () {
    return {
        type: MANAGE_EDIT_CLICK_UNDERLINE
    }
}

export function editClickS () {
    return {
        type: MANAGE_EDIT_CLICK_STRIKETHROUGH
    }
}

/* Text Align 속성 Select 함수 */
export function editSelectTextAlign (textAlignAttr) {
    return {
        type: MANAGE_EDIT_SELECT_TEXT_ALIGN,
        textAlignAttr
    }
}