//

// 상위 컴포넌트: pages/Board

import React, { Component } from "react";
import { connect } from 'react-redux';

// 컴포넌트
import Board from "../components/Board";
import SearchIcon from "../components/Structure/SearchIcon";
import LoadingBar from "../components/Structure/LoadingBar";

// 액션
import {
    headerOn,
    headerOff,
    searchBarOn,
} from "../store/actions/structure"

import { 
    initiateBoard,
    getBoardRequest,
    getBoardRequestByScroll
} from '../store/actions/board'

import { topicSelect } from "../store/actions/topic";

class BoardContainer extends Component {    

    state = {}

    componentDidMount() {

        const { 
            boardName,
            
            initiateBoard,
            getBoardRequest,
            headerOn,
            searchBarOn,
            topicSelect,
        } = this.props;
        
        initiateBoard();

        headerOn();                                      // 헤더 On
        searchBarOn();                                   // 검색창 On
        topicSelect(boardName);                          // app의 topic state를 boardName으로 설정
        
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
        let { isHeaderOn, boardName, scroll, search } = this.props;

        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;

        // Header On/Off 관련
        if (isHeaderOn) {
            if(scrollTop > 64){
                this.props.headerOff();
            }
        }
        else if (scrollTop <= 64) {
            this.props.headerOn();
        }

        // 무한 스크롤
        if (scrollTop + clientHeight > scrollHeight - 64) {
            if( !this.props.isLast && !this.props.isLoading ){
                this.props.getBoardRequestByScroll( boardName, scroll, search );
            }
        }
    }

    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }


    render() {
        let {
            // properties
            boardName,
            postlist,
            search,

            isHeaderOn,
            doesRenderOK,
            isLoading,

            // methods
            headerOn,
        } = this.props;

        const { windowHeight } = this.state;

        return (
            <div>
                <LoadingBar isLoading={isLoading} />
                {
                    doesRenderOK ?
                
                    <Board
                        boardName={boardName} 
                        postlist={postlist} 
                        search={search}
                        windowHeight={windowHeight}
                    /> :

                    <div className='PageError'>
                        새로고침을 눌러주세요 :)
                    </div>
                }              
                <SearchIcon
                    isHeaderOn={isHeaderOn}
                    headerOn={headerOn}
                />  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        doesRenderOK: state.board.isFirstBoardGetSuccess,   // 첫 번째 GET 요청이 성공했는 지 여부 = Render할 준비가 되었는 지
        postlist: state.board.postlist,                     // postlist 데이터
        scroll: state.board.scroll,                         // 스크롤 횟수 (데이터를 받은 횟수)
        search: state.board.search,                         // 검색어 데이터
        isLoading: state.board.isLoading,                   // Scroll GET 대기 여부
        isLast: state.board.isLast,                         // 요소가 마지막인 지 여부
        isHeaderOn: state.structure.isHeaderOn,             // 헤더가 On 인지
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        headerOn: () => {dispatch(headerOn())},                     // 헤더를 나타나게 하는 메서드
        headerOff: () => {dispatch(headerOff())},                   // 헤더를 사라지게 하는 메서드
        searchBarOn: () => {dispatch(searchBarOn())},               // 검색바를 나타나게 하는 메서드

        initiateBoard: () => {dispatch(initiateBoard())},           // 보드 초기화 메서드 
        getBoardRequest: (boardName, scroll, search) => {           // 보드 GET 요청 메서드
            dispatch(getBoardRequest(boardName, scroll, search))
        },
        getBoardRequestByScroll: (boardName, scroll, search) => {   // 보드 Scroll GET 요청 메서드
            dispatch(getBoardRequestByScroll(boardName, scroll, search))
        },

        topicSelect: (topic) => {dispatch(topicSelect(topic))},     // App의 topic state를 topic 값으로 설정
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);