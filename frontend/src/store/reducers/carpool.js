import { 
    CARPOOL_SELECT_DATE, 
    CARPOOL_GET_EVENTS_SUCCESS,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
} from "../actions/ActionTypes";

import { CARPOOL } from "../../constants/categories";

const InitialState = {
    isGetSuccess: false,
    
    eventsToRenderObj: {            // 캘린더에 띄워질 이벤트
        C:[], A:[], O:[], G:[]
    },             
    closedEvents: [],               // 마감된 이벤트
    activeEvents: [],               // 모집중인 (내 것이 아닌) 이벤트
    ownerEvents: [],                // 내가 방장인 이벤트
    guestEvents: [],                // 참가 신청한 이벤트

    selectedDate: new Date(),
    eventsOnThatDate: [],
}


export default function carpool (state = InitialState, action) {


    switch (action.type) {

        case CARPOOL_SELECT_DATE:
            return {
                ...state,
                selectedDate: action.date
            }

        /* carpool event 데이터를 받아오는 액션 */
        case CARPOOL_GET_EVENTS_SUCCESS:
            /* action.events에서 추출해서 저장하는 코드로 변경 */
            const closedEvents = []
            const activeEvents = []
            const ownerEvents = [] 
            const guestEvents = [] 
            //////////////////////////////////////////////////
        
            return {
                ...state,
                isGetSuccess: true,
                closedEvents, activeEvents, 
                ownerEvents, guestEvents
            }

        /* Calender의 events_to_render 객체의 데이터를 변경하는 액션들 */
        case INITIATE_CALENDER_EVENTS:
            return ( action.category === CARPOOL ?
            {   /* Carpool 캘린더 initial render object */
                ...state,
                eventsToRenderObj: {
                    C: state.closedEvents,
                    A: state.activeEvents,
                    O: state.ownerEvents,
                    G: state.guestEvents
                }
            } :
            {   /* Manage Edit 캘린더 initial render object */
                ...state,
                eventsToRenderObj: {
                    C: [], A: [], O: [], G: []
                }
            })

        /* 전체 일정 보기
           C와 상관 없이, A O G를 render할 이벤트 객체에 넣기 */
        case RENDER_TOTAL_CALENDER_EVENTS:
            return {
                ...state,
                eventsToRenderObj: {
                    ...state.eventsToRenderObj,
                    A: state.activeEvents,
                    O: state.ownerEvents,
                    G: state.guestEvents
                }
            }

        /* 내 일정 보기
           C와 상관 없이, O G를 render할 이벤트 객체에 넣고, A는 제외하기 */
        case RENDER_MY_CALENDER_EVENTS:
            return {
                ...state,
                eventsToRenderObj: {
                    ...state.eventsToRenderObj,
                    A: [],
                    O: state.ownerEvents,
                    G: state.guestEvents 
                }
            }

        /* 마감된 일정 보기 / 숨기기
           A O G 상관 없이, isHidden값에 따라 C를 빼거나 넣기 */
        case CHANGE_CLOSED_CALENDER_EVENTS:
            return {
                ...state,
                eventsToRenderObj: {
                    ...state.eventsToRenderObj,
                    C: action.isHidden ? [] : state.closedEvents
                }
            }

        default:
            return state;
    }
}