/* 아웃룩 로그인 버튼이 있는 파란 바탕의 박스 */

import React from 'react';
import styled from 'styled-components';
import { Popover, Button, Divider } from 'antd';

import { UI_uni, outlook } from "../../../styles/images/EnterPage_Images";
import { colors, Screen_Size } from '../../../styles/variables';


/* Styled Components */
/* 전체 영역 스타일 */
const WholeArea = styled.div`
    position: relative;
    z-index: 100;

    padding: 5rem 1.5rem;
    width: 40%;
    min-height: 100%;
    min-width: 500px;
    
    background-color: ${colors.blue};
    box-shadow: 4px 0px 4px rgba(0,0,0,.2);
    
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

    @media (max-width: ${Screen_Size.pad_portrait}) {
        width: 100%;
        box-shadow: 0px 4px 4px rgba(0,0,0,.2);
    }
`;

    /* 윤이 이미지를 위치 시키는 Container 박스 */
    const UniImageBox = styled.div`
        margin-bottom: 2rem;
        
        display: flex;
        align-items: center;
        justify-content: center;
    `;

        /* 윤이 이미지 스타일 */
        const UniImage = styled.img`
            width: 55%;
        `;

    /* 텍스트 (제목 + 설명)를 담는 박스 */
    const TextBox = styled.div`
        margin-bottom: 6rem;

        color: ${colors.white};
        text-align: center;

        display: flex;
        flex-flow: column;
        align-items: center;
    `;

        /* 유니스트를 잇다 */
        const Title = styled.h1`
            margin-bottom: 1.5rem;
            color: ${colors.white};
        `;

        /* 사이트 설명 */
        const Description = styled.div`
            line-height: 2rem;
        `;

    /* 아웃룩 로그인 버튼 스타일 */
    const OutlookLoginButton = styled(Button)`
        margin-bottom: 2rem;
        padding: 0;
        height: 3rem;
        width: 12.5rem;

        background-color: ${colors.white};
        box-shadow: 0 2px 4px 0 #00000033;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
    `;

        /* Outlook 로그인 버튼 content 스타일 */
        const OutlookLoginHint = styled.div`
            padding: 0.5rem 1.5rem;
            font-size: 0.75rem;
        `;

        /* 아웃룩 이미지 스타일 */
        const OutlookImg = styled.img`
            width: 22px;
            margin-right: 12px;
        `;

    /* 정책 pdf 파일 링크를 담은 박스 */
    const PolicyLinkBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        /* 정책 pdf 파일 링크 스타일 */
        const PolicyLink = styled.a`
            font-size: small;
            color: ${colors.white};
        `;



/* React Component */
const OutlookLoginBox = () => {

    /* ant-design popover */
    const LoginHint = (
        <OutlookLoginHint>
            별도의 <strong>회원가입 없이</strong> outlook 로그인 후 유잇다를 이용하실 수 있습니다.<br></br>
            개인 정보 보호를 위해 공용 PC에서 로그아웃 상태를 <strong>반드시</strong> 확인해주세요.
        </OutlookLoginHint>
    );

    const button_href = 'http://uitda.net/login'

    return (
        <WholeArea>

            <UniImageBox> <UniImage src={UI_uni} alt='유잇다 로고' ></UniImage> </UniImageBox>

            <TextBox>
                <Title>유니스트를 잇다!</Title>
                <Description>
                    학우들에게 팔고 싶은 물건이 있거나, 부탁하고 싶은 퀘스트가 있으신가요?<br></br>
                    유잇다를 통해 가막골 유니스타의 삶의 질을 한 단계 높여보아요
                </Description>
            </TextBox>

            <Popover content={LoginHint}>
                <OutlookLoginButton href={button_href}>
                    <OutlookImg src={outlook} alt='' ></OutlookImg>
                    <strong>Outlook 로그인</strong>
                </OutlookLoginButton>
            </Popover>

            <PolicyLinkBox>
                <PolicyLink href="/policy.pdf">개인정보처리방침 </PolicyLink>
                <Divider type="vertical" />
                <PolicyLink href="/service.pdf"> 서비스이용약관</PolicyLink>
            </PolicyLinkBox>

        </WholeArea>
    )
}


export default OutlookLoginBox