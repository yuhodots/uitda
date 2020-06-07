import { 
    CARPOOL_INITATE_STATE,
    CARPOOL_SELECT_DATE, 
    CARPOOL_GET_EVENTS_SUCCESS,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
    CARPOOL_CLICK_EVENT,
    CARPOOL_STORE_EVENT_UPDATE_DATA,
    CARPOOL_POST_EVENT_UPDATE_SUCCESS,
    CARPOOL_JOIN_EVENT_SUCCESS,
    CARPOOL_CANCLE_JOIN_EVENT_SUCCESS,
    CARPOOL_POST_EVENT_CANCLE_OR_CLOSE_SUCCESS,
} from "../actions/ActionTypes";

import { CARPOOL } from "../../constants/categories";
import { 
    TOTAL, MY,
    CLOSED, ACTIVE, OWNER, GUEST,
    OWNER_CLOSED, GUEST_CLOSED,
} from "../../constants/calendar_consts";

const InitialState = {
    isGetSuccess: false,
    
    isClosedHidden: false,          // 마감된 일정 가리기 여부
    totalOrMyOption: TOTAL,         // 전체 일정 or 내 일정
    
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
    eventDataToUpdate: {            // 수정 POST 요청을 보낼 데이터 객체
        departure: '',                  // 출발지
        destination: '',                // 도착지
        start_date: new Date(),         // 출발 날짜
        start_time: new Date(),         // 출발 시각
        meeting_place: '',              // 집합 장소 
        contact: '',                    // 연락처
        description: ''                 // 추가 정보
    }
}


export default function carpool (state = InitialState, action) {


    switch (action.type) {

        case CARPOOL_INITATE_STATE: 
            return {
                ...InitialState
            }

        /* 캘린더의 날짜를 선택하는 액션 */
        case CARPOOL_SELECT_DATE: {
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
        }

        /* carpool event 데이터를 받아오는 액션 */
        case CARPOOL_GET_EVENTS_SUCCESS: {
            const { events } = action;
            
            /* event의 라벨에 따라 구분해서 각각의 리스트에 저장 */
            const closedEvents = events.filter( event => event.label === CLOSED );
            const activeEvents = events.filter( event => event.label === ACTIVE );
            const ownerEvents = events.filter( event => event.label === OWNER || event.label === OWNER_CLOSED );
            const guestEvents = events.filter( event => event.label === GUEST || event.label === GUEST_CLOSED );

            return {
                ...state,
                isGetSuccess: true,
                closedEvents, activeEvents, 
                ownerEvents, guestEvents
            }
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
           A, O, G는 모두 받기 고정
           closed Hidden이면 C는 빈 리스트, 아닌 경우 받아오기 */
        case RENDER_TOTAL_CALENDER_EVENTS:{
            const { isClosedHidden, activeEvents, closedEvents, ownerEvents, guestEvents } = state;

            return {
                ...state,
                totalOrMyOption: TOTAL,
                eventsToRenderObj: updateEventsToRenderObj( TOTAL, isClosedHidden, {activeEvents, closedEvents, ownerEvents, guestEvents} )
            }
        }

        /* 내 일정 보기
           C와 A는 모두 제외하고, O와 G는 closed Hidden 여부에 따라 filtering 한다. */
        case RENDER_MY_CALENDER_EVENTS: {
            const { isClosedHidden, ownerEvents, guestEvents } = state;

            return {
                ...state,
                totalOrMyOption: MY,
                eventsToRenderObj: updateEventsToRenderObj(MY, isClosedHidden, {ownerEvents, guestEvents})
            }
        }

        /* 마감된 일정 보기 / 숨기기
           A O G 상관 없이, isHidden값에 따라 C를 빼거나 넣기 */
        case CHANGE_CLOSED_CALENDER_EVENTS: {
            const { totalOrMyOption, closedEvents, ownerEvents, guestEvents } = state;
            const { isHidden } = action;

            const {
                ownerEventsToRender, guestEventsToRender
            } = filterOwnerGuestEvents(ownerEvents, guestEvents, isHidden);

            return {
                ...state,
                isClosedHidden: isHidden,
                eventsToRenderObj: {
                    C: totalOrMyOption === MY || isHidden ? [] : closedEvents,      // 내 일정 보기 + 전체 중에서 Hidden인 경우 빈 리스트
                    A: state.eventsToRenderObj.A,                                   // A는 이전 state 그대로 (전체 일정에서는 존재, 내 일정에서는 빈 리스트)
                    O: totalOrMyOption === MY ? ownerEventsToRender : ownerEvents,
                    G: totalOrMyOption === MY ? guestEventsToRender : guestEvents,
                }
            }
        }

        /* 클릭한 이벤트의 id를 통해 전체 이벤트 리스트에서 찾아서 데이터 객체를 selectedEvent에 저장하는 액션 */
        case CARPOOL_CLICK_EVENT: {
            const { closedEvents, activeEvents, ownerEvents, guestEvents } = state;
            const totalEvents = [...closedEvents, ...activeEvents, ...ownerEvents, ...guestEvents];

            const selectedEvent = totalEvents.find( event => event.id.toString() === action.eventID.toString() )

            return {
                ...state,
                selectedEvent
            }
        }

        /* 수정 request를 보낼 데이터를 저장하는 액션 */
        case CARPOOL_STORE_EVENT_UPDATE_DATA: 
            let newState = { ...state };
            for ( let key in newState.eventDataToUpdate) {
                if ( key === action.data_key ) {
                    newState.eventDataToUpdate[key] = action.data_value
                }
            }
            return newState;

        /* 수정 요청 완료 시, 모달에 곧바로 변경을 주기 위해 
           eventDataToUpdate 데이터를 selectedEvent로 저장 */
        case CARPOOL_POST_EVENT_UPDATE_SUCCESS:{
            const { 
                totalOrMyOption, isClosedHidden, 
                closedEvents, activeEvents, ownerEvents, guestEvents 
            } = state;
            const { updatedEvent } = action;
            updatedEvent.id = Number(updatedEvent.id)

            /* Update할 이벤트를 찾아서 ownerEvents 리스트의 해당 이벤트를 변경 */
            const IdxOfEventToUpdate = ownerEvents.findIndex( event => event.id === updatedEvent.id )
            const modifiedOwnerEvents = [ ...ownerEvents.slice(0, IdxOfEventToUpdate), updatedEvent, ...ownerEvents.slice(IdxOfEventToUpdate + 1) ]

            return {
                ...state,
                eventsToRenderObj: updateEventsToRenderObj( totalOrMyOption, isClosedHidden, {
                    closedEvents, activeEvents, guestEvents, ownerEvents: modifiedOwnerEvents
                } ),
                ownerEvents: modifiedOwnerEvents,
                selectedEvent: updatedEvent,
            }
        }

        /* 이벤트 마감 또는 마감 취소 */
        case CARPOOL_POST_EVENT_CANCLE_OR_CLOSE_SUCCESS: {
            const { 
                totalOrMyOption, isClosedHidden, 
                closedEvents, activeEvents, ownerEvents, guestEvents 
            } = state;
            const { eventID } = action;

            /* 변경할 이벤트 찾기 */
            const IdxOfEventToUpdate = ownerEvents.findIndex( event => event.id === eventID )
            const EventToUpdate = ownerEvents[IdxOfEventToUpdate]

            /* 해당 이벤트의 라벨 값 변경 */
            if ( EventToUpdate.label === OWNER ) { EventToUpdate.label = OWNER_CLOSED }
            else { EventToUpdate.label = OWNER }

            /* 수정된 ownerEvents Array 객체 생성 */
            const modifiedOwnerEvents = [ ...ownerEvents.slice(0, IdxOfEventToUpdate), EventToUpdate, ...ownerEvents.slice(IdxOfEventToUpdate + 1) ]

            return {
                ...state,
                eventsToRenderObj: updateEventsToRenderObj( totalOrMyOption, isClosedHidden, {
                    closedEvents, activeEvents, guestEvents, ownerEvents: modifiedOwnerEvents
                } ),
                ownerEvents: modifiedOwnerEvents,
                selectedEvent: EventToUpdate,
            }
        }

        /* 참가 신청 완료 성공 시 리듀서 */
        case CARPOOL_JOIN_EVENT_SUCCESS: {
            const { 
                totalOrMyOption, isClosedHidden, 
                closedEvents, activeEvents, ownerEvents, guestEvents 
            } = state;
            const { eventID } = action;
            let isActiveEvent = true;

            /* active 또는 closed 리스트에서 수정할 이벤트 객체를 찾기 */
            let IdxOfEventToReplace = activeEvents.findIndex( event => event.id === eventID )
            if (IdxOfEventToReplace === -1) {
                IdxOfEventToReplace = closedEvents.findIndex( event => event.id === eventID );
                isActiveEvent = false;
            }
            /* 해당 이벤트의 라벨 값을 변경 */
            const eventToReplace = isActiveEvent ? activeEvents[IdxOfEventToReplace] : closedEvents[IdxOfEventToReplace];
            eventToReplace.label = isActiveEvent ? GUEST : GUEST_CLOSED;

            /* 수정된 카풀 이벤트 객체들을 담은 리스트 */
            const modifiedActiveEvents = isActiveEvent ? [...activeEvents.slice(0, IdxOfEventToReplace), ...activeEvents.slice(IdxOfEventToReplace + 1)] : activeEvents;
            const modifiedClosedEvents = isActiveEvent ? closedEvents : [...closedEvents.slice(0, IdxOfEventToReplace), ...closedEvents.slice(IdxOfEventToReplace + 1)];
            const modifiedGuestEvents = [...guestEvents, eventToReplace];

            return {
                ...state,
                eventsToRenderObj: updateEventsToRenderObj( totalOrMyOption, isClosedHidden, {
                    closedEvents: modifiedClosedEvents, activeEvents: modifiedActiveEvents,
                    guestEvents: modifiedGuestEvents, ownerEvents
                } ),
                closedEvents: modifiedClosedEvents,
                activeEvents: modifiedActiveEvents,
                guestEvents: modifiedGuestEvents,
            }
        }

        /* 참가 신청 취소 요청 성공 리듀서 */
        case CARPOOL_CANCLE_JOIN_EVENT_SUCCESS: {
            const { 
                totalOrMyOption, isClosedHidden, 
                closedEvents, activeEvents, ownerEvents, guestEvents 
            } = state;
            const { eventID } = action;
            
            /* 참가 신청 취소한 이벤트 찾기 */
            const IdxOfEventToReplace = guestEvents.findIndex( event => event.id === eventID )
            const eventToReplace = guestEvents[IdxOfEventToReplace];
            
            /* 참가 신청 취소한 이벤트의 label 값 변경 */
            const isActiveEvent = eventToReplace.label === GUEST;
            eventToReplace.label = isActiveEvent ? ACTIVE : CLOSED;
            
            /* 수정된 카풀 이벤트 객체들을 담은 리스트 */
            const modifiedClosedEvents = isActiveEvent ? closedEvents : [...closedEvents, eventToReplace];
            const modifiedActiveEvents = isActiveEvent ? [...activeEvents, eventToReplace] : activeEvents;
            const modifiedGuestEvents = [...guestEvents.slice(0, IdxOfEventToReplace), ...guestEvents.slice(IdxOfEventToReplace + 1)];

            return {
                ...state,
                eventsToRenderObj: updateEventsToRenderObj( totalOrMyOption, isClosedHidden, {
                    closedEvents: modifiedClosedEvents, activeEvents: modifiedActiveEvents,
                    ownerEvents, guestEvents: modifiedGuestEvents
                } ),
                closedEvents: modifiedClosedEvents,
                activeEvents: modifiedActiveEvents,
                guestEvents: modifiedGuestEvents,
            }
        }

        default:
            return state;
    }
}


/* Owner, Guest 이벤트 리스트에서 closed hidden 여부에 따라 각각의 closed 이벤트를 filter하는 함수 */
const filterOwnerGuestEvents = (ownerEvents, guestEvents, isClosedHidden) => {
    
    console.log(isClosedHidden)

    let ownerEventsToRender = ownerEvents;
    let guestEventsToRender = guestEvents;
    
    if ( isClosedHidden ) {
        ownerEventsToRender = ownerEvents.filter( event => event.label === OWNER );
        guestEventsToRender = guestEvents.filter( event => event.label === GUEST );
    }

    return {
        ownerEventsToRender, guestEventsToRender
    }
}


/* eventsToRenderObj 객체를 update하는 함수 */
const updateEventsToRenderObj = (option, isClosedHidden, {closedEvents, activeEvents, ownerEvents, guestEvents}) => {
    if ( option === TOTAL ) {
        return {
            C: isClosedHidden ? [] : closedEvents,
            A: activeEvents,
            O: ownerEvents,
            G: guestEvents
        }
    } 

    else {
        const ownerEventsToRender = ownerEvents;
        const guestEventsToRender = guestEvents;

        if ( isClosedHidden ) {
            ownerEventsToRender = ownerEvents.filter( event => event.label === OWNER );
            guestEventsToRender = guestEvents.filter( event => event.label === GUEST );
        }

        return {
            C: [],
            A: [],
            O: ownerEventsToRender,
            G: guestEventsToRender 
        }
    }
}