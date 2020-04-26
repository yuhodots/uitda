// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
            flex: 0, 4.5rem;
        `;

        /* 작성자, 작성일, Status 정보를 담은 row box */
        const InfoTextBox = styled.div`
            flex: 1;
            
            cursor: default;
            
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: flex-start;
        `;

            /* 작성자, 작성일의 정보를 담은 div */
            const UsernameCreatedBox = styled.div`
                color: ${colors.gray_fontColor};
                
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;
            `;
                
                const UserNameText = styled.div`
                    font-size: 1.125rem;
                    font-weight: bold;
                `;

                const CreatedText = styled.div`
                    font-size: 0.875rem;
                `;

            /* 상태 정보 박스 Status Circle + Text */
            const StatusBox = styled.div`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            `;

                const StatusCircle = styled.div`
                    height: 0.5rem;
                    width: 0.5rem;
                    margin-right: 0.75rem;

                    border-radius: 50%;
                    background-color: ${props => props.labelColor};
                `;


    /* 제목 */
    const Title = styled.h1`
        margin: 0;
        margin-top: 2rem;

        font-size: 2rem;
    `

    /* 가격 */
    const Price = styled.h3`
        margin: 0;
        margin-top: 0.5rem;

        align-self: flex-end;
        
        font-size: 1.375rem;
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
const HeaderBox = ({board, isPhoto, title, user, created, condition, price}) => {

    const { username, pic_location } = user;

    const labelColor = _getLabelColor(condition);

    return (
        <HeaderArea isPhoto={isPhoto} >
            <InfoBox>
                <UserPhotoBox>
                    <UserPhoto imgURL={pic_location} />
                </UserPhotoBox>
                <InfoTextBox>
                    <UsernameCreatedBox>
                        <UserNameText>{username}</UserNameText>
                        <CreatedText>{created}</CreatedText>
                    </UsernameCreatedBox>
                    <StatusBox> <StatusCircle labelColor={labelColor} /> {condition}</StatusBox>
                </InfoTextBox>
            </InfoBox>
            <Title>{title}</Title>
            { board === MARKET && <Price>{price} 원</Price> } 
        </HeaderArea>
    )
}

HeaderBox.propTypes = {
    isPhoto: PropTypes.bool.isRequired,         // 사진이 있는 글 인지
    board: PropTypes.string.isRequired,         // 게시판 정보
    title: PropTypes.string.isRequired,         // 글 제목
    user: PropTypes.object.isRequired,          // 글 작성자 데이터
    created: PropTypes.string.isRequired,       // 글 작성시각
    condition: PropTypes.string.isRequired,     // 글 상태

    price: PropTypes.string,                    // Market 글의 가격 정보 
}

export default HeaderBox;