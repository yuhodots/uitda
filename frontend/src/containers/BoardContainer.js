//

// 상위 컴포넌트: pages/Board

import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BoardBody from "../components/Board/BoardBody";
import BoardHeader from "../components/Board/BoardHeader";
import SideBar from "../components/Structure/SideBar";
import { 
    initiateBoard,
    getBoardRequest,
    getBoardRequestByScroll,
    boardHeaderOn,
    boardHeaderOff,
} from '../store/actions/board'
import { topicSelect } from "../store/actions/topic";
import { getStatusRequest, localLogoutRequest, outlookLogoutRequest } from "../store/actions/auth";

class BoardContainer extends Component {    

    state = {}

    componentDidMount() {
        const { 
            boardName,
            
            getStatusRequest,
            initiateBoard,
            getBoardRequest,
            headerOn,
            topicSelect,
        } = this.props;
        
        getStatusRequest();
        initiateBoard();

        headerOn();                                                 // 헤더 On
        topicSelect(boardName);                                     // app의 topic state를 boardName으로 설정
        
        getBoardRequest(boardName);

        window.addEventListener('scroll', this._handleScroll);      // Scroll 이벤트가 생길 때, onScroll을 실행함
        window.addEventListener('resize', this._updateWindowSize);  // window 사이즈 변경 시, 변경된 값을 state에 저장

        this._updateWindowSize();
    }

    componentWillUnmount () {
        window.removeEventListener("scroll", this._handleScroll);
        window.removeEventListener('resize', this._updateWindowSize);
    }

    _handleScroll = (e) => {
        const { 
            isHeaderOn, 
            isLast, isLoading, isFirstBoardGetSuccess,
            boardName, scroll, search,

            headerOff, headerOn,
            getBoardRequestByScroll,
        } = this.props;

        /* Scroll Heigth: 스크롤 영역 전체의 Height
           Scroll Top: 현재 스크롤 top이 위치한 위치 값
           Client Height: 브라우저 창의 Height 값 */
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const clientHeight = document.documentElement.clientHeight;

        // Header On/Off 관련
        if (isHeaderOn) { if(scrollTop > 64) { headerOff() } }
        else if (scrollTop <= 64) { headerOn() }

        /* 무한 스크롤 핸들링
           스크롤 하단의 위치가 전체 height보다 64px 위쪽에 위치해 있을 때,
           첫 GET 요청 이후이고, 스크롤 GET요청이 loading 상태가 아니고, isLast가 false이면
           스크롤 GET 요청을 보낸다.  */
        if ( (scrollTop + clientHeight) > (scrollHeight - 64) ) {
            if( isFirstBoardGetSuccess && !isLast && !isLoading ) {
                getBoardRequestByScroll( boardName, scroll, search );
            }
        }
    }

    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
        })
    }


    render() {
        const {
            // properties
            curUser,
            isGetStatusDone,

            boardName,
            postlist,
            search,

            isHeaderOn,
            isFirstBoardGetSuccess,
            isLoading,

            // methods
            headerOn,
            localLogoutRequest,
            outlookLogoutRequest,
            getBoardRequest
        } = this.props;

        const { windowHeight, windowWidth } = this.state;

        return (
            isGetStatusDone ?

                curUser ? 
            
                <div>
                    <SideBar topic={boardName} />
                    
                    <BoardHeader 
                        isHeaderOn={isHeaderOn} 
                        curUser={curUser}
                        board={boardName}
                        
                        getBoardRequest={getBoardRequest} 
                        localLogoutRequest={localLogoutRequest}
                        outlookLogoutRequest={outlookLogoutRequest}
                    />
                    
                    {
                        isFirstBoardGetSuccess ?

                        <BoardBody 
                            boardName={boardName} 
                            postlist={postlist} 
                            search={search}
                            windowHeight={windowHeight}
                            windowWidth={windowWidth}

                            isLoading={isLoading}
                            isHeaderOn={isHeaderOn}
                            headerOn={headerOn}
                        /> :

                        <div className='PageError'>
                            새로고침을 눌러주세요 :)
                        </div>
                    }
                </div> :

                <Redirect to='/' /> :

            'loading'
        )
    }
}

const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,                                   // 현재 로그인 된 유저 정보
        isGetStatusDone: state.auth.isGetStatusDone,                // get status 요청 완료 여부
        
        isFirstBoardGetSuccess: state.board.isFirstBoardGetSuccess, // 첫 번째 GET 요청이 성공했는 지 여부 = Render할 준비가 되었는 지
        postlist: state.board.postlist,                             // postlist 데이터
        scroll: state.board.scroll,                                 // 스크롤 횟수 (데이터를 받은 횟수)
        search: state.board.search,                                 // 검색어 데이터
        isLoading: state.board.isLoading,                           // Scroll GET 대기 여부
        isLast: state.board.isLast,                                 // 요소가 마지막인 지 여부
        isHeaderOn: state.board.isHeaderOn,                         // 헤더가 On 인지
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        headerOn: () => {dispatch(boardHeaderOn())},                    // 헤더를 나타나게 하는 메서드
        headerOff: () => {dispatch(boardHeaderOff())},                  // 헤더를 사라지게 하는 메서드

        getStatusRequest: () => dispatch(getStatusRequest()),           // 현재 로그인 된 유저 정보 요청 액션   
        localLogoutRequest: () => dispatch(localLogoutRequest()),       // 로그아웃 메서드
        outlookLogoutRequest: () => dispatch(outlookLogoutRequest()),   // 아웃룩 로그아웃 메서드

        initiateBoard: () => {dispatch(initiateBoard())},               // 보드 초기화 메서드 
        getBoardRequest: (boardName, scroll, search) => {               // 보드 GET 요청 메서드
            dispatch(getBoardRequest(boardName, scroll, search))
        },
        getBoardRequestByScroll: (boardName, scroll, search) => {       // 보드 Scroll GET 요청 메서드
            dispatch(getBoardRequestByScroll(boardName, scroll, search))
        },

        topicSelect: (topic) => {dispatch(topicSelect(topic))},         // App의 topic state를 topic 값으로 설정
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);