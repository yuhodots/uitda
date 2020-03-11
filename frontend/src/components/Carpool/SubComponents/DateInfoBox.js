

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Divider } from "antd";

import { colors } from "../../../styles/variables";
import EventListItem from "./EventListItem";
import { ACTIVE, GUEST, OWNER, CLOSED } from '../../../constants/carpool_event_labels';


/* Styled Components */

/* 전체 영역 div 태그 (하얀색 바탕색을 주는 컴포넌트) */
const WholeBoxArea = styled.div`
    padding: 1.25rem;
    width: 18rem;

    background-color: ${colors.white};
    
    overflow: hidden;

    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items: stretch;

    @media (max-width: 1500px) {
        width: 15rem;
    }
`;

    /* InfoBox를 아래 끝에 두기 위해 묶어놓은 div 태그 */
    const UpperBox = styled.div`
        flex: 1;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `;

        /* 날짜 정보 제목이 들어가는 박스 */
        const DateTitleBox = styled.div`
            margin-bottom: 0.5rem;
            display: flex;
            justify-content: center;

            font-size: 1.25rem;
            font-weight: bold;
        `;

        /* DateTitle 밑에 들어가는 구분선 */
        const StyledDivier = styled(Divider)`
            margin-top: 0;
            width: 10rem;
            min-width: 8rem;
        `;

        /* 카풀 일정 목록을 담은 박스 */
        const EventsListBox = styled.div`
            width: 100%;

            display: flex;
            flex-flow: column nowrap;
            align-items: flex-start;
        `;

            /* 해당 일에 카풀방이 없는 경우 띄우는 태그 */
            const NoEventBox = styled.div`
                /* margin-top: 1rem; */
                width: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
            `;

    /* 안내 정보를 담은 div 태그 */
    const InfomationBox = styled.div`
        position: relative;
        width: 12rem;
        padding: 0.75rem;
        padding-top: 1.25rem;
        margin: 0 auto;
        
        border: 1px solid ${colors.gray_line};

        display: flex;
        flex-flow: column nowrap;
        align-items: center;
    `;

        /* Infomation Box Title */
        const InfoTitle = styled.div`
            position: absolute;
            top: -1rem;
            padding: 0 0.25rem;

            font-size: 1.25rem;
            font-weight: bold;

            background-color: ${colors.white};
        `;

        const InfoList = styled.div`
            display: flex;
            flex-flow: column nowrap;
        `;

        const UsingInfo = styled.div`
            cursor: pointer;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            const InfoIcon = styled(InfoCircleOutlined)`
                margin-right: 0.5rem;
            `;


/* React Component */
class DateInfoBox extends Component {

    /* Date => yyyy-mm-dd */
    _dateToStr = (date) => {
        const mm = date.getMonth() + 1 ;
        const dd = date.getDate();

        return `${mm}월 ${dd}일 일정`;
    }

    /* 이벤트 리스트를 render하는 함수 */
    _renderEventList = ( eventDataList ) => {

        const { storeClickedEventData, openModalWindow } = this.props

        return eventDataList.map( event => {
            const { id, label } = event

            return (
                <EventListItem
                    key={id}
                    label={label} event={event}
                    storeClickedEventData={storeClickedEventData}
                    openModalWindow={openModalWindow}
                />
            )
        } )
    }

    render() {

        const { selectedDate, eventsOnSelectedDate } = this.props;

        const dateStr = this._dateToStr(selectedDate)

        return (
            <WholeBoxArea>
                <UpperBox>
                    <DateTitleBox>{dateStr}</DateTitleBox>
                    <StyledDivier />
                    <EventsListBox>
                        {
                            eventsOnSelectedDate.length === 0 ?
                            <NoEventBox>해당일은 일정이 없습니다.</NoEventBox> :
                            this._renderEventList(eventsOnSelectedDate)
                        }
                    </EventsListBox>
                </UpperBox>

                <InfomationBox>
                    <InfoTitle>Infomation</InfoTitle>
                    <InfoList>
                        <EventListItem label={ACTIVE} infoText='모집중인 일정' />
                        <EventListItem label={GUEST} infoText='참가 신청한 일정' />
                        <EventListItem label={OWNER} infoText='내가 만든 일정' />
                        <EventListItem label={CLOSED} infoText='마감된 일정' />
                        <UsingInfo>
                            <InfoIcon />
                            카풀 이용 안내
                        </UsingInfo>
                    </InfoList>
                </InfomationBox>
            </WholeBoxArea>
        );
    }
}

DateInfoBox.propTypes = {
    selectedDate: PropTypes.object.isRequired,          // 선택된 날짜
    eventsOnSelectedDate: PropTypes.array.isRequired,   // 선택된 날짜에 해당하는 일정 목록

    storeClickedEventData: PropTypes.func.isRequired,   // 이벤트를 클릭하는 이벤트를 핸들하는 액션
    openModalWindow: PropTypes.func,                    // Modal 창을 띄우는 메서드
}

export default DateInfoBox;