

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
            eventsToRenderObj,
            selectedDate, 
        
            initCalenderEvents,
            renderTotalEvents,
            renderMyEvents,
            changeClosedEvents,
            selectDate,
        } = this.props;

        return (
            isGetSuccess ?
            
            <div>
                <SideBar topic={CARPOOL} />

                <CarpoolBoard 
                    eventsObj={eventsToRenderObj}
                    selectedDate={selectedDate}

                    initCalenderEvents={initCalenderEvents}
                    renderTotalEvents={renderTotalEvents}
                    renderMyEvents={renderMyEvents}
                    changeClosedEvents={changeClosedEvents}
                    selectDate={selectDate}
                /> 
            </div> :
            
            ''
        )
                    
        
    }
}

const mapStateToProps = (state) => {
    return {
        isGetSuccess: state.carpool.isGetSuccess,
        
        eventsToRenderObj: state.carpool.eventsToRenderObj,

        selectedDate: state.carpool.selectedDate,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        topicSelect: (topic) => {dispatch(topicSelect(topic))},                     // App의 topic state를 CARPOOL로 설정
        getCarpoolEvents: () => dispatch(getCarpoolEvents()),                       // 카풀 전체 이벤트를 get 요청하는 액션

        initCalenderEvents: (category) => dispatch(initCalenderEvents(category)),   // 캘린더 첫 화면에서 띄울 events를 받는 액션
        renderTotalEvents: () => {dispatch(renderTotalEvents())},                   // 전체 이벤트를 띄우는 액션
        renderMyEvents: () => dispatch(renderMyEvents()),                           // 내 일정만 보기 액션
        changeClosedEvents: (isHidden) => dispatch(changeClosedEvents(isHidden)),   // 마감된 일정 보이기 / 없애기

        selectDate: (date) => {dispatch(selectDate(date))},                         // Carpool 캘린더의 date를 선택하는 액션 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarpoolContainer);