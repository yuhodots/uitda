//

// 상위 컴포넌트: components/Board

import React, { Component } from "react";
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PhotoCard, NoPhotoCard, FakeCard } from "./Cards";
import { colors } from "../../../../../styles/variables";
import { MARKET } from "../../../../../constants/categories";
import './PostCard.css';


/* Styled Components */
const PostCardArea = styled.div`
    margin: 1.5rem .75rem;
    flex-grow: 1;
    flex-basis: 20rem; 
    
    background-color: ${colors.white};
    box-shadow: 0 0 10px rgba(0,0,0,.1);
    
    display: flex;
    flex-flow: column nowrap;  
`;


/* React Component */
class PostCard extends Component {

    render() {

        const { 
            boardName, 
            isFake,
            id,
            title,
            user,
            created,
            description,
            condition,
            filelist,
            price,
        } = this.props

        const isMarketCard = boardName === MARKET;

        return (
            <PostCardArea >
            {
                isFake ?
                
                <FakeCard/> :
                
                /* Market 카드는 온전히 Photo Card, Network 카드 중에서도 사진이 존재하면 PhotoCard */
                isMarketCard || filelist.length ?
                
                    <PhotoCard
                        boardName = {boardName}
                        id = {id}
                        title = {title}
                        user = {user}
                        created = {created}
                        description = {description}
                        condition = {condition}
                        filelist = {filelist}
                        price = {price}
                    /> :
                    
                    <NoPhotoCard 
                        boardName = {boardName}
                        id = {id}
                        title = {title}
                        user = {user}
                        created = {created}
                        description = {description}
                        condition = {condition}
                        filelist = {filelist}
                    />
            }
            </PostCardArea>
        )
    }
}

PostCard.propTypes = {
    boardName: PropTypes.string.isRequired, // 무슨 보드인지
    id: PropTypes.number.isRequired,        // 포스팅 카드가 DB에 저장된 id
    title: PropTypes.string.isRequired,     // 제목
    user: PropTypes.object.isRequired,      // 작성자 정보 객체
    created: PropTypes.string.isRequired,   // 작성일 정보
    condition: PropTypes.string,            // 게시글의 상태 정보 (판매 중, 거래 완료 ...)
    description: PropTypes.string,          // 상세 정보
    filelist: PropTypes.array,              // 사진 데이터 리스트
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