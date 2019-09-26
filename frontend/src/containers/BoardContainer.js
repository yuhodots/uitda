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


    async componentDidMount() {

        await this._initBoard()                                   // Board 초기화 및 scroll 0 데이터 GET 요청
        const { boardName, scroll } = this.props;

        this.props.headerOn();                              // 헤더 On
        this.props.searchBarOn();                           // 검색창 On
        this.props.topicSelect(boardName);                  // app의 topic state를 boardName으로 설정

        this.props.getBoardRequest(boardName, scroll);

        window.addEventListener('scroll', this._handleScroll);   // Scroll 이벤트가 생길 때, onScroll을 실행함
    }

    async componentWillUnmount () {
        window.removeEventListener("scroll", this._handleScroll);
    }

    _initBoard = async () => {
        await this.props.initiateBoard();               // Board 초기화
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
            if( !this.props.isLoading ){
                this.props.getBoardRequestByScroll( boardName, scroll, search );
            }
        }
    }


    render() {
        let {
            // properties
            boardName,
            postlist,
            search,
            isHeaderOn,
            isGetSuccess,
            isLoading,

            // methods
            headerOn,
        } = this.props;

        console.log(isLoading);

        return (
            <div>
                <LoadingBar isLoading={isLoading} />
                {
                    isGetSuccess ?
                
                    <Board
                        boardName={boardName} 
                        postlist={postlist} 
                        search={search}
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
        isGetSuccess: state.board.isGetSuccess,     // GET 요청이 성공했는 지 여부
        postlist: state.board.postlist,             // postlist 데이터
        scroll: state.board.scroll,                 // 스크롤 횟수 (데이터를 받은 횟수)
        search: state.board.search,                 // 검색어 데이터
        isLoading: state.board.isLoading,           // Scroll GET 대기 여부
        isHeaderOn: state.structure.isHeaderOn,     // 헤더가 On 인지
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