

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
        
        const { selectedEvent, cancleModal, deleteEvent } = this.props

        return (
            <WholeArea>
                <RoomInfoBox 
                    selectedEvent={selectedEvent}
                    deleteEvent={deleteEvent}
                />
                <CloseButton onClick={cancleModal} ><CloseOutlined/></CloseButton>
            </WholeArea>
        )
    }
}

RoomBox.propTypes = {
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
    cancleModal: PropTypes.func.isRequired,             // 모달 창 닫는 메서드
    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
}

export default RoomBox;