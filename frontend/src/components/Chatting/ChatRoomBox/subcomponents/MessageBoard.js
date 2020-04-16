

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ChatMessage from "./ChatMessage";


/* Styled Components */
const WholeArea = styled.div`
    width: 100%;
`;

    const NoMessageBox = styled.div`
    
    `;


/* React Component */
class MessageBoard extends Component {

    _renderMessageList = (messageList) => {
        const { curUser, currentRoom } = this.props;

        return messageList.map( (message, idx) => {
            const { description, email, created, isUnread } = message;
            const { opponent_user } = currentRoom; 

            const isMine = curUser.email === email;

            return (
                <ChatMessage 
                    isMine={isMine}
                    opntUser={opponent_user}
                    description={description}
                    created={created}
                    isUnread={isUnread}
                    key={idx}
                />
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