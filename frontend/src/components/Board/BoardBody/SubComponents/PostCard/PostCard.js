//

// 상위 컴포넌트: components/Board

import React, { Component } from "react";
import PropTypes from 'prop-types';

import { MarketCard, FakeCard } from "./Cards";
import './PostCard.css';

class PostCard extends Component {

    _renderCard() {

        let isMarketCard;
        
        switch (this.props.boardName) {
            case 'market':
                isMarketCard = true;
                break;
        
            case 'networking':
                isMarketCard = false;
                break;

            default:
                break;
        }

        return (
            <div>
                { 
                    isMarketCard ?
                    <MarketCard
                        id = {this.props.id}
                        title = {this.props.title}
                        user = {this.props.user}
                        created = {this.props.created}
                        description = {this.props.description}
                        condition = {this.props.condition}
                        filelist = {this.props.filelist}
                        boardName = {this.props.boardName}

                        price = {this.props.price}
                    /> :
                    <MarketCard
                        id = {this.props.id}
                        title = {this.props.title}
                        user = {this.props.user}
                        created = {this.props.created}
                        description = {this.props.description}
                        condition = {this.props.condition}
                        filelist = {this.props.filelist}
                        boardName = {this.props.boardName}

                        price = {this.props.price}
                    />
                }
            </div>   
        )
    }

    render() {
        return (
            <div className="PostCard">
                {
                    this.props.isFake ?
                    <FakeCard/> :
                    this._renderCard()
                }
            </div>
        )
    }
}

PostCard.propTypes = {
    id: PropTypes.number.isRequired,        // 포스팅 카드가 DB에 저장된 id
    title: PropTypes.string.isRequired,     // 제목
    user: PropTypes.object.isRequired,      // 작성자 정보 객체
    created: PropTypes.string.isRequired,   // 작성일 정보
    condition: PropTypes.string,            // 게시글의 상태 정보 (판매 중, 거래 완료 ...)
    description: PropTypes.string,          // 상세 정보
    filelist: PropTypes.array,              // 사진 데이터 리스트
    boardName: PropTypes.string.isRequired, // 무슨 보드인지
    isFake: PropTypes.bool.isRequired,      // fake 카드인지

    price: PropTypes.string,                // [market] 가격 정보
}

PostCard.defaultProps = {
    description: '',
    filelist: [],
    price: '',
    condition: ''
}


export default PostCard