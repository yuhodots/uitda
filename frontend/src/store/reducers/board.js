import {
    BOARD_INIT,
    BOARD_GET_SUCCESS,
    BOARD_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_DETAIL_GET_SUCCESS,
    BOARD_DETAIL_GET_FAILURE,
    BOARD_DETAIL_INIT
} from "../actions/ActionTypes";


const InitialState = {
    /* 공통 state */
    isGetSuccess: false,    // GET 요청이 성공했는 지 여부
    err: '',                // 에러
    
    /* Board 게시판 state */
    postlist: [],           // postlist 데이터
    scroll: 0,              // 스크롤 횟수 (데이터를 받은 횟수)
    search: '',             // 검색어 데이터

    isLoading: false,       // Scroll GET 대기 여부
    isLast: false,          // 마지막 요소인 지

    /* Board detail state */
    post: {},               // 포스팅에 대한 정보를 담은 객체
    commentList: [],        // 포스팅에 대한 comments 데이터
}

export default function board (state = InitialState, action) {

    switch (action.type) {
        
        // 보드 초기화 액션
        case BOARD_INIT:
            return {
                ...InitialState,
            };

        // 보드 GET 액션
        case BOARD_GET_SUCCESS:
            return {
                ...state,
                isGetSuccess: true,
                // postlist: [...state.postlist, ...action.postlist],
                postlist: action.postlist,
                isLast: action.isLast,
                scroll: state.scroll + 1,
                search: action.search,
            }

        case BOARD_GET_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err
            }


        // 보드 스크롤 GET 액션
        case BOARD_SCROLL_GET:
            return {
                ...state,
                isLoading: true
            }

        case BOARD_SCROLL_GET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                postlist: [...state.postlist, ...action.postlist],
                isLast: action.isLast,
                scroll: state.scroll + 1,
                search: action.search,
            }

        case BOARD_SCROLL_GET_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err
            }

        /* Detail 페이지 초기화 액션 */
        case BOARD_DETAIL_INIT:
            return {
                ...state,
                isGetSuccess: false,
                post: {},
                commentList: []
            }

        //  Board Detail GET 액션
        case BOARD_DETAIL_GET_SUCCESS:
            const newCommentList = convertCommentList(action.commentlist)
            return {
                ...state,
                isGetSuccess: true,
                post: action.post,
                commentList: newCommentList
            }

        case BOARD_DETAIL_GET_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err
            }

        default:
            return state
    }
}

const convertCommentList = (commentList) => {

    /* Initialization. subCommentList 프로퍼티 생성 */
    commentList.forEach( comment => { comment.subCommentList = [] });

    /* 1. subComment를 찾아서
       2. 해당 subComment의 부모 comment를 찾고,
       3. 부모 comment에 subComment를 추가 한 뒤,
       4. subComment를 원래의 commentList에서 제거한다. */
    for ( let i = 0 ; i < commentList.length ; i++) {
        if (commentList[i].is_re_comment) {
            let subComment = commentList[i];                                                        // 1
            let parent = commentList.find(comment => comment.id === subComment.parent_comment);     // 2
            parent.subCommentList = [...parent.subCommentList, subComment];                         // 3

            commentList.splice(i, 1);                                                               // 4
            i -= 1;
        }
    }

    return commentList;
}