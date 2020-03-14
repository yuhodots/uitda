

// 상위 컴포넌트: pages/Carpool

import React, { Component } from "react";
import { connect } from 'react-redux';

import SideBar from "../components/Structure/SideBar";
import CarpoolBoard from "../components/Carpool";
import { 
    selectDate,
    getCarpoolEvents,
    initCalenderEvents, changeClosedEvents,
    renderTotalEvents, renderMyEvents,
    storeClickedEventData,
    postDeleteEventRequest,
    storeEventUpdateData, postUpdateEventRequest,
} from "../store/actions/carpool";
import { topicSelect } from "../store/actions/topic";
import { CARPOOL } from "../constants/categories";

class CarpoolContainer extends Component {    

    componentDidMount() {
        const { topicSelect, getCarpoolEvents } = this.props;

        topicSelect(CARPOOL);
        getCarpoolEvents();
    }

    render() {
        const { 
            isGetSuccess,
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
        } = this.props;

        return (
            isGetSuccess ?
            
            <div>
                <SideBar topic={CARPOOL} />

                <CarpoolBoard 
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
                /> 
            </div> :
            
            ''
        )
                    
        
    }
}

const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.carpool.isGetSuccess,
        
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
        getCarpoolEvents: () => dispatch(getCarpoolEvents()),                               // 카풀 전체 이벤트를 get 요청하는 액션

        initCalenderEvents: (category) => dispatch(initCalenderEvents(category)),           // 캘린더 첫 화면에서 띄울 events를 받는 액션
        renderTotalEvents: () => {dispatch(renderTotalEvents())},                           // 전체 이벤트를 띄우는 액션
        renderMyEvents: () => dispatch(renderMyEvents()),                                   // 내 일정만 보기 액션
        changeClosedEvents: (isHidden) => dispatch(changeClosedEvents(isHidden)),           // 마감된 일정 보이기 / 없애기

        selectDate: (category, date) => {dispatch(selectDate(category, date))},             // Carpool 캘린더의 date를 선택하는 액션 
        storeClickedEventData: (id) => {dispatch(storeClickedEventData(id))},               // 이벤트를 클릭하는 이벤트를 핸들하는 액션

        deleteEvent: (id) => {dispatch(postDeleteEventRequest(id))},                        // 이벤트를 지우는 액션
        storeEventUpdateData: (key, value) => dispatch(storeEventUpdateData(key, value)),   // 수정할 이벤트의 데이터를 저장하는 액션
        updateEvent: (id, eventData) => {dispatch(postUpdateEventRequest(id, eventData))},  // 이벤트 수정 액션
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);