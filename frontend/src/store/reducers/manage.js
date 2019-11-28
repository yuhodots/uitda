/* Action Types Import */
import {
    MANAGE_GET_MY_POSTS_SUCCESS,
    MANAGE_GET_MY_POSTS_FAILURE,
    MANAGE_EDIT_GET_POST_SUCCESS,
    MANAGE_EDIT_GET_POST_FAILURE,
} from '../actions/ActionTypes'


/* 초기 상태 및 manage state 항목 설명 */
const InitialState = {
    /* 공통 states */


    /* 'post' states */
    postList: [],       // 포스팅 데이터 리스트

    /* 'edit' states */
    post: {},           // 포스팅 데이터 객체

}

/* manage reducer */
export default function manage (state = InitialState, action) {

    switch(action.type) {

        /* 작성한 postlist GET 요청 액션으로 얻은 data 및 err 설정 */
        case MANAGE_GET_MY_POSTS_SUCCESS:
            return {
                ...state,
                postList: action.postlist,
            }
        
        case MANAGE_GET_MY_POSTS_FAILURE:
            return {
                ...state,
            }

        /* 글 수정 시 요청한 GET 요청 액션으로 얻은 data 또는 err
           데이터는 글 수정 edit 페이지에 처음 로드 되는데 사용됨 */
        case MANAGE_EDIT_GET_POST_SUCCESS:
            return {
                ...state,
                post: action.post
            }
        
        case MANAGE_EDIT_GET_POST_FAILURE:
            return {
                ...state,
            }

        default:
            return state
    }
}