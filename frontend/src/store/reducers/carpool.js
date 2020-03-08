import { 
    CARPOOL_SELECT_DATE, 
    CARPOOL_GET_EVENTS_SUCCESS,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
    CARPOOL_CLICK_EVENT,
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

    selectedDate: new Date(),       // 선택된 날짜 정보
    eventsOnSelectedDate: [],       // 해당 날짜의 일정 목록
    selectedEvent: {},              // 선택한 (클릭한) 일정 데이터
}


export default function carpool (state = InitialState, action) {


    switch (action.type) {

        /* 캘린더의 날짜를 선택하는 액션 */
        case CARPOOL_SELECT_DATE:
            const { selectedDate, category } = action;
            let eventsOnSelectedDate = [];

            /* carpool 카테고리에서는 날짜를 선택하면 해당 날짜의 이벤트를 저장하는 추가 기능이 있다. */
            if ( category === CARPOOL) {
                const { closedEvents, activeEvents, ownerEvents, guestEvents } = state;
                const totalEvents = [...closedEvents, ...activeEvents, ...ownerEvents, ...guestEvents];

                /* 전체 일정 중에서 선택된 날짜로부터 24시간 이내의 일정들만을 뽑아서 넣는다. 
                   (selectedDate는 해당일 0시 0분이다) */
                eventsOnSelectedDate = totalEvents.filter( event => {
                    const startDate = new Date(event.start);
                    return ((startDate.getTime() - selectedDate.getTime() >= 0) &&
                            (startDate.getTime() - selectedDate.getTime() < 24 * 60 * 60 * 1000) )
                });

                /* 뽑아낸 데이터를 출발 시각이 빠른 순으로 정렬한다. */
                eventsOnSelectedDate.sort((a, b) => {
                    const dateOfA = new Date(a.start);
                    const dateOfB = new Date(b.start);
                    return dateOfA.getTime() - dateOfB.getTime();
                })
            }

            return {
                ...state,
                selectedDate, eventsOnSelectedDate
            }

        /* carpool event 데이터를 받아오는 액션 */
        case CARPOOL_GET_EVENTS_SUCCESS:
            const { events } = action;
            
            /* event의 라벨에 따라 구분해서 각각의 리스트에 저장 */
            const closedEvents = events.filter( event => event.label === 'closed' );
            const activeEvents = events.filter( event => event.label === 'active' );
            const ownerEvents = events.filter( event => event.label === 'owner' );
            const guestEvents = events.filter( event => event.label === 'guest' );

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

        /* 클릭한 이벤트의 id를 통해 전체 이벤트 리스트에서 찾아서 데이터 객체를 selectedEvent에 저장하는 액션 */
        case CARPOOL_CLICK_EVENT: {
            const { closedEvents, activeEvents, ownerEvents, guestEvents } = state;
            const totalEvents = [...closedEvents, ...activeEvents, ...ownerEvents, ...guestEvents];

            const selectedEvent = totalEvents.find( event => event.id.toString() === action.eventID )

            return {
                ...state,
                selectedEvent
            }
        }

        default:
            return state;
    }
}