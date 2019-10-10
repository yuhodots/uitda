import {
    BOARD_INIT,
    BOARD_GET_SUCCESS,
    BOARD_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_DETAIL_GET_SUCCESS,
    BOARD_DETAIL_GET_FAILURE
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


        //  Board Detail GET 액션
        case BOARD_DETAIL_GET_SUCCESS:
            return {
                ...state,
                isGetSuccess: true,
                post: action.post
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