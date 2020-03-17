

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CloseOutlined } from "@ant-design/icons";

import { RoomInfoBox } from "./RoomModal_Sub";
import { colors } from "../../../styles/variables";
import './ant-modal.css';

/* Styled Components */
const WholeArea = styled.div`
    min-height: 30rem;
`;

/* 모달 창 닫기 버튼 */
const CloseButton = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;

    color: ${colors.white};
    font-size: 1.5rem;

    cursor: pointer;
`;

/* React Component */
class RoomBox extends Component {

    render() {
        
        const { 
            curUser,
            selectedEvent, 
            eventDataToUpdate,

            cancleModal, 
            deleteEvent,
            storeEventUpdateData,
            updateEvent,
            closeOrCancleEvent,
            joinEvent,
            cancleJoinEvent,
        } = this.props

        return (
            <WholeArea>
                <RoomInfoBox 
                    curUser={curUser}
                    selectedEvent={selectedEvent}
                    eventDataToUpdate={eventDataToUpdate}

                    deleteEvent={deleteEvent}
                    storeEventUpdateData={storeEventUpdateData}
                    updateEvent={updateEvent}
                    closeOrCancleEvent={closeOrCancleEvent}
                    joinEvent={joinEvent}
                    cancleJoinEvent={cancleJoinEvent}
                />
                <CloseButton onClick={cancleModal} ><CloseOutlined/></CloseButton>
            </WholeArea>
        )
    }
}

RoomBox.propTypes = {
    curUser: PropTypes.oneOfType([                         // 현재 유저 정보
        PropTypes.number, PropTypes.object
    ]).isRequired,
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
    eventDataToUpdate: PropTypes.object.isRequired,     // 수정 요청 보낼 일정 데이터

    cancleModal: PropTypes.func.isRequired,             // 모달 창 닫는 메서드
    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
    storeEventUpdateData: PropTypes.func.isRequired,    // 수정 요청 보낼 일정 데이터를 저장하는 액션
    updateEvent: PropTypes.func.isRequired,             // 이벤트 수정 액션
    closeOrCancleEvent: PropTypes.func.isRequired,      // 이벤트 마감 또는 마감 취소 액션
    joinEvent: PropTypes.func.isRequired,               // 이벤트 참가 신청 액션
    cancleJoinEvent: PropTypes.func.isRequired,         // 이벤트 참가 신청 취소 액션
}

export default RoomBox;