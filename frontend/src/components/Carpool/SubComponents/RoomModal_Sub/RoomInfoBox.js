

import React from 'react';
import styled from 'styled-components';
import { Divider } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import HeaderInfoBox from './RoomInfoHeaderBox';


/* Styled Components */

/* 전체 영역 div 태그 */
const WholeBox = styled.div`
    padding: 1rem;
    
    display: flex;
    flex-flow: column nowrap;
`;    

    const InfoListBox = styled.div`
        padding: 1rem;
    `;

        const InfoListItem = styled.div`
            margin: 0.5rem 0;
            
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            const InfoSubtitle = styled.span`
                width: 6rem;
                margin-right: 1rem;

                font-weight: bold;
            `;

            const ArrowRightIcon = styled(ArrowRightOutlined)`
                margin: 0 1rem;
            `;

    const DescriptionBox = styled.div`
        padding: 1rem;
    `;


/* Custom Functions */
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

/* React Components */
const RoomInfoBox = ({selectedEvent}) => {

    console.log(selectedEvent)

    const {
        username, label,
        departure, destination,
        start, meeting_place, contact,
        description
    } = selectedEvent;

    const startStr = _formatDateStr(start);

    return (
        <WholeBox>
            <HeaderInfoBox 
                username={username}
                created={'2시간 전'}
                label={label}
            />

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
            
            <Divider />

            <DescriptionBox>
                {
                    description ? destination :
                    contact ?
                    '연락처로 직접 연락 주시길 바랍니다.' :
                    '메시지 부탁드립니다.'
                }
            </DescriptionBox>
            
        </WholeBox>
    )
}


export default RoomInfoBox;