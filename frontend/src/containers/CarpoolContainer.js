

// 상위 컴포넌트: pages/Carpool

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SideBar from "../components/Structure/SideBar";
import CarpoolBoard from "../components/Carpool";
import { 
    initiateCarpoolState,
    selectDate,
    getCarpoolEvents,
    initCalenderEvents, changeClosedEvents,
    renderTotalEvents, renderMyEvents,
    storeClickedEventData,
    postDeleteEventRequest,
    storeEventUpdateData, postUpdateEventRequest,
    postCloseOrCancleEventRequest,
    postJoinEventRequest, postCancleJoinEventRequest,
} from "../store/actions/carpool";
import { topicSelect } from "../store/actions/topic";
import { getStatusRequest } from "../store/actions/auth";
import { CARPOOL } from "../constants/categories";

class CarpoolContainer extends Component {    

    componentDidMount() {
        const { initiateCarpoolState, topicSelect, getCarpoolEvents, getStatusRequest } = this.props;

        initiateCarpoolState();
        topicSelect(CARPOOL);
        getCarpoolEvents();
        getStatusRequest();
    }

    render() {
        const { 
            curUser,
            isGetStatusDone,
            isCarpoolGetDone,

            totalOrMyOption,
            eventsToRenderObj,
            selectedDate, 
            eventsOnSelectedDate,
            selectedEvent,
            eventDataToUpdate,
        
            initCalenderEvents,
            renderTotalEvents,
            renderMyEvents,
            changeClosedEvents,
            selectDate,
            storeClickedEventData,
            deleteEvent,
            storeEventUpdateData,
            updateEvent,
            closeOrCancleEvent,
            joinEvent,
            cancleJoinEvent,
        } = this.props;

        const isLoaded = isGetStatusDone && isCarpoolGetDone;

        return (
            isLoaded ?
            
                curUser ?

                <div>
                    <SideBar topic={CARPOOL} />

                    <CarpoolBoard 
                        curUser={curUser}
                        totalOrMyOption={totalOrMyOption}
                        eventsObj={eventsToRenderObj}
                        selectedDate={selectedDate}
                        eventsOnSelectedDate={eventsOnSelectedDate}
                        selectedEvent={selectedEvent}
                        eventDataToUpdate={eventDataToUpdate}

                        initCalenderEvents={initCalenderEvents}
                        renderTotalEvents={renderTotalEvents}
                        renderMyEvents={renderMyEvents}
                        changeClosedEvents={changeClosedEvents}
                        selectDate={selectDate}
                        storeClickedEventData={storeClickedEventData}
                        deleteEvent={deleteEvent}
                        storeEventUpdateData={storeEventUpdateData}
                        updateEvent={updateEvent}
                        closeOrCancleEvent={closeOrCancleEvent}
                        joinEvent={joinEvent}
                        cancleJoinEvent={cancleJoinEvent}
                    /> 
                </div> :
            
                <Redirect to='/' />:

            ''
        )
                    
        
    }
}

const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,
        isGetStatusDone: state.auth.isGetStatusDone,                // get status 요청 완료 여부

        isCarpoolGetDone: state.carpool.isGetSuccess,               // carpool 일정 데이터 요청 완료 여부
        
        totalOrMyOption: state.carpool.totalOrMyOption,
        eventsToRenderObj: state.carpool.eventsToRenderObj,

        selectedDate: state.carpool.selectedDate,
        eventsOnSelectedDate: state.carpool.eventsOnSelectedDate,
        selectedEvent: state.carpool.selectedEvent,
        eventDataToUpdate: state.carpool.eventDataToUpdate,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        topicSelect: (topic) => {dispatch(topicSelect(topic))},                             // App의 topic state를 CARPOOL로 설정
        getStatusRequest: () => {dispatch(getStatusRequest())},                             // 현재 유저 정보를 가져오는 액션

        getCarpoolEvents: () => dispatch(getCarpoolEvents()),                               // 카풀 전체 이벤트를 get 요청하는 액션

        initiateCarpoolState: () => dispatch(initiateCarpoolState()),                       // carpool state 초기화
        initCalenderEvents: (category) => dispatch(initCalenderEvents(category)),           // 캘린더 첫 화면에서 띄울 events를 받는 액션
        renderTotalEvents: () => {dispatch(renderTotalEvents())},                           // 전체 이벤트를 띄우는 액션
        renderMyEvents: () => dispatch(renderMyEvents()),                                   // 내 일정만 보기 액션
        changeClosedEvents: (isHidden) => dispatch(changeClosedEvents(isHidden)),           // 마감된 일정 보이기 / 없애기

        selectDate: (category, date) => {dispatch(selectDate(category, date))},             // Carpool 캘린더의 date를 선택하는 액션 
        storeClickedEventData: (id) => {dispatch(storeClickedEventData(id))},               // 이벤트를 클릭하는 이벤트를 핸들하는 액션

        deleteEvent: (id) => {dispatch(postDeleteEventRequest(id))},                        // 이벤트를 지우는 액션
        storeEventUpdateData: (key, value) => dispatch(storeEventUpdateData(key, value)),   // 수정할 이벤트의 데이터를 저장하는 액션
        updateEvent: (id, eventData) => {dispatch(postUpdateEventRequest(id, eventData))},  // 이벤트 수정 액션

        closeOrCancleEvent: (eventID, condition) => {                                       // 마감 또는 마감 취소 액션
            dispatch(postCloseOrCancleEventRequest(eventID, condition))
        },
        joinEvent: (eventID) => {dispatch(postJoinEventRequest(eventID))},                  // 이벤트 참가 신청 액션
        cancleJoinEvent: (guestID) => {dispatch(postCancleJoinEventRequest(guestID))},      // 이벤트 참가 신청 취소 액션 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);