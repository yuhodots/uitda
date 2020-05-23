

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import SocketIo from 'socket.io-client';
import { Redirect } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import { getStatusRequest, localLogoutRequest, outlookLogoutRequest } from "../store/actions/auth";
import ChattingHeader from "../components/Chatting/ChattingHeader";
import ChattingBody from "../components/Chatting/ChattingBody";
import {
    getChatDataRequest, storeChatInputData, socketOnChatMessage,
} from '../store/actions/chatting';


class ChattingContainer extends Component {

    // chatSocket = SocketIo.connect('/chatting');

    componentDidMount() {
        const { 
            match,
            
            getStatusRequest,
            getChatDataRequest,
            // socketOnChatMessage,
        } = this.props;
        
        const opntID = match.params.userID;     // opponent ID. 대화 상대 ID (index 페이지의 경우 undefined)

        getStatusRequest();
        getChatDataRequest(opntID);

        // this.chatSocket.on('chat message', (data) => { 
        //     console.log('socket on')
        //     socketOnChatMessage(data)
        // });
    }

    // componentWillUpdate (nextProps) {
    //     const { getChatDataRequest, rootSocket } = this.props;
    //     const { currentRoom, curUser } = nextProps;
        
    //     /* User State를 받았을 때에만 (전체 페이지 중 처음으로 컨테이너가 실행될 때만) socket_id 를 emit 함 */
    //     const curStatusDone = this.props.isGetStatusDone;
    //     const nextStatusDone = nextProps.isGetStatusDone;
    //     if ( curStatusDone === false && nextStatusDone === true ) { 
    //         rootSocket.emit('socket_id', {email: curUser.email});
    //     }

    //     /* url의 params가 바뀔 때에만 방 데이터를 받는 요청을 보냄 */
    //     const curOpntID = this.props.match.params.userID;
    //     const nextOpntID = nextProps.match.params.userID;
    //     if ( curOpntID !== nextOpntID ) { getChatDataRequest(nextOpntID); }

    //     /* 새로운 방의 데이터를 받았을 때에만 room in이 실행됨 */
    //     const curChatDataGetDone = this.props.isChatDataGetDone;
    //     const nextChatDataGetDone = nextProps.isChatDataGetDone;
    //     if ( curChatDataGetDone === false && nextChatDataGetDone === true ) {
    //         const { id } = currentRoom;
    //         const { email } = curUser;
    //         if ( Number(id) !== 0 ) { this.chatSocket.emit('room in', { room_id: id, email }) }
    //     }
    // }


    render() {

        const { 
            isIndex,
            match,
            isGetStatusDone,
            curUser, 
            lastLocation,
            isChatDataGetDone,
            roomList,
            currentRoom,
            chatInputData,
        
            localLogoutRequest,
            outlookLogoutRequest,
            getChatDataRequest,
            storeChatInputData,
        } = this.props;

        const opntID = match ? Number(match.params.userID) : 0;     // opponent ID. 대화 상대 ID (index 페이지의 경우 0)

        return(
            isGetStatusDone ?

                /* 유저 데이터가 없는 경우, 홈 화면으로 Redirect */
                curUser ?

                    /* 내부의 React Router Link를 통한 url 변경일 때만 채팅방을 render하고,
                       그 외의 경우 index를 render한다 */
                    lastLocation ?

                    <div style={{height: '100%', width: '100%'}}>
                        <ChattingHeader 
                            curUser={curUser}
                            localLogoutRequest={localLogoutRequest}
                            outlookLogoutRequest={outlookLogoutRequest}
                        />
                        <ChattingBody 
                            isIndex={isIndex} 
                            opntID={opntID} 
                            chatSocket={this.chatSocket}    
                            curUser={curUser}

                            isChatDataGetDone={isChatDataGetDone}
                            roomList={roomList}
                            currentRoom={currentRoom}
                            chatInputData={chatInputData}

                            getChatData={getChatDataRequest}
                            storeChatInputData={storeChatInputData}
                        />
                    </div> :

                    <Redirect to='/chatting/index' /> :

                <Redirect to='/' /> :

            ''
        )
    }
}

ChattingContainer.propTypes = {
    isIndex: PropTypes.bool,        // index 페이지인지 아닌 지
    match: PropTypes.object,        // 상대방 user ID 정보를 담은 url params의 상위 객체
}

ChattingContainer.defaultProps = {
    isIndex: false,
}


const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                                       // 현재 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,                    // get status 요청 완료 여부
        isChatDataGetDone: state.chatting.isChatDataGetDone,            // Chatting 데이터 GET 요청 완료 여부
        roomList: state.chatting.roomList,                              // 채팅방 목록 데이터
        currentRoom: state.chatting.currentRoom,                        // 현재 채팅방 데이터
        chatInputData: state.chatting.chatInputData,                    // 채팅창에 입력된 데이터
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => dispatch(getStatusRequest()),                   // 현재 유저 정보를 불러오는 request 액션
        localLogoutRequest: () => dispatch(localLogoutRequest()),               // 로그아웃 GET request 액션
        outlookLogoutRequest: () => dispatch(outlookLogoutRequest()),           // 아웃룩 로그아웃 메서드
        
        getChatDataRequest: (opntID) => {                                       // 첫 Chatting 페이지 띄울 때의 데이터를 요청하는 액션
            dispatch(getChatDataRequest(opntID))
        },
        storeChatInputData: (dataKey, dataValue) => {                           // 채팅창에 입력한 데이터를 저장하는 메서드
            dispatch(storeChatInputData(dataKey, dataValue))
        },
        socketOnChatMessage: (data) => dispatch(socketOnChatMessage(data)),     // chat socket의 'chat message' 이벤트에 대한 핸들러 액션
    }
}


export default withLastLocation(connect(mapStateToProps, mapDispatchToProps)(ChattingContainer));