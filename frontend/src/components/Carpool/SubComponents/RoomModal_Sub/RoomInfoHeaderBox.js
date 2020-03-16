

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from "antd";
import { 
    DeleteOutlined, EditOutlined, FieldTimeOutlined, CloseCircleOutlined, PushpinOutlined 
} from "@ant-design/icons";

import { UserPhoto, MoreButton } from "../../../Structure/CommonComponents";
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
        
        const { label } = this.props
        
        switch (label) {
            case CLOSED: return {labelColor: colors.closed_gray, labelText: '마감'};
            case ACTIVE: return {labelColor: colors.active_blue, labelText: '모집 중'};
            case OWNER: 
            case OWNER_CLOSED:  return {labelColor: colors.owner_yellow, labelText: '방장'};
            case GUEST: 
            case GUEST_CLOSED:  return {labelColor: colors.guest_green, labelText: '신청'};
            default:  return {labelColor: colors.closed_gray, labelText: '마감'}
        }
    }

    /* label에 따라 그에 해당되는 더보기 content를 생성하는 함수 */
    _renderContent = () => {

        const {
            id, label,
            deleteEvent, changeModeToUpdate
        } = this.props;

        let owenrContentList = [
            {
                icon: <EditOutlined />,
                text: '수정하기',
                clickMethod: () => {
                    changeModeToUpdate();
                }
            },
            {
                icon: <DeleteOutlined />,
                text: '삭제하기',
                clickMethod: () => {
                    deleteEvent(id);
                    
                    /* 현재는 시간 조금 이후에 새로고침이지만,
                       socket으로 구현이 되면, modal 닫기만 하면 된다. */
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                }
            }
        ]

        switch (label) {

            case OWNER:
                owenrContentList = [...owenrContentList, {
                    icon: <FieldTimeOutlined />,
                    text: '마감하기',
                    clickMethod: () => {

                    }   
                }]
                return owenrContentList;
            case OWNER_CLOSED:
                owenrContentList = [...owenrContentList, {
                    icon: <CloseCircleOutlined  />,
                    text: '마감 취소하기',
                    clickMethod: () => {

                    }   
                }]
                return owenrContentList;

            case GUEST:
            case GUEST_CLOSED:
                return [
                    {
                        icon: <CloseCircleOutlined  />,
                        text: '내 일정에서 제외하기',
                        clickMethod: () => {

                        }
                    }
                ]

            default:
                return [
                    {
                        icon: <PushpinOutlined />,
                        text: '내 일정에 추가하기',
                        clickMethod: () => {

                        }
                    }
                ] 
        }
    } 

    _handleUpdate = () => {
        const {
            id, eventDataToUpdate, 
            updateEvent, changeModeToRead
        } = this.props;

        updateEvent(id, eventDataToUpdate);
        changeModeToRead();
    }


    render() {

        const {
            isUpdateMode, 
            user, created, 
            changeModeToRead,
        } = this.props

        const MoreButtonContentList = this._renderContent();

        const { labelColor, labelText } = this._getColorAndText();

        return (
            <HeaderInfoBox>
                <HLBox>
                    <UserPhoto size={40} />
                    <UserCreatedInfoBox>
                        <UserName>{user.username}</UserName>
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
                        <MoreButton contentList={MoreButtonContentList} />
                    </HRBox>
                }
    
            </HeaderInfoBox>
        )
    }
}

RoomInfoHeaderBox.propTypes = {
    isUpdateMode: PropTypes.bool.isRequired,            // 수정 모드 인지

    id: PropTypes.number.isRequired,                    // 카풀 일정 데이터의 id
    user: PropTypes.object.isRequired,                  // 카풀 일정 작성자 객체 데이터
    created: PropTypes.string.isRequired,               // 카풀 일정 작성 시간
    label: PropTypes.string.isRequired,                 // 카풀 일정 상태 정보
    eventDataToUpdate: PropTypes.object.isRequired,     // 수정 요청 보낼 일정 데이터

    deleteEvent: PropTypes.func.isRequired,             // 이벤트를 지우는 액션
    changeModeToUpdate: PropTypes.func.isRequired,      // 수정 모드로 변경하는 메서드
    changeModeToRead: PropTypes.func.isRequired,        // 보기 모드로 변경하는 메서드
    updateEvent: PropTypes.func.isRequired,             // 이벤트 수정 액션
}

export default RoomInfoHeaderBox;