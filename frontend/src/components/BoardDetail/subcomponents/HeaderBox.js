// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { InfoTextBox } from "./HeaderBox_Sub";
import { colors } from "../../../styles/variables";
import { UserPhoto } from "../../Structure/CommonComponents";
import { MARKET } from '../../../constants/categories';


/* Styled Components */

/* HeaderBox의 영역을 규정하는 div 태그 */
const HeaderArea = styled.div`
    position: relative;
    
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem;
    border-bottom: ${props => props.isPhoto ? `1px solid ${colors.light_gray_line}` : ''};

    display: flex;
    flex-flow: column nowrap;
`;

    /* 유저 정보, 생성일, 판매 상태를 담은 정보 박스 */
    const InfoBox = styled.div`
        height: 4.5rem;
        width: 100%;
        
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        /* 동그란 User 사진 */
        const UserPhotoBox = styled.div`
            height: 4.5rem;
            width: 4.5rem;
            position: relative;
            border-radius: 50%;         /* 동그란 영역으로 만들어주는 속성 */
            border: ${colors.light_gray_line} solid 2px;

            margin-right: 1rem;
            flex: 0 0 4.5rem;
        `;

    /* 제목 */
    const Title = styled.h1`
        margin: 0;
        margin-top: 2rem;

        font-size: 2rem;

        word-wrap: break-word;
        word-break: break-all;
    `

    /* 가격 */
    const Price = styled.h3`
        margin: 0;
        margin-top: 0.5rem;

        align-self: flex-end;
        font-size: 1.375rem;
    `;


/* React Component */
const HeaderBox = ({postId, board, isPhoto, isOwner, title, user, created, condition, price, headerMethods}) => {

    const { username, pic_location } = user;

    const displayWon = price !== '가격 미정' && price !== '무료 나눔';

    return (
        <HeaderArea isPhoto={isPhoto} >
            <InfoBox>
                <UserPhotoBox>
                    <UserPhoto imgURL={pic_location} />
                </UserPhotoBox>
                <InfoTextBox
                    board={board} postId={postId}
                    username={username} created={created}
                    condition={condition} isOwner={isOwner}
                    headerMethods={headerMethods}
                />
            </InfoBox>
            <Title>{title}</Title>
            { board === MARKET && <Price>{price} { displayWon && '원' } </Price> } 
        </HeaderArea>
    )
}

HeaderBox.propTypes = {
    postId: PropTypes.number.isRequired,        // 게시글 id
    isPhoto: PropTypes.bool.isRequired,         // 사진이 있는 글 인지
    isOwner: PropTypes.bool.isRequired,         // 해당 게시글이 내 글인지
    board: PropTypes.string.isRequired,         // 게시판 정보
    title: PropTypes.string.isRequired,         // 글 제목
    user: PropTypes.object.isRequired,          // 글 작성자 데이터
    created: PropTypes.string.isRequired,       // 글 작성시각
    condition: PropTypes.string.isRequired,     // 글 상태

    price: PropTypes.string,                    // Market 글의 가격 정보 

    headerMethods: PropTypes.object.isRequired,  // 게시글 페이지의 header 부분에서 사용하는 method 모음 객체
}

export default HeaderBox;