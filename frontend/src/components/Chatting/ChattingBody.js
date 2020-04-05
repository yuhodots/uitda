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
            flex: 0 0 350px;
            height: 100%;

            border-right: ${colors.gray_line} solid 1px;
        `;

        /* 우측의 채팅방 박스 스타일 */
        const ChatRoomBoxArea = styled.div`
            flex: 1;
            height: 100%;
        `;


/* React Component */
class ChattingBody extends Component {


    _renderContent = () => {

        const { 
            isIndex, opntID,
            
            roomList,
        } = this.props;

        return(
            <ContentArea>
                <ContentBox>
                    <ContectListBoxArea >
                        <ContectListBox opntID={opntID} roomList={roomList} />
                    </ContectListBoxArea>
                    
                    <ChatRoomBoxArea>
                    {
                        isIndex ?
                        <IndexChatRoomBox /> :
                        <ChatRoomBox opntID={opntID} />
                    }
                    </ChatRoomBoxArea>
                </ContentBox>
            </ContentArea>
        )
    }

    render() {

        return (
            <BackgroundTemplate 
                doesHaveHeader={true}
                ContentComponent={this._renderContent} 
            />
        )
    }
}

ChattingBody.propTypes = {
    isIndex: PropTypes.bool.isRequired,     // 인덱스 페이지인지 아닌 지
    opntID: PropTypes.number,               // Opponent ID. 채팅 상대방 ID

    roomList: PropTypes.array.isRequired,   // 채팅방 목록 데이터
}

ChattingBody.defaultProps = {
    opntID: 0,
}


export default ChattingBody