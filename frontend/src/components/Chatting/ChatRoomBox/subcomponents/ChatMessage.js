

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { UserPhoto } from "../../../Structure/CommonComponents";
import { colors } from "../../../../styles/variables";


/* Styled Components */
/* 메시지 한 라인의 전체 속성 (PhotoContainer + MessageContainer) */
const MessageArea = styled.div`
    margin-top: 0.5rem;
    width: 100%;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
`;

    /* 사진이 담기는 영역의 style */
    const PhotoContainer = styled.div`
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        height: 1.5rem;
        width: 1.5rem;
    `;

    /* 사진 영역 제외한 나머지 영역을 차지하는 영역.
       내 메시지는 row-reverse, 상대 메시지는 row이다. */
    const MessageContainer = styled.div`
        flex: 1;

        display: flex;
        flex-direction: ${props => props.isMine ? 'row-reverse' : 'row'};
        flex-wrap: nowrap;
        align-items: flex-end;
        justify-content: flex-start;

        cursor: default;
    `;

        /* 메시지 내용을 담는 색이 입혀진 말풍선 */
        const MessageBox = styled.div`
            padding: 0.625rem 0.75rem;

            color: ${props => props.isMine ? `${colors.white}` : `${colors.font_default}`};

            border-radius: 0.75rem;
            background-color: ${props => props.isMine ? `${colors.blue}` : `${colors.gray_bg}`};
        `;

        /* 메시지의 부가정보 (보내진 시각 / 읽었는 지 여부)를 담는 박스 */
        const AdditionInfoBox = styled.div`
            margin: 0.25rem 0.5rem;
            width: 5.5rem;

            display: flex;
            flex-wrap: nowrap;
            flex-direction: ${props => props.isMine ? 'row-reverse' : 'row'};
            align-items: center;
        `;

            /* 메시지의 보내진 시각 정보 */
            const CreatedTime = styled.div`
                white-space: nowrap;
                font-size: 0.75rem;
                color: ${colors.font_lightgray};
            `;

            /* 읽었으면 색 없고, 안 읽었으면 색 있음 */
            const UnreadBall = styled.div`
                margin: 0 0.5rem;
                width: 0.25rem;
                height: 0.25rem;

                border-radius: 50%;
                background-color: ${ props => props.isUnread ? `${colors.blue}` : 'inherit' };
            `;




/* React Component */
const ChatMessage = ({isMine, opntUser, description, created, isUnread}) => {

    const { pic_location } = opntUser;

    const isPhoto = !isMine;

    return (
        <MessageArea isMine={isMine} >
            <PhotoContainer> 
            {
                isPhoto ?
                <UserPhoto size={24} imgURL={pic_location} />:
                '' 
            }
            </PhotoContainer> 

            <MessageContainer isMine={isMine} >
                <MessageBox isMine={isMine} >
                    {description}
                </MessageBox>

                <AdditionInfoBox isMine={isMine} >
                    <CreatedTime> 오후 12:30 </CreatedTime> 
                    <UnreadBall isUnread={isUnread} />
                </AdditionInfoBox>
            </MessageContainer>
        </MessageArea>
    )
}

ChatMessage.propTypes = {
    isMine: PropTypes.bool.isRequired,          // 내 메시지인지
    opntUser: PropTypes.object.isRequired,      // 상대방 메시지의 경우, 유저 아이콘을 띄우기 위한 데이터
    // description
    // created
    isUnread: PropTypes.bool.isRequired,        // 읽은 메시지인지 아닌지
}

export default ChatMessage;