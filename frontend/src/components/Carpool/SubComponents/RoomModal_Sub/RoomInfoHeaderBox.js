

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import renderPopoverContent from "./renderPopoverContent";
import { UserPhoto, UitdaPopover } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";
import { 
    CLOSED, ACTIVE, OWNER, OWNER_CLOSED, GUEST, GUEST_CLOSED 
} from '../../../../constants/calendar_consts'

/* Styled Components */

/* 상단 Info Box (작성자, 작성시간, 상태정보, 더보기 버튼) */
const HeaderInfoBox = styled.div`
    padding: 1rem;
    /* margin-bottom: 1rem; */
    min-height: 4rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: space-between;
`;

    /* Head Left Box. MoreSee Button을 오른쪽 끝으로 두기 위해 만든 박스 */
    const HLBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const UserCreatedInfoBox = styled.div`
            /* flex: 1; */
            margin-left: 1rem;

            display: flex;
            flex-flow: column nowrap;
        `;

            const UserName = styled.div`
                margin-bottom: 0.25rem;
                
                font-size: 1rem;
                font-weight: bold;
            `;

            const Created = styled.div`
                font-size: 0.625rem;
            `;

    const HRBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const StateLabel = styled.div`
            margin-right: 1rem;

            color: ${colors.font_gray};
            cursor: default;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            const LabelCircle = styled.div`
                height: 0.5rem;
                width: 0.5rem;
                margin-right: 0.75rem;
                
                border-radius: 50%;

                background-color: ${props => props.labelColor};
            `;

        const MoreIcon = styled(MoreOutlined)`
            color: ${colors.font_gray};
            font-size: ${16}px;

            cursor: pointer;
        `;


        const CancleUpdateButton = styled(Button)`
            margin-right: 1rem;

            :hover {
                color: ${colors.font_darkgray};
            }
        `;


/* React Component */
class RoomInfoHeaderBox extends Component {
    
    /* label에 해당하는 색과 텍스트를 리턴하는 메서드 */
    _getColorAndText = () => {
        
        const { label } = this.props.selectedEvent;
        
        switch (label) {
            case CLOSED: return {labelColor: colors.closed_gray, labelText: '마감'};
            case ACTIVE: return {labelColor: colors.active_blue, labelText: '모집 중'};
            case OWNER: return {labelColor: colors.owner_yellow, labelText: '방장'};
            case OWNER_CLOSED: return {labelColor: colors.owner_yellow, labelText: '모집 종료'};
            case GUEST: // eslint-disable-next-line
            case GUEST_CLOSED: return {labelColor: colors.guest_green, labelText: '신청'};
            default:  return {labelColor: colors.closed_gray, labelText: '마감'}
        }
    }

    _handleUpdate = () => {
        const {
            selectedEvent, 
            eventDataToUpdate, 
            updateEvent, changeModeToRead
        } = this.props;

        const { id } = selectedEvent;

        updateEvent(id, eventDataToUpdate);
        changeModeToRead();
    }


    render() {

        const {
            isUpdateMode, 
            
            curUser,
            selectedEvent,

            changeModeToRead,
            deleteEvent, changeModeToUpdate,
            closeOrCancleEvent,
            joinEvent, cancleJoinEvent
        } = this.props

        const { user, created } = selectedEvent

        const clickMethods = {
            deleteEvent, changeModeToUpdate,
            closeOrCancleEvent,
            joinEvent, cancleJoinEvent
        };
        const MoreButtonContentList = renderPopoverContent(curUser, selectedEvent, clickMethods);

        const { labelColor, labelText } = this._getColorAndText();

        return (
            <HeaderInfoBox>
                <HLBox>
                    <UserPhoto size={40} />
                    <UserCreatedInfoBox>
                        <UserName>{user ? user.username : ''}</UserName>
                        <Created>{created}</Created>
                    </UserCreatedInfoBox>
                </HLBox>
                
                {
                    isUpdateMode ?
    
                    <HRBox>
                        <CancleUpdateButton shape='round' onClick={changeModeToRead} >취소</CancleUpdateButton>
                        <Button shape='round' type='primary' onClick={this._handleUpdate} >완료</Button>
                    </HRBox> :
    
                    <HRBox>
                        <StateLabel>
                            <LabelCircle labelColor={labelColor} />
                            {labelText}
                        </StateLabel>
                        <UitdaPopover 
                            contentList={MoreButtonContentList} 
                            PopButton={() => <MoreIcon /> } 
                        />
                    </HRBox>
                }
    
            </HeaderInfoBox>
        )
    }
}

RoomInfoHeaderBox.propTypes = {
    curUser: PropTypes.oneOfType([                         // 현재 유저 정보
        PropTypes.number, PropTypes.object
    ]).isRequired,

    isUpdateMode: PropTypes.bool.isRequired,            // 수정 모드 인지

    selectedEvent: PropTypes.object.isRequired,         // 선택된 일정 데이터
    id: PropTypes.number.isRequired,                    // 카풀 일정 데이터의 id
    user: PropTypes.object.isRequired,                  // 카풀 일정 작성자 객체 데이터
    created: PropTypes.string.isRequired,               // 카풀 일정 작성 시간
    label: PropTypes.string.isRequired,                 // 카풀 일정 상태 정보
    eventDataToUpdate: PropTypes.object.isRequired,     // 수정 요청 보낼 일정 데이터

    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
    changeModeToUpdate: PropTypes.func.isRequired,      // 수정 모드로 변경하는 메서드
    changeModeToRead: PropTypes.func.isRequired,        // 보기 모드로 변경하는 메서드
    updateEvent: PropTypes.func.isRequired,             // 이벤트 수정 액션
    closeOrCancleEvent: PropTypes.func.isRequired,      // 이벤트 마감 또는 마감 취소 액션
    joinEvent: PropTypes.func.isRequired,               // 이벤트 참가 신청 액션
    cancleJoinEvent: PropTypes.func.isRequired,         // 이벤트 참가 신청 취소 액션
}

export default RoomInfoHeaderBox;