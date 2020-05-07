

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { SendOutlined } from "@ant-design/icons";

import { colors } from "../../../../styles/variables";
import { UitdaTextArea } from "../../../Structure/CommonComponents";


/* Styled Components */
/* 메시지 입력 창 테두리 스타일을 갖는 상자 */
const InputBox = styled.div`
    padding: 0.25rem 0.75rem;
    width: 100%;
    min-height: 2.5rem;

    border: 1px solid ${colors.gray_line};
    border-radius: 1.25rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
`;

    /* TextArea를 담는 영역의 div 태그 */
    const TextAreaBox = styled.div`
        flex: 1 0;
    `;

    /* 보내기 버튼을 담는 박스 */
    const SendButtonBox = styled.div`
        flex: 0 0;
        padding-bottom: 4px;
    `;

        /* 보내기 버튼 */
        const SendButton = styled(SendOutlined)`
            cursor: pointer;
        `;


/* React Component */
class ChatInputBox extends Component {

    /* Enter 키 입력 시, handleSendMessage가 실행되도록 함 */
    _handleEnterKey = (e) => {
        const { shiftKey, keyCode } = e;
        if ( keyCode === 13 && !shiftKey ) {    // enter 키에, shift키가 안 눌렸다면
            e.preventDefault();                 // 줄 바꿈 실행 X
            this._handleSendMessage();          // enter 시 실행 함수
        }
    }

    /* Chatting Message를 보내는 메서드 */
    _handleSendMessage = () => {
        const { 
            chatSocket, 
            curUser, currentRoom,
            chatInputData,
        } = this.props;

        /* 데이터가 있는 경우 에만 socket을 통해 데이터를 넘겨줌 */
        if ( chatInputData.text ) {
            chatSocket.emit('chat message', {
                message: chatInputData.text, 
                room_id: currentRoom.id,
                email: curUser.email
            })
        }
    }

    render () {

        const { storeChatInputData } = this.props;

        return (
            <InputBox>
                <TextAreaBox 
                onKeyDown={ e => this._handleEnterKey(e) } 
                >
                    <UitdaTextArea 
                        size='100%' 
                        isUnderLine={false} 
                        placeHolder='메시지 입력...'

                        data_key='text'
                        storeDataFunc={storeChatInputData}
                    />
                </TextAreaBox>

                <SendButtonBox>
                    <SendButton onClick={this._handleSendMessage} />
                </SendButtonBox>
            </InputBox>
        )
    }
}

ChatInputBox.propTypes = {
    chatSocket: PropTypes.object.isRequired,            // 채팅 socket
    curUser: PropTypes.object.isRequired,               // 현재 유저 정보
    currentRoom: PropTypes.object.isRequired,           // 선택된 채팅방 데이터
    chatInputData: PropTypes.object.isRequired,         // 채팅창에 입력된 데이터

    storeChatInputData: PropTypes.func.isRequired,      // 채팅창에 입력한 데이터를 저장하는 메서드
}

export default ChatInputBox;