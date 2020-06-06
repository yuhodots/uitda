

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DatePicker } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import moment from "moment";

import { UitdaTextArea, UitdaTimePicker } from "../../../Structure/CommonComponents";
import { 
    DEPARTURE, DESTINATION, START_DATE, START_TIME, MEETING_PLACE, CONTACT
} from "../../../../constants/calendar_consts";


/* Styled Components */
const InfoListBox = styled.div`
    padding: 1rem;
`;

    const InfoListItem = styled.div`
        margin: 0.75rem 0;
        
        font-size: 0.95rem;

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-end;
    `;

        const InfoSubtitle = styled.span`
            width: 6rem;
            margin-right: 1rem;

            font-weight: bold;
        `;

        const ArrowRightIcon = styled(ArrowRightOutlined)`
            margin: 0 1rem;
        `;


/* Custom Functions */

/* start 데이터 값을 출력 형태에 맞게 변경하는 메서드 */
const _formatDateStr = (dateStr) => {
    const date = new Date(dateStr);

    const YYYY = date.getUTCFullYear();
    const MM = date.getUTCMonth() + 1;
    const DD = date.getUTCDate();
    let day = date.getUTCDay();
    switch (day) {
        case 0: day = '일'; break;
        case 1: day = '월'; break;
        case 2: day = '화'; break;
        case 3: day = '수'; break;
        case 4: day = '목'; break;
        case 5: day = '금'; break;
        case 6: day = '토'; break;
        default: break;
    }
    const hh = date.getUTCHours() + 11;
    const hourStr = hh < 23 ? `오전 ${hh % 12 + 1}시` : `오후 ${hh % 12 + 1}시`;
    const mm = date.getUTCMinutes();

    return `${YYYY}년 ${MM}월 ${DD}일 ${day}요일. ${hourStr} ${mm}분`
}

/* React Component */
const RoomInfoListBox = ({isUpdateMode, selectedEvent, storeEventUpdateData}) => {

    const {departure, destination, start, meeting_place, contact} = selectedEvent;

    const startStr = _formatDateStr(start);

    const defaultTime = moment(start).utc();

    return ( isUpdateMode ?
        <InfoListBox>
            <InfoListItem>
                <InfoSubtitle>이동 방향</InfoSubtitle>
                <UitdaTextArea storeDataFunc={storeEventUpdateData} data_key={DEPARTURE} size={120} defaultText={departure} />
                <ArrowRightIcon /> 
                <UitdaTextArea storeDataFunc={storeEventUpdateData} data_key={DESTINATION} size={120} defaultText={destination} />
            </InfoListItem>

            <InfoListItem>
                <InfoSubtitle>출발 시각</InfoSubtitle>
                <DatePicker onChange={(date) => { storeEventUpdateData(START_DATE, date._d) }} defaultValue={defaultTime} />
                <UitdaTimePicker storeDataFunc={storeEventUpdateData} data_key={START_TIME} defaultValue={defaultTime} />
            </InfoListItem>
            
            <InfoListItem>
                <InfoSubtitle>집합 장소</InfoSubtitle>
                <UitdaTextArea storeDataFunc={storeEventUpdateData} data_key={MEETING_PLACE} size={240} defaultText={meeting_place} />
            </InfoListItem>
            <InfoListItem>
                <InfoSubtitle>연락처</InfoSubtitle>
                <UitdaTextArea storeDataFunc={storeEventUpdateData} data_key={CONTACT} size={240} defaultText={contact} />
            </InfoListItem>
        </InfoListBox> :

        <InfoListBox>
            <InfoListItem>
                <InfoSubtitle>이동 방향</InfoSubtitle>
                {departure} <ArrowRightIcon /> {destination}
            </InfoListItem>
            <InfoListItem>
                <InfoSubtitle>출발 시각</InfoSubtitle>
                {startStr}
            </InfoListItem>
            <InfoListItem>
                <InfoSubtitle>집합 장소</InfoSubtitle>
                {meeting_place}
            </InfoListItem>
            <InfoListItem>
                <InfoSubtitle>연락처</InfoSubtitle>
                {contact}
            </InfoListItem>
        </InfoListBox>
    )
}

RoomInfoListBox.propTypes = {
    isUpdateMode: PropTypes.bool.isRequired,            // Update 모드 인지
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터

    storeEventUpdateData: PropTypes.func.isRequired,    // 수정 요청 보낼 일정 데이터를 저장하는 액션
}

export default RoomInfoListBox;