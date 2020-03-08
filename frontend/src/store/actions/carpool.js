import axios from "axios";

import { 
    CARPOOL_SELECT_DATE,
    CARPOOL_GET_EVENTS_SUCCESS,
    CARPOOL_GET_EVENTS_FAILURE,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
    CARPOOL_CLICK_EVENT,
} from "./ActionTypes";


/* 캘린더의 날짜를 선택하는 액션 */
export function selectDate (category, selectedDate) {
    return {
        type: CARPOOL_SELECT_DATE,
        category, selectedDate
    }
}

/* 카풀 탭의 전체 Event 데이터 GET 요청 액션 */
export function getCarpoolEvents () {
    return (dispatch) => {

        /* GET 요청을 보낼 url */
        const GETurl = '/api/carpool';

        return axios.get(GETurl)

        .then(res => dispatch(getCarpoolEventsSuccess(res.data.events)))
        .catch(err => dispatch(getCarpoolEventsFailure(err)))
    }
}

export function getCarpoolEventsSuccess (events) {
    return {
        type: CARPOOL_GET_EVENTS_SUCCESS,
        events,
    }
}

export function getCarpoolEventsFailure (err) {
    return {
        type: CARPOOL_GET_EVENTS_FAILURE,
        err,
    }
}


/* Calender의 events_to_render 객체의 데이터를 변경하는 액션들 */

/* 카테고리 (manage, carpool)에 따른 
   첫 화면에서 나타낼 캘린더의 이벤트를 설정하는 액션 */
export function initCalenderEvents (category) {
    return {
        type: INITIATE_CALENDER_EVENTS,
        category
    }
}

/* 전체 일정(A, O, G)이 events_to_render에 담기게 하는 액션 */
export function renderTotalEvents () {
    return {
        type: RENDER_TOTAL_CALENDER_EVENTS
    }
}

/* 내 일정(O, G)만 events_to_render에 담기게 하는 액션 */
export function renderMyEvents () {
    return {
        type: RENDER_MY_CALENDER_EVENTS
    }
}

/* 마감된 일정 보기 체크 함수 */
export function changeClosedEvents (isHidden) {
    return {
        type: CHANGE_CLOSED_CALENDER_EVENTS,
        isHidden
    }
}


/* 이벤트 클릭 헨들러 함수 */
export function storeClickedEventData (eventID) {
    return {
        type: CARPOOL_CLICK_EVENT,
        eventID
    }
}