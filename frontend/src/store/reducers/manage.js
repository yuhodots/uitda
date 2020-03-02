/* Action Types Import */
import {
    MANAGE_GET_MY_POSTS_SUCCESS,
    MANAGE_GET_MY_POSTS_FAILURE,
    MANAGE_EDIT_INIT_PAGE,
    MANAGE_EDIT_SET_INIT_FALSE,
    MANAGE_EDIT_GET_POST_SUCCESS,
    MANAGE_EDIT_GET_POST_FAILURE,
    MANAGE_EDIT_STORE_TITLE_DATA,
    MANAGE_EDIT_ADD_FILE_DATA,
    MANAGE_EDIT_DELETE_FILE_DATA,
    MANAGE_EDIT_STORE_DESCRIPTION_DATA,
    MANAGE_EDIT_CREATE_POST_SUCCESS,
    MANAGE_EDIT_UPDATE_POST_SUCCESS,
    MANAGE_EDIT_CLICK_BOLD,
    MANAGE_EDIT_CLICK_ITELIC,
    MANAGE_EDIT_CLICK_UNDERLINE,
    MANAGE_EDIT_CLICK_STRIKETHROUGH,
    MANAGE_EDIT_SELECT_TEXT_ALIGN,
    MANAGE_EDIT_SELECT_CATEGORY,
    MANAGE_EDIT_SELECT_CALENDAR_DATE,
} from '../actions/ActionTypes'

import { MARKET } from '../../constants/categories'
import { TEXT_ALIGN } from '../../constants/edit_funcs'


/* 초기 상태 및 manage state 항목 설명 */
const InitialState = {
    /* 공통 states */
    err: '',
    isGetSuccess: false,
    user: 0,

    /* 'posts' states */
    postList: [],                               // 포스팅 데이터 리스트

    /* 'edit' states */
    isEditInit: false,                          // Edit 페이지 초기화 여부
    isEditGetSuccess: false,                    // Edit page GET 성공 여부
    isModified: false,                          // 수정된 지 여부
    editCategory: MARKET,                       // Edit 페이지 카테고리 정보 (market, networking, carpool)
    
    editedTitle: '',                            // 작성한 제목 데이터
    editedFiles: [],                            // 업로드할 파일 데이터 리스트
    deletedFileIDs: [],                         // 삭제할 파일의 id 리스트
    editedDescription: '',                      // 작성한 설명 부분 데이터
    editSuccess: false,                         // 작성 완료

    edit_spanStyle: {                           // BIUS style 선택된 유무
        bSelect: false,                         // Bold
        iSelect: false,                         // Itelic
        uSelect: false,                         // Underline
        sSelect: false,                         // Strikethrough
    },
    edit_textAlign: TEXT_ALIGN.justify,         // p 태그 text align 속성

    carpool_SelectedDate: {isLoading: true},    // 카풀 탭에서 선택된 날짜정보
}


/* manage reducer */
export default function manage (state = InitialState, action) {

    switch(action.type) {

        /* 작성한 postlist GET 요청 액션으로 얻은 data 및 err 설정 */
        case MANAGE_GET_MY_POSTS_SUCCESS:
            return {
                ...state,
                isGetSuccess: true,
                user: action.user,
                postList: action.postlist,
            }
        
        case MANAGE_GET_MY_POSTS_FAILURE:
            return {
                ...state,
                isGetSuccess: false,
                err: action.err,
            }

        /* Edit page 초기화 액션 */
        case MANAGE_EDIT_INIT_PAGE:
            return {
                ...state,
                editedTitle: '',
                editedFiles: [],
                editedDescription: '',
                
                editCategory: MARKET,
                editSuccess: false,
                isEditGetSuccess: false,
                isModified: false,
                isEditInit: true,
            }

        case MANAGE_EDIT_SET_INIT_FALSE:
            console.log(action.hi)
            console.log('set init false')
            return {
                ...state,
                // isEditInit: false
            }

        case MANAGE_EDIT_SELECT_CATEGORY:
            return {
                ...state,
                editCategory: action.category
            }

        /* 글 수정 시 요청한 GET 요청 액션으로 얻은 data 또는 err
           데이터는 글 수정 edit 페이지에 처음 로드 되는데 사용됨 */
        case MANAGE_EDIT_GET_POST_SUCCESS:
            let modifiedFileList = action.filelist.map(filedata => {
                const uid = `${-filedata.file_id - 1}`;
                return {
                    uid: uid,
                    name: 'image.png',
                    status: 'done',
                    url: filedata.location,
                    del_id: filedata.id
                }
            })

            return {
                ...state,
                editedTitle: action.title,
                editedDescription: action.description,
                editedFiles: modifiedFileList,
                isEditGetSuccess: true,

                isEditInit: false,
            }
        
        case MANAGE_EDIT_GET_POST_FAILURE:
            return {
                ...state,
                err: action.err,
                isGetSuccess: false,
            }

        /* Edit page에서 데이터 입력 시, 앱 state로 저장하는 액션들 */
        case MANAGE_EDIT_STORE_TITLE_DATA:
            return {
                ...state,
                editedTitle: action.editedTitle,
                isModified: true,
            }

        case MANAGE_EDIT_STORE_DESCRIPTION_DATA:
            return {
                ...state,
                editedDescription: action.editedDescription,
                isModified: true,
            }
        
        case MANAGE_EDIT_ADD_FILE_DATA:
            return {
                ...state,
                editedFiles: [...state.editedFiles, action.file],
                isModified: true,
            }

        case MANAGE_EDIT_DELETE_FILE_DATA:
            const index = state.editedFiles.indexOf(action.file);
            const newFileList = state.editedFiles.slice();
            newFileList.splice(index, 1);

            /* 기존에 있던 (수정 전) 사진의 경우, deletedFileIDs 리스트에 해당 사진의 id를 저장 */
            if( !action.isNew ) {
                state.deletedFileIDs = [...state.deletedFileIDs, action.file.del_id]
            }

            return {
                ...state,
                editedFiles: newFileList,
                isModified: true,
            }

        /* 작성 성공 되었음을 알리는 액션들 */
        case MANAGE_EDIT_CREATE_POST_SUCCESS:
            return {
                ...state,
                editSuccess: true,
            }

        case MANAGE_EDIT_UPDATE_POST_SUCCESS:
            return {
                ...state,
                editSuccess: true,
            }

        /* edit span style 선택 액션 */
        case MANAGE_EDIT_CLICK_BOLD:
            return {
                ...state,
                edit_spanStyle: {
                    ...state.edit_spanStyle,
                    bSelect: !state.edit_spanStyle.bSelect
                }
            }

        case MANAGE_EDIT_CLICK_ITELIC:
            return {
                ...state,
                edit_spanStyle: {
                    ...state.edit_spanStyle,
                    iSelect: !state.edit_spanStyle.iSelect
                }
            }
        
        case MANAGE_EDIT_CLICK_UNDERLINE:
            return {
                ...state,
                edit_spanStyle: {
                    ...state.edit_spanStyle,
                    uSelect: !state.edit_spanStyle.uSelect
                }
            }

        case MANAGE_EDIT_CLICK_STRIKETHROUGH:
            return {
                ...state,
                edit_spanStyle: {
                    ...state.edit_spanStyle,
                    sSelect: !state.edit_spanStyle.sSelect
                }
            }

        /* text-align 속성값 선택 액션 */
        case MANAGE_EDIT_SELECT_TEXT_ALIGN:
            return {
                ...state,
                edit_textAlign: action.textAlignAttr
            }


        /* Manage Edit Carpool Actions */

        /* 달력의 날짜를 선택하는 액션 */
        case MANAGE_EDIT_SELECT_CALENDAR_DATE:
            return {
                ...state,
                carpool_SelectedDate: action.date,
            }

        default:
            return state
    }
}