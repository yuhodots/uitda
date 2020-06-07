

// 상위 컴포넌트: CarpoolContainer

import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from "antd";

import BaseCalendar from "../Structure/Base_Calendar";
import { MenuBox, DateInfoBox, RoomModalBox } from "./SubComponents";
import { colors, Screen_Size } from "../../styles/variables";
import { CARPOOL } from "../../constants/categories";

/* Styled Components */

/* 전체 배경 영역 div 태그 */
const BackGroundDiv = styled.div`
    width: 100%;
    min-width: 1280px;
    min-height: ${props => `${props.windowHeight}px`};
    padding-left: 15rem;
    background-color: ${colors.gray_bg};

    display: flex;

    @media (max-width: ${Screen_Size.pad_portrait}) {
        padding-left: 12rem;
    }
`;

/* 전체 모든 Box들의 영역을 나타내는 div 태그 */
const ContentArea = styled.div`
    width: 90%;
    min-width: 1030px;
    margin: 1.5rem auto;

    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1500px) {
        margin: 1rem auto;
    }
`;

/* 하단 CalendarBox + InfoBox 영역 */
const CalendarInfoArea = styled.div`
    margin-top: 1.5rem;
    flex: 1;
    
    display: flex;
    flex-flow: row nowrap;

    @media (max-width: 1500px) {
        margin-top: 0.75rem;
    }
`;

    /*  */
    const CalendarBox = styled.div`
        padding: 2rem;
        margin-right: 1.5rem;
        flex: 1;

        background-color: ${colors.white};

        display: flex;
        flex-flow: row nowrap;
        align-items: stretch;

        @media (max-width: 1500px) {
            margin-right: 0.75rem;
            padding: 1rem;
        }
    `;

        const CalendarContainer = styled.div`
            flex: 1;
        `;


/* React Component */
class CarpoolBoard extends Component {

    state = {
        modalVisible: false,
    }

    componentDidMount() {
        this.setState({
            windowHeight: window.innerHeight     // 현재 창의 높이 크기
        })

        /* 브라우저 창의 크기가 변하는 이벤트를 감지한다. */
        window.addEventListener('resize', this._handleResize) 

        this.setState({
            ...this.state,
            isLoaded: true,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._handleResize)
    }

    _handleResize = (e) => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }

    /* Modal 창을 띄우는 메서드 */
    _openModalWindow = () => {
        this.setState({
            ...this.state,
            modalVisible: true
        })
    }

    _closeModalWindow = () => {
        this.setState({
            ...this.state,
            modalVisible: false
        })
    }

    render() {

        const { windowHeight, isLoaded, modalVisible } = this.state;

        const {
            curUser,
            totalOrMyOption,
            eventsObj,
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
        } = this.props

        return (
            isLoaded ?
            <BackGroundDiv windowHeight={windowHeight} >
                <ContentArea >
                    <MenuBox 
                        renderTotalEvents={renderTotalEvents}
                        renderMyEvents={renderMyEvents}
                        changeClosedEvents={changeClosedEvents}
                    />

                    <CalendarInfoArea>
                        <CalendarBox >
                            <CalendarContainer>
                                <BaseCalendar 
                                    category={CARPOOL}
                                    totalOrMyOption={totalOrMyOption}
                                    eventsObj={eventsObj}
                                    selectedDate={selectedDate}

                                    initCalenderEvents={initCalenderEvents}
                                    selectDate={selectDate}
                                    storeClickedEventData={storeClickedEventData}
                                    openModalWindow={this._openModalWindow}
                                />
                            </CalendarContainer>
                        </CalendarBox>
                        
                        <DateInfoBox 
                            clientHeight={windowHeight}
                            selectedDate={selectedDate}
                            totalOrMyOption={totalOrMyOption}
                            eventsOnSelectedDate={eventsOnSelectedDate}

                            storeClickedEventData={storeClickedEventData}
                            openModalWindow={this._openModalWindow}
                        />
                    </CalendarInfoArea>

                    <Modal 
                        visible={modalVisible} 
                        onCancel={this._closeModalWindow} 
                        footer={null}
                        closable={false}
                    >
                        <RoomModalBox 
                            curUser={curUser}
                            selectedEvent={selectedEvent}
                            eventDataToUpdate={eventDataToUpdate}
                            
                            cancleModal={this._closeModalWindow} 
                            deleteEvent={deleteEvent} 
                            storeEventUpdateData={storeEventUpdateData}
                            updateEvent={updateEvent}
                            closeOrCancleEvent={closeOrCancleEvent}
                            joinEvent={joinEvent}
                            cancleJoinEvent={cancleJoinEvent}
                        />
                    </Modal>
                </ContentArea>
            </BackGroundDiv> :
            ''
        )
    }
}

CarpoolBoard.propTypes = {
    curUser: PropTypes.oneOfType([                      // 현재 유저 정보
        PropTypes.number, PropTypes.object
    ]).isRequired,
    totalOrMyOption: PropTypes.string.isRequired,       // 전체 일정 or 내 일정
    eventsObj: PropTypes.object.isRequired,             // 전체 카풀 이벤트 데이터
    selectedDate: PropTypes.object.isRequired,          // 캘린더에서 선택된 날짜 정보
    eventsOnSelectedDate: PropTypes.array.isRequired,   // 선택된 날짜에 해당하는 일정 목록
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
    eventDataToUpdate: PropTypes.object.isRequired,     // 수정 요청 보낼 일정 데이터

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 렌더 시 들어올 events 받는 액션
    renderTotalEvents: PropTypes.func.isRequired,       // 전체 일정 보기
    renderMyEvents: PropTypes.func.isRequired,          // 내 일정만 보기
    changeClosedEvents: PropTypes.func.isRequired,      // 마감된 일정 보기 / 숨기기
    selectDate: PropTypes.func.isRequired,              // 캘린더에서 날짜를 선택하는 액션
    storeClickedEventData: PropTypes.func.isRequired,   // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
    storeEventUpdateData: PropTypes.func.isRequired,    // 수정 요청 보낼 일정 데이터를 저장하는 액션
    updateEvent: PropTypes.func.isRequired,             // 이벤트 수정 액션
    closeOrCancleEvent: PropTypes.func.isRequired,      // 이벤트 마감 또는 마감 취소 액션
    joinEvent: PropTypes.func.isRequired,               // 이벤트 참가 신청 액션
    cancleJoinEvent: PropTypes.func.isRequired,         // 이벤트 참가 신청 취소 액션
}


export default CarpoolBoard;