// 상위 컴포넌트: PostCard.js

import React from "react";
import PropTypes from 'prop-types';

import PhotoBox from './CardCompoents/PhotoBox';
import ContentBox from "./CardCompoents/ContentBox";


const PhotoCard = ({boardName, id, title, user, created, description, filelist, price}) => {
    return (
        <div>
            <PhotoBox 
                filelist={filelist}
                boardName={boardName}
                postId={id}
            />
            <ContentBox
                id = {id}
                title = {title}
                username = {user.username}
                created = {created}
                description = {description}
                price={price}
            />
        </div>
    )
}

PhotoCard.propTypes = {
    boardName: PropTypes.string.isRequired,         // 어느 게시판 카드인지
    id: PropTypes.number.isRequired,                // 포스팅 카드가 DB에 저장된 id
    title: PropTypes.string.isRequired,             // 제목
    user: PropTypes.object.isRequired,              // 작성자 정보 객체
    created: PropTypes.string.isRequired,           // 작성일 정보
    condition: PropTypes.string.isRequired,         // 게시글의 상태 정보 (판매 중, 거래 완료 ...)
    description: PropTypes.string.isRequired,       // 상세 정보
    filelist: PropTypes.array.isRequired,           // 사진 데이터 리스트

    price: PropTypes.string,                        // [market] 가격 정보
}

export default PhotoCard;