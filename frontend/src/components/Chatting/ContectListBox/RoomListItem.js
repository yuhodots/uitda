

import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { colors } from "../../../styles/variables";
import { UserPhoto } from "../../Structure/CommonComponents";


/* Styled Components */
/* 전체 박스 size */
const WholeArea = styled.div`
    width: 100%;
    height: 4.5rem;
`;

    /* Item을 담는 Wrapper의 공통 속성 */
    const ItemWrapperStyle = css`
        width: 100%;
        height: 100%;
    `;

    /* 선택되지 않은 방은 Link 태그 */
    const LinkWrapper = styled(Link)`
        ${ItemWrapperStyle}
        color: ${colors.font_default};

        :hover {
            color: ${colors.font_default};
            background-color: ${colors.gray_bg};
        }
    `;

    /* 선택된 방은 배경색을 갖는 div태그 */
    const SelectedWrapper = styled.div`
        ${ItemWrapperStyle}
        background-color: ${colors.gray_bg};
    `;

        /* Wrapper 안에 들어가는 Item Content Box 스타일 */
        const ItemContainer = styled.div`
            width: 100%;
            height: 100%;
            padding: 0.5rem 1rem;

            background-color: inherit;

            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            /* 가운데 위치하는 상대 이름, 가장 마지막 메시지 정보 담은 Box */
            const TextBox = styled.div`
                margin-left: 1rem;
                flex: 1;
                height: 100%;

                overflow: hidden;

                display: flex;
                flex-flow: column nowrap;
                align-items: flex-start;
                justify-content: center;
            `;

                const OpntUserName = styled.div`
                    font-weight: bold;
                `;

                const MessageText = styled.div`
                    width: 100%;
                    
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                `;

                const MessageSkeleton = styled.div`
                    height: 22px;
                `;

            /* 오른쪽에 위치하는 시간, unread 정보를 담은 Box */
            const SubInfoBox = styled.div`
                flex: 0 0;
                margin-left: 0.5rem;
                
                display: flex;
                flex-flow: column nowrap;
                align-items: flex-end;
                justify-content: center;
            `;

                const UpdatedInfo = styled.div`
                    font-size: 0.75rem;
                    white-space: nowrap;
                `;

                const UnreadInfo = styled.div`
                    margin-top: 0.25rem;
                    padding: 0.25rem 0.25rem;
                    height: 1.25rem;
                    min-width: 1.25rem;

                    color: ${colors.white};
                    font-size: 0.75rem;

                    border-radius: 0.625rem;
                    background-color: ${colors.badge_red};

                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;

                const UnreadSkeleton = styled.div`
                    margin-top: 0.25rem;
                    height: 1.25rem;
                `;



/* React Component */
class RoomListItem extends Component {

    render() {

        const { 
            chatSocket,
            curRoomID,
            isSelectedRoom, 
            opntUser, 
            lastChat,
            updated, 
            unread, 
        } = this.props;

        const { id, username, pic_location } = opntUser;

        const roomURL = `/chatting/t/${id}`;

        return (
            <WholeArea>
            {
                isSelectedRoom ?

                <SelectedWrapper>
                    <ItemContentBox 
                        pic_location={pic_location} username={username}
                        lastChat={lastChat}updated={updated} unread={unread}
                    />
                </SelectedWrapper> :

                <LinkWrapper to={roomURL} onClick={() => { 
                    if (curRoomID) { chatSocket.emit('room out', {room_id: curRoomID}) }    // curRoomID가 0이면 실행 안 됨
                }} >
                    <ItemContentBox 
                        pic_location={pic_location} username={username}
                        lastChat={lastChat} updated={updated} unread={unread}
                    />
                </LinkWrapper>
            }
            </WholeArea>
        )
    }
}

const ItemContentBox = ({pic_location, username, lastChat, updated, unread}) => {
    return (
        <ItemContainer>
            <UserPhoto imgURL={pic_location} size={48} />
            <TextBox>
                <OpntUserName>{username}</OpntUserName>
                {
                    lastChat ?
                    <MessageText>{lastChat}</MessageText> :
                    <MessageSkeleton />
                }
            </TextBox>
            <SubInfoBox>
                <UpdatedInfo>{updated}</UpdatedInfo>
                {
                    unread ? 
                    <UnreadInfo>{unread}</UnreadInfo> :
                    <UnreadSkeleton />
                }
                {/* <UnreadInfo>{unread}</UnreadInfo> */}
            </SubInfoBox>
        </ItemContainer>
    )
}


RoomListItem.propTypes = {
    chatSocket: PropTypes.object.isRequired,        // 채팅 socket
    curRoomID: PropTypes.number.isRequired,         // 현재 선택된 방의 id 
    isSelectedRoom: PropTypes.bool.isRequired,      // 현재 선택된 방인지 여부
    opntUser: PropTypes.object.isRequired,          // 상대 유저 데이터
    updated: PropTypes.string.isRequired,           // 가장 최근 업데이트 된 시각
    unread: PropTypes.number.isRequired,            // 안 읽은 개수
    lastChat: PropTypes.string,                     // 가장 최근 메시지          

    getChatData: PropTypes.func.isRequired,         // 방 선택 시, chatting data를 받는 액션
}

RoomListItem.defaultProps = {
    lastChat: '',
}


export default RoomListItem