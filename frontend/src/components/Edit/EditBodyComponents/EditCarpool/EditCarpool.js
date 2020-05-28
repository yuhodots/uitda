

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BaseCalendar from "../../../Structure/Base_Calendar";
import {
    PlaceInputBox,
    TimePickerBox,
    SubInfoInputBox,
    DescriptionBox,
} from './Subcomponents';
import { colors, Screen_Size } from '../../../../styles/variables'
import { MANAGE } from "../../../../constants/categories";
import { CONTACT, MEETING_PALCE } from "../../../../constants/edit_Input_Data_Keys";


/* Styled Components */

/* Header 영역을 제외한 영역을 나타내는 div 태그 */
const WholeArea = styled.div`
    min-height: ${props => props.windowHeight - 64}px;
    padding: 2rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    @media (max-width: ${Screen_Size.labtop}) {
        padding: 1rem;
    }
`;

    const ContentContainer = styled.div`
        margin: 0 auto;
        
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        /* Calendar Box와 RoomInfo Box의 공통 속성 */
        const ContentBoxTemplate = styled.div`
            margin: 0 1rem;
            height: ${props => props.boxHeight}px;
            min-height: 553px;  /* 최소 높이는 1377 x 768 해상도 모니터의 브라우저 크기를 기준 */
            padding: 2rem;
            
            background-color: ${colors.white};
            
            display: flex;
            flex-flow: column nowrap;
            
            /* 노트북 기준의 padding margin 값 */
            @media (max-width: ${Screen_Size.labtop}) {
                margin: 0 0.5rem;
                padding: 1rem;
            }

            /* @media (max-width: ${Screen_Size.pad_landScape}) {
                margin: 0 auto;
            } */
        `;

        /* 캘린더 영역 div 태그 */
        const CalendarBox = styled(ContentBoxTemplate)`
            min-width: 35rem;
            width: ${props => props.boxHeight * 1.43 }px;
        `;

            /* ContentBox의 padding값을 제외한 높이를 전달하기 위해 씌운 div태그 */
            const CalendarContainer = styled.div`
                flex: 1;
                height: 100%;
            `

        /* 카풀 방 정보를 입력하는 div 태그 */
        const RoomInfoBox = styled(ContentBoxTemplate)`
            min-width: 17rem;
            width: ${props => props.boxHeight * 0.73 }px;

            display: flex;
            flex-flow: column nowrap;
        `;


/* React Component */
class EditCarpool extends Component {

    state = {}

    componentDidMount() {
        this.setState({
            isLoaded: true
        })
    }

    render () {

        const { isLoaded } = this.state;

        const {
            windowHeight,
            selectedDate,
            eventsObj,

            initCalenderEvents,
            selectDate,
            storeCarpoolData
        } = this.props;

        const height = windowHeight - 192;    // 화면 높이에서 padding값 + 헤더 높이 (8rem) 을 뺀 값

        return ( isLoaded ?
            <WholeArea windowHeight={windowHeight} >
                <ContentContainer>
                    <CalendarBox boxHeight={height} >    
                        <CalendarContainer>
                            <BaseCalendar 
                                category={MANAGE}

                                eventsObj={eventsObj}
                                selectedDate={selectedDate}

                                initCalenderEvents={initCalenderEvents}
                                selectDate={selectDate}
                            />
                        </CalendarContainer>
                    </CalendarBox>

                    <RoomInfoBox boxHeight={height} >
                        <PlaceInputBox storeCarpoolData={storeCarpoolData} />
                        <TimePickerBox storeCarpoolData={storeCarpoolData} />
                        <SubInfoInputBox dataKey={MEETING_PALCE} storeCarpoolData={storeCarpoolData} />
                        <SubInfoInputBox dataKey={CONTACT} storeCarpoolData={storeCarpoolData} />
                        <DescriptionBox storeCarpoolData={storeCarpoolData} />
                    </RoomInfoBox>
                </ContentContainer>
            </WholeArea> :
            ''
        )
    }
}

EditCarpool.propTypes = {
    windowHeight: PropTypes.number.isRequired,          // 최소 화면 높이
    selectedDate: PropTypes.object,                     // Carpool 탭에서 선택된 날짜 데이터
    eventsObj: PropTypes.object.isRequired,             // 카풀 탭의 캘린더에 띄울 일정 데이터 객체

    initCalenderEvents: PropTypes.func.isRequired,      // 캘린더 첫 화면에서 띄울 events를 받는 액션
    selectDate: PropTypes.func.isRequired,              // Carpool 탭에서 날짜를 선택하는 메서드
    storeCarpoolData: PropTypes.func.isRequired,        // Carpool 탭의 Room Info Data를 저장하는 메서드
}


export default EditCarpool;