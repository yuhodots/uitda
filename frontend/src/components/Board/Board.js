// 

// 상위 컴포넌트: BoardContainer

import React, { Component } from "react";
import PropTypes from 'prop-types';

import './Board.css';
import PostCard from "./PostCard";

class Board extends Component {

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


    _renderMarketPostList = (postlist) => {
        return postlist.map( (post, idx) => {
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
                    isFake = {post.isFake}
                    key = {idx}
                />
            )
        })
    }

    _renderNetworkingPostList = (postlist) => {
        return postlist.map( (post, idx) => {
            return (
                <PostCard
                    id = {post.id}
                    title = {post.title}
                    user = {post.user}
                    created = {post.created}
                    description = {post.description}
                    filelist = {post.filelist}
                    condition= {post.condition}
                    isFake = {post.isFake}
                    key = {idx}
                />
            )
        })
    }


    render() {
        const postlist = this._makeStandardList(this.props.postlist);
        let renderPostList;

        switch (this.props.boardName) {
            case 'market':
                renderPostList = this._renderMarketPostList;
                break;
        
            case 'networking':
                renderPostList = this._renderNetworkingPostList;
                break;

            default:
                break;
        }

        return (
            <div className="BoardTemplate">
                {
                    this.props.search ?
                    <div className='SearchInfoBox'>
                        <h2>{this.props.search} 검색</h2>
                    </div> :
                    ''
                }
                {renderPostList(postlist)}
            </div>
        )
    }
}


Board.propTypes = {
    boardName: PropTypes.string.isRequired,     // 무슨 보드인지 (market, networking)
    postlist: PropTypes.array,                  // 렌더할 Post List 데이터
    search: PropTypes.string,                   // 검색어 데이터
}

Board.defaultProps = {
    postlist: [],
    search: ''
}


export default Board;