

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SocketIo from 'socket.io-client';
import { Redirect, withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

import { getStatusRequest, logoutRequest } from "../store/actions/auth";
import ChattingHeader from "../components/Chatting/ChattingHeader";
import ChattingBody from "../components/Chatting/ChattingBody";
import {
    getChatDataRequest, storeChatInputData
} from '../store/actions/chatting';


class ChattingContainer extends Component {

    chatSocket = SocketIo.connect('/chatting');

    componentDidMount() {
        const { 
            match,
            
            getStatusRequest,
            getChatDataRequest,
        } = this.props;
        
        const opntID = match.params.userID;     // opponent ID. 대화 상대 ID (index 페이지의 경우 undefined)

        getStatusRequest();
        getChatDataRequest(opntID);
    }

    componentWillUpdate (nextProps) {
        const { match, getChatDataRequest } = this.props;
        const { currentRoom, curUser } = nextProps;

        const curOpntID = match.params.userID;
        const nextOpntID = nextProps.match.params.userID;
        if ( curOpntID !== nextOpntID ) {
            getChatDataRequest(nextOpntID);
        }

        const curChatDataGetDone = this.props.isChatDataGetDone;
        const nextChatDataGetDone = nextProps.isChatDataGetDone;
        if ( curChatDataGetDone === false && nextChatDataGetDone === true ) {
            const { id } = currentRoom;
            const { email } = curUser;

            if ( Number(id) !== 0 ) {
                this.chatSocket.emit('room in', { room_id: id, email })
            }
        }
    }

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
        
            logoutRequest,
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
                            logoutRequest={logoutRequest}
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
        getStatusRequest: () => dispatch(getStatusRequest()),           // 현재 유저 정보를 불러오는 request 액션
        logoutRequest: () => dispatch(logoutRequest()),                 // 로그아웃 GET request 액션
        
        getChatDataRequest: (opntID) => {                               // 첫 Chatting 페이지 띄울 때의 데이터를 요청하는 액션
            dispatch(getChatDataRequest(opntID))
        },
        storeChatInputData: (dataKey, dataValue) => {                   // 채팅창에 입력한 데이터를 저장하는 메서드
            dispatch(storeChatInputData(dataKey, dataValue))
        }
    }
}


export default withLastLocation(connect(mapStateToProps, mapDispatchToProps)(ChattingContainer));