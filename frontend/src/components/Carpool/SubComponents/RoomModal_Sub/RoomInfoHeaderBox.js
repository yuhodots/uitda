

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { UserPhoto, MoreButton } from "../../../Structure/CommonComponents";
import { OWNER, OWNER_CLOSED, GUEST, GUEST_CLOSED } from '../../../../constants/calendar_consts'

/* Styled Components */

/* 상단 Info Box (작성자, 작성시간, 상태정보, 더보기 버튼) */
const HeaderInfoBox = styled.div`
    padding: 1rem;
    /* margin-bottom: 1rem; */
    min-height: 4rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
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


/* Custom Functions */

/* label에 따라 그에 해당되는 더보기 content를 생성하는 함수 */
const _renderContent = (label) => {

    switch (label) {

        case OWNER:
        case OWNER_CLOSED:
            return [
                {
                    icon: <EditOutlined />,
                    text: '수정하기'
                },
                {
                    icon: <DeleteOutlined />,
                    text: '삭제하기'
                }
            ]

        case GUEST:
        case GUEST_CLOSED:
            return [
                {
                    text: '내 일정에서 제외하기'
                }
            ]

        default:
            return [
                {
                    text: '내 일정에 추가하기'
                }
            ] 
    }
} 

/* React Component */
const RoomInfoHeaderBox = ({username, created, label}) => {

    const MoreButtonContentList = _renderContent(label);

    return (
        <HeaderInfoBox>
            <HLBox>
                <UserPhoto size={40} />
                <UserCreatedInfoBox>
                    <UserName>{username}</UserName>
                    <Created>{created}</Created>
                </UserCreatedInfoBox>
            </HLBox>
            
            <MoreButton contentList={MoreButtonContentList} />
        </HeaderInfoBox>
    )

}

RoomInfoHeaderBox.propTypes = {
    username: PropTypes.string.isRequired,      // 카풀 일정 작성자 객체 데이터
    created: PropTypes.string.isRequired,       // 카풀 일정 작성 시간
    label: PropTypes.string.isRequired,         // 카풀 일정 상태 정보
}

export default RoomInfoHeaderBox;