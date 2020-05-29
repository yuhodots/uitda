

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Divider, Input } from "antd";

import HeaderInfoBox from './RoomInfoHeaderBox';
import InfoListBox from './RoomInfoListBox';
import { 
    DEPARTURE, DESTINATION, START_DATE, START_TIME, 
    MEETING_PLACE, CONTACT, DESCRIPTION
} from "../../../../constants/calendar_consts";
import { addLineToString } from "../../../RefactoringFuncs";


/* Styled Components */

/* 전체 영역 div 태그 */
const WholeBox = styled.div`
    padding: 1rem;
    
    display: flex;
    flex-flow: column nowrap;
`;    

    const DescriptionBox = styled.div`
        padding: 1rem;
        margin-bottom: 1rem;
    `;

    const DescriptionTextArea = styled(Input.TextArea)`
        min-height: 5rem !important;
        width: 100%;

        font-size: 1rem;

        /* TextArea 속성 */
        resize: none;
    `;


/* React Components */
class RoomInfoBox extends Component {

    state = { isUpdateMode: false }

    /* Update 모드로 변경하는 메서드. 
       Update 모드로 변경할 때는 현재 이벤트 데이터를 UpdateData 객체에 저장하는 과정을 선행으로 진행한다. */
    _changeModeToUpdate = () => {

        const { selectedEvent, storeEventUpdateData } = this.props;

        const {
            departure, destination,
            start, meeting_place, 
            contact, description
        } = selectedEvent;

        const startDate = new Date(start);

        storeEventUpdateData(DEPARTURE, departure);
        storeEventUpdateData(DESTINATION, destination);
        storeEventUpdateData(START_DATE, startDate);
        storeEventUpdateData(START_TIME, startDate);
        storeEventUpdateData(MEETING_PLACE, meeting_place);
        storeEventUpdateData(CONTACT, contact);
        storeEventUpdateData(DESCRIPTION, description);

        this.setState({
            ...this.state,
            isUpdateMode: true
        });
    }

    /* 보기 모드로 변경하는 메서드. 수정 취소 시 해당 메서드만을 실행하고,
       수정 완료 시, Post 요청 후 앱의 state까지 변경한 후 해당 메서드를 실행한다. */
    _changeModeToRead = () => {
        this.setState({
            ...this.state,
            isUpdateMode: false
        });
    }


    render() {

        const { isUpdateMode } = this.state;

        const { 
            curUser,
            selectedEvent, 
            eventDataToUpdate,

            deleteEvent,
            storeEventUpdateData,
            updateEvent,
            closeOrCancleEvent,
            joinEvent,
            cancleJoinEvent,
        } = this.props;

        const { contact, description } = selectedEvent;
    
        return (
            <WholeBox>
                <HeaderInfoBox 
                    curUser={curUser}
                    isUpdateMode={isUpdateMode}
                    selectedEvent={selectedEvent}
                    eventDataToUpdate={eventDataToUpdate}

                    deleteEvent={deleteEvent}
                    changeModeToUpdate={this._changeModeToUpdate}
                    changeModeToRead={this._changeModeToRead}
                    updateEvent={updateEvent}
                    closeOrCancleEvent={closeOrCancleEvent}
                    joinEvent={joinEvent}
                    cancleJoinEvent={cancleJoinEvent}
                />
    
                <InfoListBox 
                    isUpdateMode={isUpdateMode}
                    selectedEvent={selectedEvent}

                    storeEventUpdateData={storeEventUpdateData}
                />
                
                <Divider />
    
                <DescriptionBox>
                {
                    isUpdateMode ?
                    
                    <DescriptionTextArea 
                        defaultValue={description}
                        autoSize={true}
                        onChange={(e) => storeEventUpdateData(DESCRIPTION, e.target.value)}
                    /> :
                    
                    description ? addLineToString(description) :
                    contact ?
                    '연락처로 직접 연락 주시길 바랍니다.' :
                    '메시지 부탁드립니다.'
                }
                </DescriptionBox>

            </WholeBox>
        )
    }
}

RoomInfoBox.propTypes = {
    curUser: PropTypes.oneOfType([                         // 현재 유저 정보
        PropTypes.number, PropTypes.object
    ]).isRequired,
    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
    eventDataToUpdate: PropTypes.object.isRequired,     // 수정 요청 보낼 일정 데이터

    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
    storeEventUpdateData: PropTypes.func.isRequired,    // 수정 요청 보낼 일정 데이터를 저장하는 액션
    updateEvent: PropTypes.func.isRequired,             // 이벤트 수정 액션
    closeOrCancleEvent: PropTypes.func.isRequired,      // 이벤트 마감 또는 마감 취소 액션
    joinEvent: PropTypes.func.isRequired,               // 이벤트 참가 신청 액션
    cancleJoinEvent: PropTypes.func.isRequired,         // 이벤트 참가 신청 취소 액션
}

export default RoomInfoBox;