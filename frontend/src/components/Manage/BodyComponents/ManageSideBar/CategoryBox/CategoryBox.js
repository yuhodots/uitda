// 상위 컴포넌트: ManageSideBox

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'

import { colors } from '../../../../../styles/variables'
import { BoxTemplate } from '../../../../../styles/templates/manage'

import {
    MANAGE_PROFILE,
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_CONTACT
} from '../../../../../constants/manage_category'


/* Styled Components */

/* Category 박스 전체를 의미 */
const BoxArea = styled(BoxTemplate)`
    margin: 0;
    padding: 0;

    width: 100%;

    display: flex;
    flex-flow: column nowrap;
`;

    /* 카테고리 그룹 */
    const SubGroup = styled.div`
        padding: 0.5rem 0;

        border-bottom: 1px solid ${colors.gray_bg};
        ${props => props.isBottom && css`
            border-bottom: none;
        `}

        display: flex;
        flex-flow: column nowrap;
    `;

        /* 카테고리 Item 공통 속성
           좌측에 동일한 Padding 값을 갖도록 함 */
        const CategoryItemStyle = css`
            position: relative;
            padding: 0.25rem 0;
            padding-left: 2.5rem;

            white-space: nowrap;
        `;

        /* Link 태그 공통 스타일
           밑줄을 없애고, hover 시 자동 폰트 색 변환을 없앴으며,
           hover 시 배경색을 입히는 효과 추가 */
        const LinkStyle = css`
            ${CategoryItemStyle}
            
            text-decoration: none;
            color: ${ props => props.color };

            :hover {
                color: ${ props => props.color };
                background-color: ${colors.gray_bg};
            }
        `;

        /* SubGroup의 Title 공통 속성. font 스타일링 */
        const TitleStyle = css`
            ${CategoryItemStyle}

            /* color: ${props => props.color}; */
            color: ${colors.font_darkgray};
            font-size: 1rem;
        `;

            /* Link 기능을 하는 Title 태그 */
            const TitleLink = styled(Link)`
                ${TitleStyle}
                ${LinkStyle}
            `;

            /* Link 기능을 하는 세부 항목 태그 */
            const SubLink = styled(Link)`
                ${LinkStyle}
                font-size: 0.875rem;
            `;

            /* Link 기능이 없는 Title 태그 */
            const GroupTitle = styled.div`
                ${TitleStyle}
                cursor: default;
            `;


/* React Component */
const CategoryBox = ({kind}) => {

    const hightLightColor = colors.blue;
    const defaultTitleColor = colors.font_darkgray;
    const defaultSubColor = colors.font_gray;

    return (
        <BoxArea>
            <SubGroup>
                <TitleLink
                    to='/manage/profile' 
                    color={kind === MANAGE_PROFILE ? hightLightColor : defaultTitleColor}
                >
                    회원정보 관리
                </TitleLink>
            </SubGroup>
            
            <SubGroup>
                <GroupTitle color={kind === MANAGE_POSTS_MARKET || kind === MANAGE_POSTS_NETWORKING ? hightLightColor : defaultTitleColor} >
                    작성한 글 관리
                </GroupTitle>
                <SubLink 
                    to='/manage/posts/market'
                    color={kind === MANAGE_POSTS_MARKET ? hightLightColor : defaultSubColor}
                >
                    유니마켓 글 관리
                </SubLink>
                <SubLink 
                    to='/manage/posts/networking'
                    color={kind === MANAGE_POSTS_NETWORKING ? hightLightColor : defaultSubColor}
                >
                    네트워킹 글 관리
                </SubLink>
            </SubGroup>
            
            <SubGroup>
                <GroupTitle color={kind === MANAGE_COMMENTS || kind === MANAGE_LIKEPOSTS ? hightLightColor : defaultTitleColor} >
                    관심 글 목록
                </GroupTitle>
                <SubLink 
                    to='/manage/comments'
                    color={kind === MANAGE_COMMENTS ? hightLightColor : defaultSubColor}
                >
                    댓글을 단 게시글
                </SubLink>
                <SubLink 
                    to='/manage/likeposts'
                    color={kind === MANAGE_LIKEPOSTS ? hightLightColor : defaultSubColor}
                >
                    관심있음 표시한 게시글
                </SubLink>
            </SubGroup>
            
            <SubGroup isBottom={true} >
                <TitleLink 
                    to='/manage/contact'
                    color={kind === MANAGE_CONTACT ? hightLightColor : defaultTitleColor}
                >
                    피드백 보내기
                </TitleLink>
            </SubGroup>
        </BoxArea>
    )
}

CategoryBox.propTypes = {
    kind: PropTypes.string.isRequired,      // 카테고리 정보
}

export default CategoryBox;