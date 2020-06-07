

import React from 'react';
import styled from 'styled-components';
import { Divider } from "antd";
import { GithubOutlined } from "@ant-design/icons";

import { colors } from "../../styles/variables";


/* Styled Components */
/* Footer 전체 영역 박스 */
const FooterBox = styled.div`
    position: absolute;
    bottom: 0;

    width: 100%;
    height: 5rem;

    background-color: ${colors.white};
    border-top: 1px solid ${colors.gray_line};
`;

    /* 내용이 담기는 div 태그 */
    const FooterContentBox = styled.div`
        margin: 0 auto;
        height: 100%;
        width: 1150px;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
    `;

        const LeftBox = styled.div`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

        const RightBox = styled.div`
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
        `;

            /* Link Style */
            const FooterLink = styled.a`
                color: ${colors.font_gray};

                :hover {
                    color: ${colors.font_gray};
                    text-decoration: underline;
                }
            `;

            const GithubIcon = styled(GithubOutlined)`
                margin-right: 0.5rem;
            `;


/* React Component */
const ManageFooter = () => {

    return (
        <FooterBox>
            <FooterContentBox>
                <LeftBox>
                    <FooterLink href='/policy.pdf' >개인정보처리방침</FooterLink>
                    <Divider type='vertical' />
                    <FooterLink href='/service.pdf' >서비스이용약관</FooterLink>
                </LeftBox>

                <RightBox>
                    <GithubIcon />
                    <FooterLink href='https://github.com/bwmelon97/Uitda_Distribution' >유잇다 Github 링크</FooterLink>
                </RightBox>
            </FooterContentBox>
        </FooterBox>
    )
}

export default ManageFooter