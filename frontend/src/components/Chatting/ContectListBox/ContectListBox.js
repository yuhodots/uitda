

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BoxHeaderArea, BoxHeaderTitle } from "../CommonComponents";
import RoomListItem from "./RoomListItem";


/* Styled Components */
/* Header와 Body를 담는 전체 Box style */
const WholeArea = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

    /* Room List가 담기는 Box Style */
    const RoomListBody = styled.div`
        padding: 0.5rem 0;
        flex: 1 0;
        overflow-y: auto;
    `;


/* React Component */
class ContectListBox extends Component {


    _renderRoomList = (roomList) => {
        
        return roomList.map( (room, idx) => {
            const { opponent_user, updated, unread, last_chat } = room;
            const { opntID, getChatData } = this.props;

            const isSelectedRoom = Number(opntID) === opponent_user.id

            return (
                <RoomListItem 
                    isSelectedRoom={isSelectedRoom}
                    opntUser={opponent_user} 
                    updated={updated} 
                    unread={unread} 
                    last_chat={last_chat} 
                    key={idx} 

                    getChatData={getChatData}
                />
            )
        })
    }

    render() {

        const { roomList, isChatDataGetDone } = this.props;

        return(
            <WholeArea>
                <BoxHeaderArea>
                    <BoxHeaderTitle>채팅방</BoxHeaderTitle>
                </BoxHeaderArea>

                <RoomListBody>
                {
                    isChatDataGetDone ?
                    this._renderRoomList(roomList) :
                    'loading'
                }
                </RoomListBody>
            </WholeArea>
        )
    }
}

ContectListBox.propTypes = {
    opntID: PropTypes.number.isRequired,                // Opponent ID. 채팅 상대방 ID
    roomList: PropTypes.array.isRequired,               // 채팅방 목록 데이터
    isChatDataGetDone: PropTypes.bool.isRequired,       // Chatting Container mount 될 때의 GET 요청 완료 여부

    getChatData: PropTypes.func.isRequired,             // 방 선택 시, chatting data를 받는 액션
}

export default ContectListBox;