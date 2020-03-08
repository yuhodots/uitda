

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from "../../../styles/variables";


/* Styled Components */
const WholeBoxArea = styled.div`
    padding: 1.25rem;
    width: 18rem;

    background-color: ${colors.white};
    
    display: flex;
    flex-flow: column nowrap;

    @media (max-width: 1500px) {
        width: 15rem;
    }
`;

    const DateTitleBox = styled.div`
        margin-bottom: 1.25rem;
        display: flex;
        justify-content: center;

        font-size: 1.25rem;
        font-weight: bold;
    `;

    const EventsListBox = styled.div`
    
    `;


/* React Component */
class DateInfoBox extends Component {

    /* Date => yyyy-mm-dd */
    _dateToStr = (date) => {
        const mm = date.getMonth() + 1 ;
        const dd = date.getDate();

        return `${mm}월 ${dd}일 일정`;
    }

    _handleEventClick = (id) => {
        const { storeClickedEventData, openModalWindow } = this.props
        storeClickedEventData(id);
        openModalWindow();
    }

    _renderEventList = (eventDataList) => {

        // console.log(eventDataList)

        return eventDataList.map( (event, idx) => {
            const { id, destination, start } = event
            const startDate = new Date(start);

            return (
                <div 
                    key={idx} 
                    onClick={(e) => this._handleEventClick(id)} 
                >
                    {startDate.getHours()}:{startDate.getMinutes()} {destination} 방향
                </div>
            )
        } )
    }

    render() {

        const { selectedDate, eventsOnSelectedDate } = this.props;

        const dateStr = this._dateToStr(selectedDate)

        return (
            <WholeBoxArea>
                <DateTitleBox>{dateStr}</DateTitleBox>
                <EventsListBox>{this._renderEventList(eventsOnSelectedDate)}</EventsListBox>
            </WholeBoxArea>
        )
    }
}

DateInfoBox.propTypes = {
    selectedDate: PropTypes.object.isRequired,          // 선택된 날짜
    eventsOnSelectedDate: PropTypes.array.isRequired,   // 선택된 날짜에 해당하는 일정 목록

    storeClickedEventData: PropTypes.func.isRequired,   // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    openModalWindow: PropTypes.func,                    // Modal 창을 띄우는 메서드
}

export default DateInfoBox;