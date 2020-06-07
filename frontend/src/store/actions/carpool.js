import axios from "axios";
import qs from 'qs';

import { 
    CARPOOL_INITATE_STATE,
    CARPOOL_SELECT_DATE,
    CARPOOL_GET_EVENTS_SUCCESS,
    CARPOOL_GET_EVENTS_FAILURE,
    INITIATE_CALENDER_EVENTS,
    RENDER_TOTAL_CALENDER_EVENTS,
    RENDER_MY_CALENDER_EVENTS,
    CHANGE_CLOSED_CALENDER_EVENTS,
    CARPOOL_CLICK_EVENT,
    CARPOOL_STORE_EVENT_UPDATE_DATA,
    CARPOOL_POST_EVENT_UPDATE_SUCCESS,
    CARPOOL_JOIN_EVENT_SUCCESS,
    CARPOOL_CANCLE_JOIN_EVENT_SUCCESS,
    CARPOOL_POST_EVENT_CANCLE_OR_CLOSE_SUCCESS
} from "./ActionTypes";

import { x_www_PostRequestFuction } from "./RefactoringFuncs";


export const initiateCarpoolState = () => {
    return {
        type: CARPOOL_INITATE_STATE
    }
}


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
    /* POST 요청 시 사용되는 url */
    const POSTurl = `/api/carpool/update/${id}`;

    /* POST Request Body Data */
    const { departure, destination, start_date, start_time, meeting_place, contact, description } = eventData;

    start_date.setUTCHours(0);
    start_date.setUTCMinutes(0);

    const DateToTime = start_date.getTime();
    const HoursToTime = start_time.getUTCHours() * 60 * 60 * 1000;
    const MinutesToTime = start_time.getUTCMinutes() * 60 * 1000;
    const start = new Date(DateToTime + HoursToTime + MinutesToTime);

    const reqBody = { departure, destination, start, meeting_place, contact, description }

    return x_www_PostRequestFuction(POSTurl, reqBody, postUpdateEventSuccess)
}

export function postUpdateEventSuccess (res) {
    return {
        type: CARPOOL_POST_EVENT_UPDATE_SUCCESS,
        updatedEvent: res.data.events
    }
}


/* 마감 또는 마감 취소 요청 액션 */
export function postCloseOrCancleEventRequest (eventID, condition) {
    /* POST 요청 시 사용되는 url */
    const POSTurl = `/api/carpool/update/${eventID}`;

    /* POST Request Body Data */
    const reqBody = { condition }

    return x_www_PostRequestFuction(POSTurl, reqBody, postCloseOrCancleEventSuccess)
}

export function postCloseOrCancleEventSuccess (res) {
    const eventID = Number(res.data.events.id);
    return {
        type: CARPOOL_POST_EVENT_CANCLE_OR_CLOSE_SUCCESS,
        eventID
    }
}


/* 카풀방 참가 신청 POST 요청 액션 */
export function postJoinEventRequest ( eventID ) {
    /* POST 요청 시 사용되는 url */
    const POSTurl = `/api/carpool/guest/create/${eventID}`;

    /* POST Request Body Data */
    const reqBody = {};

    return x_www_PostRequestFuction(POSTurl, reqBody, postJoinEventSuccess);
}

export function postJoinEventSuccess (res) {
    const eventID = Number(res.data.event_id)
    return {
        type: CARPOOL_JOIN_EVENT_SUCCESS,
        eventID
    }
}


/* 카풀방 참가 신청 취소 POST 요청 액션 */
export function postCancleJoinEventRequest ( eventID ) {
    return (dispatch) => {
        const POSTurl = `/api/carpool/guest/delete/${eventID}`;
        axios.post(POSTurl)
        .then(res => dispatch(postCancleJoinEventSuccess(res)))
    }
}

export function postCancleJoinEventSuccess (res) {
    const eventID = Number(res.data.event_id)
    return {
        type: CARPOOL_CANCLE_JOIN_EVENT_SUCCESS,
        eventID
    }
}
