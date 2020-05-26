import axios from "axios";

import { no_args_PostRequestFuction, x_www_PostRequestFuction, formData_PostRequestFuction } from "./RefactoringFuncs";
import {
    MANAGE_GET_ITEMS_LOADING,
    MANAGE_GET_MY_PROFILE_SUCCESS,
    MANAGE_UPLOAD_PROFILE_IMAGE,
    MANAGE_DELETE_UPLOADED_PROFILE_IMAGE,
    MANAGE_INITIALIZE_PROFILE_IMAGE,
    MANAGE_GET_MY_POSTS_SUCCESS,
    MANAGE_GET_MY_POSTS_FAILURE,
    MANAGE_EDIT_INIT_PAGE,
    MANAGE_EDIT_SELECT_CATEGORY,
    MANAGE_EDIT_GET_POST_SUCCESS,
    MANAGE_EDIT_GET_POST_FAILURE,
    MANAGE_EDIT_CREATE_POST_SUCCESS,
    MANAGE_EDIT_CREATE_POST_FAILURE,
    MANAGE_EDIT_UPDATE_POST_SUCCESS,
    MANAGE_EDIT_UPDATE_POST_FAILURE,
    MANAGE_EDIT_STORE_BOARD_DATA,
    MANAGE_EDIT_ADD_FILE_DATA,
    MANAGE_EDIT_DELETE_FILE_DATA,
    MANAGE_DELETE_POST_SUCCESS,
    MANAGE_DELETE_POST_FAILURE,
    MANAGE_EDIT_CLICK_BOLD,
    MANAGE_EDIT_CLICK_ITELIC,
    MANAGE_EDIT_CLICK_UNDERLINE,
    MANAGE_EDIT_CLICK_STRIKETHROUGH,
    MANAGE_EDIT_SELECT_TEXT_ALIGN,
    MANAGE_EDIT_CARPOOL_STORE_DATA,
    MANAGE_EDIT_CARPOOL_POST_SUCCESS,
    MANAGE_EDIT_CARPOOL_POST_FAILURE,
    MANAGE_STORE_FEEDBACK_DATA,
    MANAGE_POST_FEEDBACK_SUCCESS,
    MANAGE_INIT_FEEDBACK,
} from './ActionTypes';


// Manage 시작 //

/* Manage Content 창이 로딩중이 뜨도록 isLoading: true 시켜주는 액션 */
export function getManageItemsLoading() {
    return {
        type: MANAGE_GET_ITEMS_LOADING
    }
}

export function getMyProfileRequest() {
    return {
        type: MANAGE_GET_MY_PROFILE_SUCCESS
    }
}

/* 프로필 사진 업로드 액션 */
export function uploadProfileImage(file) {
    return {
        type: MANAGE_UPLOAD_PROFILE_IMAGE,
        file
    }
}

/* 프로필 사진 삭제 액션 */
export function deleteUploadedProfileImage() {
    return {
        type: MANAGE_DELETE_UPLOADED_PROFILE_IMAGE,
    }
}

/* 프로필 사진 초기화 액션 */
export function initProfileImage () {
    return {
        type: MANAGE_INITIALIZE_PROFILE_IMAGE,
    }
}

/* Profile 사진 create post 요청 액션 */
export function postProfileCreateRequest (photoFile) {
    const POSTurl = '/api/users/profile/create';
    const formData = new FormData();
    formData.append('userfile', photoFile.originFileObj);

    return formData_PostRequestFuction(POSTurl, formData, initProfileImage);
}

/* Profile 사진 update post 요청 액션 */
export function postProfileUpdateRequest (photoFile) {
    const POSTurl = '/api/users/profile/update';
    const formData = new FormData();
    formData.append('userfile', photoFile.originFileObj);

    return formData_PostRequestFuction(POSTurl, formData, initProfileImage);
}

/* Profile 사진 delete post 요청 액션 */
export function postProfileDeleteRequest () {
    const POSTurl = '/api/users/profile/delete';
    return no_args_PostRequestFuction(POSTurl, initProfileImage);    
}


////////////////////////////////////////////////////////////
/* '/manage/post/:board' 에서 내 포스팅 데이터를 get 요청하는 액션 */

export function getMyPostRequest (boardName) {
    return (dispatch) => {
        /* GET request 보내기 전에 로딩중으로 */
        dispatch(getManageItemsLoading());

        /* get 요청을 보낼 URL */
        const GETurl = `/api/manage/${boardName}`;

        /* get 요청 보내기 */
        return axios.get(GETurl)

        /* 성공하면 res.data.postlist를 성공 액션으로 보낸다. */
        .then(res => dispatch(getMyPostSuccess(res.data.postlist)))

        /* 실패하면 error내용을 실패 액션으로 보낸다. */
        .catch(err => dispatch(getMyPostFailure(err)))
    }
}

export function getMyPostSuccess (postlist) {
    return {
        type: MANAGE_GET_MY_POSTS_SUCCESS,       // postlist GET요청 성공
        postlist
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
    const POSTurl = `/api/${board}/update/condition/${id}`;
    const requestBody = { condition }
    return x_www_PostRequestFuction(POSTurl, requestBody);
}


/////////////////////////////////////////////////////////////////
// Manage board 끝 //


/* 피드백 작성 페이지 초기화 */
export const initFeedbackPage = () => {
    return {
        type: MANAGE_INIT_FEEDBACK,
    }
}

/* Feedback 데이터 저장 메서드 */
export const storeFeedbackData = ( data_key, data_value ) => {
    return {
        type: MANAGE_STORE_FEEDBACK_DATA,
        data_key, data_value
    }
}

/* Feedback 데이터를 POST 하는 메서드 */
export const postFeedBackRequest = ( {title, description} ) => {
    const POSTurl = `/api/proposal/create`;
    const requestBody = { title, description }
    return x_www_PostRequestFuction(POSTurl, requestBody, postFeedBackSuccess)
}

export const postFeedBackSuccess = () => {
    return {
        type: MANAGE_POST_FEEDBACK_SUCCESS
    }
}


// Manage Edit 시작 //
//////////////////////////////
/* Edit Page 데이터 초기화 액션 */
export function initEditPage() {
    return {
        type: MANAGE_EDIT_INIT_PAGE
    }
}

/* Edit 카테고리를 선택하는 메서드 */
export function selectEditCategory(category) {
    return {
        type: MANAGE_EDIT_SELECT_CATEGORY,
        category
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
        price: post.price,
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

export function EditPostRequest (board, title, price, description, files, id, deletedFileIDs) {
    /* POST 요청 시 사용되는 url */
    const POSTurl = id ?
    `/api/${board}/update/${id}`:   // id가 있으면 update
    `/api/${board}/create`;         // id가 없으면 create

    /* POST 요청에 사용되는 Form Data */
    const formData = new FormData();
    formData.append('title', title);
    if(board==='market'){
        formData.append('price', price);
    }
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
    const successAction = id ? updatePostSuccess : createPostSuccess ;

    /* POST 요청 실패 시 보내지는 액션 생성자 */
    const failureAction = id ? updatePostFailure : createPostFailure ;

    return formData_PostRequestFuction(POSTurl, formData, successAction, failureAction);
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
export function storeBoardData (data_key, data_value) {
    return {
        type: MANAGE_EDIT_STORE_BOARD_DATA,
        data_key, data_value
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


/* edit-carpool 액션 */

/* Room Info의 데이터 key-value를 app state에 저장하는 액션 */
export function storeCarpoolData (data_key, data_value) {
    return {
        type: MANAGE_EDIT_CARPOOL_STORE_DATA,
        data_key,
        data_value,
    }
}

/* Carpool 이벤트 등록 POST 액션 */
export function postCarpoolEvent ({departure, destination, start_date, start_time, meeting_place, contact, description}) {
    /* POST 요청 시 사용되는 url */
    const POSTurl = '/api/carpool/create';

    /* POST Request Body Data */
    const DateToTime = start_date.getTime();
    const HoursToTime = start_time.getHours() * 60 * 60 * 1000;
    const MinutesToTime = start_time.getMinutes() * 60 * 1000;
    const start = new Date(DateToTime + HoursToTime + MinutesToTime);

    const reqBody = { departure, destination, start, meeting_place, contact, description }

    return x_www_PostRequestFuction(POSTurl, reqBody, postCarpoolEventSuccess, postCarpoolEventFailure);
}

export function postCarpoolEventSuccess () {
    return {
        type: MANAGE_EDIT_CARPOOL_POST_SUCCESS
    }
}

export function postCarpoolEventFailure () {
    return {
        type: MANAGE_EDIT_CARPOOL_POST_FAILURE
    }
}















//////////////////////////////
export function tempFunc() {
    return {
        type: 'MANAGE_TEMP_FUNC'
    }
}