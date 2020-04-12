

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BoxHeaderArea, BoxHeaderTitle } from "../CommonComponents";
import { UserPhoto } from "../../Structure/CommonComponents";
import { ChatInputBox, MessageBoard } from "./subcomponents";

/* Styled Components */
const WholeBox = styled.div`
    /* position: relative; */
    height: 100%;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

    const ChatRoomBody = styled.div`
        flex: 1;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
    `;

        const MessageBoardArea = styled.div`
            flex: 1 0px;
            padding: 0 1rem;

            overflow-y: auto;
        `;

        const ChatInputBoxArea = styled.div`
            flex: 0 0;
            padding: 1rem;
        `;


const MarginBox = styled.div`
    margin-right: 1rem;
`;

/* React Component */
class ChatRoomBox extends Component {


    render() {

        const { 
            curUser,
            chatSocket,
            currentRoom, 
            chatInputData,
            
            storeChatInputData
        } = this.props;

        const { opponent_user } = currentRoom;

        const { username, pic_location } = opponent_user;

        return (
            <WholeBox>
                <BoxHeaderArea>
                    <MarginBox> <UserPhoto imgURL={pic_location} size={28} /> </MarginBox>
                    <BoxHeaderTitle>{username}</BoxHeaderTitle>
                </BoxHeaderArea>

                <ChatRoomBody>
                    <MessageBoardArea>
                        <MessageBoard 
                            curUser={curUser}
                            currentRoom={currentRoom}
                        />
                    </MessageBoardArea>

                    <ChatInputBoxArea>
                        <ChatInputBox 
                            chatSocket={chatSocket}
                            curUser={curUser}
                            currentRoom={currentRoom}
                            chatInputData={chatInputData}
                            storeChatInputData={storeChatInputData}
                        />
                    </ChatInputBoxArea>
                </ChatRoomBody>
            </WholeBox>
        )
    }
}

ChatRoomBox.propTypes = {
    chatSocket: PropTypes.object.isRequired,            // 채팅 socket
    curUser: PropTypes.object.isRequired,               // 현재 유저 정보
    currentRoom: PropTypes.object.isRequired,           // 선택된 채팅방 데이터
    chatInputData: PropTypes.object.isRequired,         // 채팅창에 입력된 데이터

    storeChatInputData: PropTypes.func.isRequired,      // 채팅창에 입력한 데이터를 저장하는 메서드
}

export default ChatRoomBox;