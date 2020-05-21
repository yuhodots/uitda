import {
    BOARD_INIT,
    BOARD_FIRST_GET_SUCCESS,
    BOARD_FIRST_GET_FAILURE,
    BOARD_SCROLL_GET,
    BOARD_HEADER_ON,
    BOARD_HEADER_OFF,
    BOARD_SCROLL_GET_SUCCESS,
    BOARD_SCROLL_GET_FAILURE,
    BOARD_DETAIL_GET_SUCCESS,
    BOARD_DETAIL_GET_FAILURE,
    BOARD_DETAIL_INIT,
    BOARD_SOCKET_ON_COMMENT_CREATE,
    BOARD_SOCKET_ON_COMMENT_DELETE,
    BOARD_SOCKET_ON_COMMENT_UPDATE,
} from "../actions/ActionTypes";


const InitialState = {
    /* Board 게시판 state */
    isHeaderOn: true,               // 게시판 페이지 헤더의 On Off 여부

    isFirstBoardGetSuccess: false,  // 게시판 페이지 데이터 get 완료 여부
    isLoading: false,               // Scroll GET 대기 여부
    isLast: false,                  // 마지막 요소인 지

    postlist: [],                   // postlist 데이터
    scroll: 0,                      // 스크롤 횟수 (데이터를 받은 횟수)
    search: '',                     // 검색어 데이터

    /* Board detail state */
    isDetailGetSuccess: false,      // Detail 페이지 데이터 get 완료 여부

    post: {},                       // 포스팅에 대한 정보를 담은 객체
    commentList: [],                // 포스팅에 대한 comments 데이터
}

export default function board (state = InitialState, action) {

    switch (action.type) {
        
        // 보드 초기화 액션
        case BOARD_INIT:
            return {
                ...state,
                isFirstBoardGetSuccess: false,
                postlist: [],
                scroll: 0,
                search: '',
                isLoading: false,
                isLast: false
            };

        // 보드 첫 번째 GET 액션
        case BOARD_FIRST_GET_SUCCESS:
            return {
                ...state,
                isFirstBoardGetSuccess: true,
                postlist: action.postlist,
                isLast: action.isLast,
                scroll: state.scroll + 1,
                search: action.search,
            }

        case BOARD_FIRST_GET_FAILURE:
            return {
                ...state,
                isFirstBoardGetSuccess: false,
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
                isBoardGetSuccess: false,
                err: action.err
            }

        case BOARD_HEADER_ON:
            return {
                ...state,
                isHeaderOn: true
            }
    
        case BOARD_HEADER_OFF:
            return {
                ...state,
                isHeaderOn: false
            }

        /* Detail 페이지 초기화 액션 */
        case BOARD_DETAIL_INIT:
            return {
                ...state,
                isDetailGetSuccess: false,
                post: {},
                commentList: []
            }

        //  Board Detail GET 액션
        /* 아마도 아주 가끔 댓글이 전체가 안 담기는 오류는 이 부분을 동기처리 해주지 않아서 일 듯 */
        case BOARD_DETAIL_GET_SUCCESS:
            const newCommentList = convertCommentList(action.commentList)
            return {
                ...state,
                isDetailGetSuccess: true,
                post: action.post,
                commentList: newCommentList
            }

        case BOARD_DETAIL_GET_FAILURE:
            return {
                ...state,
                isDetailGetSuccess: false,
                err: action.err
            }

        /* Comment Create */
        case BOARD_SOCKET_ON_COMMENT_CREATE: {

            const { user, comment } = action;
            const { commentList } = state;

            const newComment = { ...comment, user, subCommentList: [] };

            /* 답글인 경우, 부모의 댓글을 찾아서 subCommentList의 가장 뒤에 newComment를 추가 */
            if ( newComment.is_re_comment ) {
                const parentCommentIdx = commentList.findIndex( comment => comment.id === newComment.parent_comment );
                return {
                    ...state,
                    commentList: commentList.map( (comment, idx) => {
                        if (idx !== parentCommentIdx) { return comment }
                        else { 
                            return {
                                ...comment,
                                subCommentList: [...comment.subCommentList, newComment]
                            }
                        }
                    })
                }
            } 

            /* 답글이 아닌 경우 (부모 댓글인 경우), commentList의 가장 앞부분에 new Comment 추가 */
            else { 
                return {
                    ...state,
                    commentList: [ newComment, ...commentList ]
                }
            }
        }

        /* Comment Update */
        case BOARD_SOCKET_ON_COMMENT_UPDATE: {
            const { commentList } = state;
            const { comment_id, description, updated } = action;

            const [ u_root_idx, u_sub_idx ] = findCommentIdx(commentList, comment_id);

            /* update 할 댓글이 있는 경우. update 실행 */
            if ( u_root_idx !== -1 ) {
                /* Root Comment Update */
                if ( u_sub_idx === -1 ) {
                    return {
                        ...state,
                        commentList: commentList.map( (comment, idx) => {
                            if (idx !== u_root_idx) { return comment; }
                            else {
                                return {
                                    ...comment,
                                    description, updated
                                }
                            }
                        })
                    }
                }

                /* Sub Comment Update */
                else {
                    return {
                        ...state,
                        commentList: commentList.map( (comment, root_idx) => {
                            if (root_idx !== u_root_idx) { return comment; }
                            else {
                                return {
                                    ...comment,
                                    subCommentList: comment.subCommentList.map( (subComment, sub_idx) => {
                                        if( sub_idx !== u_sub_idx ) { return subComment; }
                                        else {
                                            return {
                                                ...subComment,
                                                description, updated
                                            }
                                        }
                                    })
                                }
                            }
                        })
                    }
                }
            }

            /* 수정할 댓글이 없는 경우 */
            return { ...state };
        }

        /* Comment Delete */
        case BOARD_SOCKET_ON_COMMENT_DELETE: {
            const { commentList } = state;
            const { comment_id } = action;

            const [ d_root_idx, d_sub_idx ] = findCommentIdx(commentList, comment_id);

            /* 지울 댓글이 있는 경우. delete 실행 */
            if ( d_root_idx !== -1) {
                /* Root Comment Delete */
                if (d_sub_idx === -1) {
                    return {
                        ...state,
                        commentList: [
                            ...state.commentList.slice(0, d_root_idx),
                            ...state.commentList.slice(d_root_idx + 1)
                        ]
                    }    
                }

                /* Sub Comment Delete */
                else {
                    return {
                        ...state,
                        commentList: commentList.map( (comment, idx) => {
                            if (idx !== d_root_idx) { return comment }
                            else {
                                return {
                                    ...comment,
                                    subCommentList: [
                                        ...comment.subCommentList.slice(0, d_sub_idx),
                                        ...comment.subCommentList.slice(d_sub_idx + 1)
                                    ]
                                }
                            }
                        })
                    }
                }
            }

            /* 지울 댓글이 없는 경우 */
            return { ...state }
        }

        default:
            return state
    }
}


/* GET 요청을 통해 받은 Backend의 row comment list 데이터를
   subComment를 구분해서 RootComment의 property로 넣어주고,
   Root Comment는 최신 댓글이 가장 위에 오고, Subcomment는 오래된 댓글이 가장 위에 오도록 정렬하는 메서드 */
const convertCommentList = (commentList) => {

    /* Sort Functions */
    /* 최신 댓글이 가장 위에 오는 정렬 */
    const lastestFirstOrder = (a, b) => {
        const aDate = new Date(a.created).getTime();
        const bDate = new Date(b.created).getTime(); 
        return bDate - aDate;
    }

    /* 오래된 댓글이 가장 위에 오는 정렬 */
    const oldestFirstOrder = (a, b) => {
        const aDate = new Date(a.created).getTime();
        const bDate = new Date(b.created).getTime(); 
        return aDate - bDate;
    }

    /* Initialization. subCommentList 프로퍼티 생성 */
    commentList.forEach( comment => { comment.subCommentList = [] });
    
    /* SubComment는 오래된 댓글이 가장 위에 오기 때문에,
       Subcommnet를 분류하기 전에는 sub comment에 맞춘 정렬을 진행 */
    commentList.sort(oldestFirstOrder);

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

    /* commentList에는 SubComment가 모두 comment의 인재로 들어갔기 때문에
       남은 댓글들은 최신이 가장 위가 되도록 정렬 */
    commentList.sort(lastestFirstOrder);

    return commentList;
}


/* 삭제할 댓글의 index를 찾는 메서드 */
const findCommentIdx = (commentList, findComment_id) => {

    let root_idx = -1;
    let sub_idx = -1;
    
    for (let i = 0; i < commentList.length; i++) {
        const comment = commentList[i];

        /* Root Comment에서 deleteComment_id와 일치하는 것이 있다면, [해당 root index, -1] */
        if (comment.id === findComment_id) {
            root_idx = i;
            return [root_idx, sub_idx];
        }

        sub_idx = comment.subCommentList.findIndex( subComment => subComment.id === findComment_id);
        /* Sub Comment 중에서 deleteComment_id와 일치하는 것이 있다면, [해당 root index, 해당 sub index] */
        if (sub_idx !== -1) {
            root_idx = i;
            return [root_idx, sub_idx]; 
        }
    }
    return [root_idx, sub_idx]; 
}