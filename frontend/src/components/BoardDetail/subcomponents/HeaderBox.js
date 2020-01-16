// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';

import { colors } from "../../../styles/variables";

import userPhoto from "./resources/User_Basic_img.JPG";

/* Styled Components */

/* HeaderBox의 영역을 규정하는 div 태그 */
const HeaderArea = styled.div`
    position: relative;
    
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid ${colors.gray_bg};
`;


/* 유저 정보, 생성일, 판매 상태를 담은 정보 박스 */
const InfoBox = styled.div`
    height: 4.5rem;
    width: 100%;
    margin-bottom: 1rem;
    
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
`;

/* 동그란 User 사진 */
const UserPhoto = styled.div`
    height: 4.5rem;
    width: 4.5rem;
    position: relative;
    border-radius: 50%;         /* 동그란 영역으로 만들어주는 속성 */
    border: ${colors.gray_bg} solid 2px;

    margin-right: 1rem;
    flex: 0, 4.5rem;

    /* 이미지 관련 속성 */
    background-image: ${props =>
        props.hasPhoto ? 'none': `url(${userPhoto})`};      /* user photo 부분 추가되면 수정하기 */
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`;

/* 작성자, 작성일의 정보를 담은 div */
const Infomations = styled.div`
    padding-top: 1rem;
    height: 3.5rem;

    display: flex;
    flex-direction: column;

    flex: 1;
`;

/* 이름, 작성일 텍스트 스타일 */
const InfomationText = styled.p`
    margin: 0;
    height: 1.5rem;
    line-height: 1.5rem;
    
    color: ${colors.gray_fontColor};
`;

/* 상태 정보 박스 */
const StatusBox = styled.div`
    height: 4.5rem;
    width: 4rem;
    
    line-height: 4.5rem;
    text-align: center;
    
    flex: 0, 4rem;
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
    margin-top: 1.5rem;
    
    font-size: 1.375rem;
`;

///////////////////////////////////

/* React Component */

const HeaderBox = ({title, user, created, condition, price}) => {

    let doesUserHavePhoto = user.profile_picture;

    return (
        <HeaderArea>
            <InfoBox>
                <UserPhoto hasPhoto={doesUserHavePhoto} imgsrc={userPhoto} />   { /* user photo 부분 추가되면 수정할 것 */ }
                <Infomations>
                    <InfomationText>{user.username}</InfomationText>
                    <InfomationText>{created}</InfomationText>
                </Infomations>
                <StatusBox>{condition}</StatusBox>
            </InfoBox>
            <Title>{title}</Title>
            <Price>{price} 원</Price> 
        </HeaderArea>
    )
}

export default HeaderBox;