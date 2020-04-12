

import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import PropTypes from 'prop-types';

import { colors } from "../../../../styles/variables";


/* Styled Components */
const WholeArea = styled.div`
    width: 100%;
`;

    const ChatMessage = styled.div`
        width: 100%;
        min-height: 3rem;

        color: ${colors.font_default};

        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;

        ${props => props.isMine && css`
            /* color: ${colors.white}; */
            flex-flow: row-reverse nowrap;
        `}
    `;


    const NoMessageBox = styled.div`
    
    `;


/* React Component */
class MessageBoard extends Component {

    _renderMessageList = (messageList) => {
        const { curUser } = this.props;

        return messageList.map( (message, idx) => {
            const { description, email, created, isUnread } = message;
            
            const isMine = curUser.email === email;

            return (
                <ChatMessage isMine={isMine} key={idx} >
                    {description}
                </ChatMessage>
            )
        })
    }

    render() {

        const { currentRoom } = this.props;

        return (
            <WholeArea>
            {
                currentRoom.messagelist.length ?
                this._renderMessageList(currentRoom.messagelist) :
                <NoMessageBox>메시지가 없습니다.</NoMessageBox>
            }
            </WholeArea>
        )
    }
}

MessageBoard.propTypes = {
    curUser: PropTypes.object.isRequired,               // 현재 유저 정보
    currentRoom: PropTypes.object.isRequired,           // 선택된 채팅방 데이터
}

export default MessageBoard;