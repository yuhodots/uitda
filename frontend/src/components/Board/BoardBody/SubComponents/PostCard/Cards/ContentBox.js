

import React from "react";
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { UserPhoto } from "../../../../../Structure/CommonComponents";
import { colors } from "../../../../../../styles/variables";
import { MARKET } from '../../../../../../constants/categories'


/* Styled Components */
/* Content Box 전체 div 태그 */
const ContentBoxDiv = styled.div`
    padding: 1.5rem;
    padding-top: .75rem;

    display: flex;
    flex-flow: column nowrap;
`;

/* description을 제외한 글의 정보를 담은 Header Box */
const ContentHead = styled.div`
    position: relative;
    padding-bottom: 2.75rem;
    border-bottom: 1px solid ${colors.light_gray_line};

    display: flex;
    flex-flow: column nowrap;
`;

    /* User Photo, User, Created, Condition을 담은 
       row direction의 div 태그 */
    const InfoBox = styled.div`
        position: relative;
        height: 2.5rem;
        width: 100%;
        margin-bottom: 1.5rem;
        
        font-size: .875rem;
        color: ${colors.font_gray};

        display: flex;
        flex-flow: row nowrap;

        ${props => !props.isPhotoCard && css`
            margin-top: 1.5rem;
            margin-bottom: 2.5rem;
        `}
    `;

        /* UserPhoto의 크기와 위치의 style을 갖는 div 태그 */
        const UserPhotoBox = styled.div`
            position: relative;
            top: -1.25rem;
            flex: 0 4rem;
            height: 4rem;

            background-color: white;
            border-radius: 50%;
            border: ${colors.gray_line} solid 1px;
            
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        /* Info Header의 텍스트 부분들을 담은 div Box */
        const Informations = styled.div`
            height: 100%;
            flex: 1;

            display: flex;
            flex-flow: row nowrap;
            align-items: flex-start;
            justify-content: space-between;
        `;

            /* UserName과 Created 정보를 담은 div Box (column direction) */
            const UserCreatedInfoBox = styled.div`
                margin-left: 1rem;

                display: flex;
                flex-flow: column nowrap;
            `;

                const UserName = styled.div`
                    margin-bottom: 0.25rem;
                    height: 1.25rem;
                    
                    line-height: 1.25rem;
                    font-size: 1rem;
                    font-weight: bold;
                `;

                const Created = styled.div`
                    height: 1.25rem;

                    line-height: 1.25rem;
                `;

            /* 글의 상태를 담은 StatusCircle + StatusText */
            const StatusBox = styled.div`
                cursor: default;

                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            `;

                const StatusCircle = styled.div`
                    height: 0.5rem;
                    width: 0.5rem;
                    margin-right: 0.5rem;

                    border-radius: 50%;
                    background-color: ${props => props.labelColor};
                `;

    /* 게시글 제목 + 해당 페이지로 넘어가는 Link */
    const TitleLink = styled(Link)`
        margin-bottom: 1rem;

        word-wrap: break-word;
        word-break: break-all;

        color: ${colors.black};
        text-decoration: none;
        font-size: 1.5rem;
        font-weight: bold;
        line-height: 1.75rem;
    `;

    /* 가격 정보를 담은 div 태그 */
    const PriceBox = styled.div`
        align-self: flex-end;

        font-size: 1.125rem;
        line-height: 1.25rem;
        font-weight: bold;
    `;

/* Description을 담는 Box */
const DescriptionBox = styled.div`
    margin-top: 1.5rem;
    height: 4.5rem;
    
    line-height: 1.5rem;
    
    /* 초과되는 글 내용에 대한 스타일링 (...) */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow-y: hidden;
    text-overflow: ellipsis;

    ${props => !props.isPhotoCard && css`
        margin-top: 2rem;
        height: 13.5rem;
        -webkit-line-clamp: 9;
    `}
`;


/* Custom Functions */
const _getLabelColor = (condition) => {
    switch (condition) {
        case '판매 중': case '진행 중': return colors.active_blue;
        case '거래 중': return colors.owner_yellow;
        case '판매 완료': case '완료': return colors.closed_gray;
        default: return;
    }
}

/* React Component */
const ContentBox = ({isPhotoCard, boardName, postId, title, user, created, condition, description, price}) => {

    /* 게시글 url */
    const postURL = `/board/${boardName}/${postId}`;    

    const { username, pic_location } = user;
    const labelColor = _getLabelColor(condition);

    const displayWon = price !== '가격 미정' && price !== '무료 나눔';

    return (
        <ContentBoxDiv>
            <ContentHead>
                <InfoBox isPhotoCard={isPhotoCard} >
                    <UserPhotoBox>
                        <UserPhoto imgURL={pic_location} />
                    </UserPhotoBox>
                    
                    <Informations>
                        <UserCreatedInfoBox>
                            <UserName>{username}</UserName>
                            <Created>{created}</Created>
                        </UserCreatedInfoBox>
                        <StatusBox> <StatusCircle labelColor={labelColor} /> {condition} </StatusBox>
                    </Informations>
                </InfoBox>
                <TitleLink to={postURL} > {title} </TitleLink>
                {
                    boardName === MARKET &&
                    <PriceBox>{price} {displayWon && '원'}</PriceBox>
                }
            </ContentHead>
            <DescriptionBox isPhotoCard={isPhotoCard} >
                {description}
            </DescriptionBox>
        </ContentBoxDiv>
    )
}

ContentBox.propTypes = {
    isPhotoCard: PropTypes.bool.isRequired, // Photo Card 글 인지 여부
    boardName: PropTypes.string.isRequired, // 무슨 보드인지
    postId: PropTypes.number.isRequired,    // 포스팅 카드가 DB에 저장된 id
    title: PropTypes.string.isRequired,     // 제목
    user: PropTypes.object.isRequired,      // 작성자 정보 객체
    created: PropTypes.string.isRequired,   // 작성일 정보
    condition: PropTypes.string,            // 게시글의 상태 정보 (판매 중, 거래 완료 ...)
    description: PropTypes.string,          // 상세 정보

    price: PropTypes.string,                // [market] 가격 정보
}

export default ContentBox;