import axios from "axios";
import qs from 'qs';

import { 
    CARPOOL_SELECT_DATE,
    CARPOOL_GET_EVENTS_SUCCESS,
    CARPOOL_GET_EVENTS_FAILURE,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
    CARPOOL_CLICK_EVENT,
    CARPOOL_STORE_EVENT_UPDATE_DATA,
    CARPOOL_POST_EVENT_UPDATE_SUCCESS
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


/* 카풀 일정 삭제 POST request 액션 */
export function postDeleteEventRequest (eventID) {
    return (dispatch) => {

        const POSTurl = `/api/carpool/delete/${eventID}`;

        axios.post(POSTurl)
    }
}


/* 카풀 update 요청에 보낼 데이터를 저장하는 액션 */
export function storeEventUpdateData (data_key, data_value) {
    return {
        type: CARPOOL_STORE_EVENT_UPDATE_DATA,
        data_key, data_value
    }
}

/* 카풀 일정 update POST request 액션 */
export function postUpdateEventRequest (id, eventData) {
    return (dispatch) => {
        
        /* POST 요청 시 사용되는 url */
        const POSTurl = `/api/carpool/update/${id}`;

        /* POST Request Body Data */
        const { departure, destination, meeting_place, contact, description } = eventData;
        const requestBody = { departure, destination, meeting_place, contact, description }

        /* POST Request config Data */
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        /* POST Request */
        return axios.post(POSTurl, qs.stringify(requestBody), config)
        .then(res => {dispatch(postUpdateEventSuccess(res))})
        // .catch(err => {dispatch(postCarpoolEventFailure(err))})
    }
}

export function postUpdateEventSuccess () {
    return {
        type: CARPOOL_POST_EVENT_UPDATE_SUCCESS
    }
}