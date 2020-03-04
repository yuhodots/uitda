// 

// 상위 컴포넌트: BoardContainer

import React, { Component } from "react";
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { LoadingBar, PostCard, SearchIcon } from "./SubComponents";
import { colors } from '../../../styles/variables'


/* Styled Components */
const BoardTemplate = styled.div`
    width: 100%;
    min-height: ${props => {
        return `${props.minHeight}px`
    }};
    padding: 0;
    padding-top: 4rem;
    padding-left: 15rem;
    background-color: ${colors.gray_bg};
    
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: flex-start;
`;

/* 검색 시, 검색어를 안내하는 테그를 담는 박스 */
const SearchInfoBox = styled.div`
    width: 100%;
    padding: 2rem;
`;


/* React Compoent */
class Board extends Component {

    state = {}

    _makeStandardList = (postlist) => {
        // Postlist의 Post 개수를 3의 배수에 맞도록
        // Fakecard를 추가해 주는 함수
        // 반응형 기능을 아직 구현 안함

        let standardList = [];

        const fakeCard = {
            id : -1,
            title : '',
            user : {},
            created : '',
            description : '',
            filelist : [],
            condition : '',
            price : '',
            isFake: true
        };

        const cardNum = postlist.length;
        const remain = cardNum % 3;
        let fakeCardNum = remain ? 3 - remain : 0;

        standardList = postlist.map(post => {
            return {
                ...post,
                isFake: false
            }
        })

        while(fakeCardNum--){
            standardList.push(fakeCard)
        }

        return standardList;
    }


    _renderPostList = (postlist) => {
        const boardName = this.props.boardName;

        return postlist.map( (post, idx) => {
            if(post.id){
                return (
                    <PostCard
                        id = {post.id}
                        title = {post.title}
                        user = {post.user}
                        created = {post.created}
                        description = {post.description}
                        filelist = {post.filelist}
                        condition = {post.condition}
                        price = {post.price}
                        boardName={boardName}
                        isFake = {post.isFake}
                        key = {idx}
                    />
                )
            }
            return null;
        })
    }

    render() {

        const { 
            search, 
            windowHeight, 
            isLoading,
            isHeaderOn,
            headerOn
        } = this.props;

        const postlist = this._makeStandardList(this.props.postlist);

        return (
            <div>
                <LoadingBar isLoading={isLoading} />

                <BoardTemplate minHeight={windowHeight} >
                    {
                        search ?
                        <SearchInfoBox>
                            <h2>{search} 검색</h2>
                        </SearchInfoBox> :
                        ''
                    }
                    {this._renderPostList(postlist)}
                </BoardTemplate>

                <SearchIcon isHeaderOn={isHeaderOn} headerOn={headerOn} />
            </div>
            
        )
    }
}


Board.propTypes = {
    boardName: PropTypes.string.isRequired,     // 무슨 보드인지 (market, networking)
    postlist: PropTypes.array,                  // 렌더할 Post List 데이터
    search: PropTypes.string,                   // 검색어 데이터

    windowHeight: PropTypes.number.isRequired,  // 화면 세로 길이 값

    isLoading: PropTypes.bool.isRequired,       // Loading Bar 실행 여부
    isHeaderOn: PropTypes.bool.isRequired,      // Header Render 여부
    headerOn: PropTypes.func.isRequired,        // 검색 아이콘 클릭 액션 (헤더 나타내기)
}

Board.defaultProps = {
    postlist: [],
    search: ''
}


export default Board;