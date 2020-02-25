

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Calendar from './Subcomponents/Calendar';
import { colors } from '../../../../../styles/variables'


/* Styled Components */

const WholeArea = styled.div`
    min-height: ${props => props.windowHeight - 64}px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`

const ContentBoxTemplate = styled.div`
    margin: 0 2rem;
    height: ${props => props.boxHeight}px;
    min-height: 503px;  /* 최소 높이는 1377 x 768 해상도 모니터의 브라우저 크기를 기준 */
    padding: 2rem;

    background-color: ${colors.white};

    display: flex;
    flex-flow: column nowrap;
`;

const CalendarBox = styled(ContentBoxTemplate)`
    min-width: 45rem;
    width: ${props => props.boxHeight * 1.43 }px;
`;

    /* ContentBox의 padding값을 제외한 높이를 전달하기 위해 씌운 div태그 */
    const CalendarContainer = styled.div`
        flex: 1;
    `

const RoomInfoBox = styled(ContentBoxTemplate)`
    min-width: 23rem;
    width: ${props => props.boxHeight * 0.73 }px;
`


/* React Component */

class EditCarpool extends Component {


    render () {

        const {
            windowHeight
        } = this.props;

        const height = windowHeight - 192;    // 화면 높이에서 padding값 + 헤더 높이 (8rem) 을 뺀 값

        return (
            <WholeArea windowHeight={windowHeight} >
                <CalendarBox boxHeight={height} >    
                    <CalendarContainer>
                        <Calendar />
                    </CalendarContainer>
                </CalendarBox>
                <RoomInfoBox boxHeight={height} ></RoomInfoBox>
            </WholeArea>
        )
    }
}

EditCarpool.propTypes = {
    windowHeight: PropTypes.number.isRequired,     // 최소 화면 높이
}


export default EditCarpool;