

// 상위 컴포넌트: CarpoolContainer

import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from "antd";

import { BaseCalendar } from "../Base_Components";
import { MenuBox, DateInfoBox, RoomBox } from "./SubComponents";
import { colors } from "../../styles/variables";
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
            eventsObj,
            selectedDate,
            eventsOnSelectedDate,
            selectedEvent,

            initCalenderEvents,
            renderTotalEvents,
            renderMyEvents,
            changeClosedEvents,
            selectDate,
            handleClickEvent,
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
                                    eventsObj={eventsObj}
                                    selectedDate={selectedDate}

                                    initCalenderEvents={initCalenderEvents}
                                    selectDate={selectDate}
                                    handleClickEvent={handleClickEvent}
                                    openModalWindow={this._openModalWindow}
                                />
                            </CalendarContainer>
                        </CalendarBox>
                        
                        <DateInfoBox 
                            selectedDate={selectedDate}
                            eventsOnSelectedDate={eventsOnSelectedDate}
                        />
                    </CalendarInfoArea>

                    <Modal 
                        visible={modalVisible} 
                        onCancel={this._closeModalWindow} 
                        footer={null}
                    >
                        <RoomBox selectedEvent={selectedEvent} />
                    </Modal>
                </ContentArea>
            </BackGroundDiv> :
            ''
        )
    }
}

CarpoolBoard.propTypes = {
    eventsObj: PropTypes.object.isRequired,             // 전체 카풀 이벤트 데이터
    selectedDate: PropTypes.object.isRequired,          // 캘린더에서 선택된 날짜 정보
    eventsOnSelectedDate: PropTypes.array.isRequired,   // 선택된 날짜에 해당하는 일정 목록
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 렌더 시 들어올 events 받는 액션
    renderTotalEvents: PropTypes.func.isRequired,       // 전체 일정 보기
    renderMyEvents: PropTypes.func.isRequired,          // 내 일정만 보기
    changeClosedEvents: PropTypes.func.isRequired,      // 마감된 일정 보기 / 숨기기
    selectDate: PropTypes.func.isRequired,              // 캘린더에서 날짜를 선택하는 액션
    handleClickEvent: PropTypes.func.isRequired,        // 이벤트를 클릭하는 이벤트를 핸들하는 액션
}


export default CarpoolBoard;