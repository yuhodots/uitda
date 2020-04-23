

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

    // componentDidUpdate ( prevProps ) {

    //     const { moveToBoardBottom } = this.props;

    //     /* 메시지 리스트가 업데이트 되는 경우 */
    //     const prevMsgList = prevProps.currentRoom.messageList;
    //     const nextMsgList = this.props.currentRoom.messageList;
    //     // console.log(curMsgList, nextMsgList)
    //     // console.log(prevProps, this.props);
    //     // console.log(prevMsgList.length, nextMsgList.length);
    //     if ( prevMsgList.length !== nextMsgList.length ) {
    //         console.log('hi')
    //         moveToBoardBottom();
    //     }
    // }

    _renderMessageList = (messageList) => {
        const { curUser, currentRoom } = this.props;

        return messageList.map( (message, idx) => {
            const { description, email, created, isUnread } = message;
            const { opntUser } = currentRoom; 

            const isMine = curUser.email === email;

            return (
                <ChatMessage 
                    isMine={isMine}
                    opntUser={opntUser}
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

        const { messageList } = currentRoom;  

        return (
            <WholeArea>
            {
                messageList.length ?
                this._renderMessageList(messageList) :
                <NoMessageBox>메시지가 없습니다.</NoMessageBox>
            }
            </WholeArea>
        )
    }
}

MessageBoard.propTypes = {
    curUser: PropTypes.object.isRequired,               // 현재 유저 정보
    currentRoom: PropTypes.object.isRequired,           // 선택된 채팅방 데이터

    moveToBoardBottom: PropTypes.func.isRequired,       // 메시지 보드 가장 아래로 이동하는 메서드
}

export default MessageBoard;