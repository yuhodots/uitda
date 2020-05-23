/* Chatting 페이지의 헤더를 제외한 영역에 대한 스타일이 적용된 컴포넌트
    */

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import BackgroundTemplate from "../Structure/CommonComponents/BackgroundTemplate";
import { ChatRoomBox, IndexChatRoomBox } from "./ChatRoomBox";
import ContectListBox from "./ContectListBox";
import { colors } from "../../styles/variables";


/* Styled Components */
/* Body 내부에 들어가는 컨텐츠 영역의 스타일
   padding에 대한 속성이 주가 되며, 화면 너비가 컨텐츠보다 작아지게 되면 padding을 없앤다. */
const ContentArea = styled.div`
    padding: 1.5rem;
    width: 100%;
    height: 100%;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    @media (max-width: 935px) {
        padding: 0;
    }
`;

    /* 컨텐츠 박스 (연락처 리스트 + 채팅 방) 전체 스타일 */
    const ContentBox = styled.div`
        height: 100%;
        width: 100%;
        max-width: 935px;

        background-color: ${colors.white};
        border: ${colors.gray_line} solid 1px;

        display: flex;
        flex-flow: row nowrap;
    `;

        /* 좌측의 연락처 리스트 박스 스타일 */
        const ContectListBoxArea = styled.div`
            /* flex: 0 0 350px; */
            width: 350px;
            height: 100%;

            border-right: ${colors.gray_line} solid 1px;
        `;

        /* 우측의 채팅방 박스 스타일 */
        const ChatRoomBoxArea = styled.div`
            flex: 1;
            height: 100%;

            /* 임시 속성 */
            display: flex;
            align-items: center;
            justify-content: center;
        `;


/* React Component */
class ChattingBody extends Component {


    _tempContent = () => {
        
        return (
            <ContentArea>
                <ContentBox>
                    <ContectListBoxArea />
                    <ChatRoomBoxArea>
                        준비중입니다...
                    </ChatRoomBoxArea>
                </ContentBox>
            </ContentArea>
        )
    }

    // _renderContent = () => {

    //     const { 
    //         isIndex, curUser, opntID, chatSocket,
            
    //         isChatDataGetDone,
    //         roomList,
    //         currentRoom,
    //         chatInputData,

    //         getChatData,
    //         storeChatInputData,
    //     } = this.props;

    //     return(
    //         <ContentArea>
    //             <ContentBox>
    //                 <ContectListBoxArea >
    //                     <ContectListBox 
    //                         chatSocket={chatSocket}
    //                         opntID={opntID} 
    //                         roomList={roomList} 
    //                         currentRoom={currentRoom}
    //                         isChatDataGetDone={isChatDataGetDone}
                            
    //                         getChatData={getChatData}
    //                     />
    //                 </ContectListBoxArea>
                    
    //                 <ChatRoomBoxArea>
    //                 {
    //                     isChatDataGetDone ?

    //                         isIndex ?
    //                         <IndexChatRoomBox /> :
    //                         <ChatRoomBox 
    //                             chatSocket={chatSocket}
    //                             curUser={curUser}
    //                             currentRoom={currentRoom} 
    //                             chatInputData={chatInputData} 

    //                             storeChatInputData={storeChatInputData}
    //                         /> :

    //                     'loading'
    //                 }
    //                 </ChatRoomBoxArea>
    //             </ContentBox>
    //         </ContentArea>
    //     )
    // }

    render() {

        return (
            <BackgroundTemplate 
                doesHaveHeader={true}
                // ContentComponent={this._renderContent} 
                ContentComponent={this._tempContent} 
            />
        )
    }
}

ChattingBody.propTypes = {
    isIndex: PropTypes.bool.isRequired,                 // 인덱스 페이지인지 아닌 지
    opntID: PropTypes.string,                           // Opponent ID. 채팅 상대방 ID
    chatSocket: PropTypes.object.isRequired,            // 채팅 socket
    curUser: PropTypes.object.isRequired,               // 현재 유저 정보

    isChatDataGetDone: PropTypes.bool.isRequired,       // Chatting Container mount 될 때의 GET 요청 완료 여부
    roomList: PropTypes.array.isRequired,               // 채팅방 목록 데이터
    currentRoom: PropTypes.object.isRequired,           // 선택된 채팅방 데이터
    chatInputData: PropTypes.object.isRequired,         // 채팅창에 입력된 데이터

    getChatData: PropTypes.func.isRequired,             // 방 선택 시, chatting data를 받는 액션
    storeChatInputData: PropTypes.func.isRequired,      // 채팅창에 입력한 데이터를 저장하는 메서드
}

ChattingBody.defaultProps = {
    opntID: 0,
}


export default ChattingBody