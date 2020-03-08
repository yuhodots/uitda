

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


/* React Component */
class DateInfoBox extends Component {

    /* Date => yyyy-mm-dd */
    _dateToStr = (date) => {
        const mm = date.getMonth() + 1 ;
        const dd = date.getDate();

        return `${mm}월 ${dd}일 일정`;
    }


    render() {

        const { selectedDate } = this.props;

        const dateStr = this._dateToStr(selectedDate)

        return (
            <WholeBoxArea>
                <DateTitleBox>{dateStr}</DateTitleBox>
                <div>전체 일정 보기</div>
                <div>내 일정만 보기</div>
                <div>마감 일정 없애기</div>
            </WholeBoxArea>
        )
    }
}

DateInfoBox.propTypes = {
    selectedDate: PropTypes.object.isRequired,

}

export default DateInfoBox;