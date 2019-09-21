import {
    BOARD_INIT,
    BOARD_GET_SUCCESS,
    BOARD_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE
} from "../actions/ActionTypes";


const InitialState = {
    isGetSuccess: false,    // GET 요청이 성공했는 지 여부
    postlist: [],           // postlist 데이터
    scroll: 0,              // 스크롤 횟수 (데이터를 받은 횟수)
    search: '',             // 검색어 데이터

    isLoading: false,       // Scroll GET 대기 여부

    err: '',                // 에러
}

export default function market (state = InitialState, action) {

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
                postlist: [...state.postlist, ...action.postlist],
                scroll: state.scroll + 1,
                search: action.search,
            }

        case BOARD_GET_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err
            }

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
                scroll: state.scroll + 1,
                search: action.search,
            }

        case BOARD_SCROLL_GET_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err
            }

        default:
            return state
    }
}