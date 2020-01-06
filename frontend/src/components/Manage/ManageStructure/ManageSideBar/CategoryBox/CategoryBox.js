// 상위 컴포넌트: ManageSideBox

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'

import { colors } from '../../../../../styles/variables'
import { BoxTemplate } from '../../../../../styles/templates/manage'

import {
    MANAGE_POSTS_MARKET,
    MANAGE_POSTS_NETWORKING,
    MANAGE_COMMENTS,
    MANAGE_LIKEPOSTS,
    MANAGE_MYCARPOOL,
    // MANAGE_NOTIFICATIONS,
} from '../../../../../constants/manage_category'


/* Styled Components */

/* Category 박스 전체를 의미 */
const BoxArea = styled(BoxTemplate)`
    margin: 0;
    padding: 1.5rem;

    width: 100%;
    height: 32rem;

    display: flex;
    flex-flow: column nowrap;
`;

/* 카테고리 그룹 */
const SubGroup = styled.div`
    margin-bottom: 2rem;

    display: flex;
    flex-flow: column nowrap;
`

/* 카테고리 그룹 제목 */
const SubTitle = styled.div`
    margin-bottom: 1rem;

    font-size: 1rem;
`;

/* 카테고리 링크 */
const CategoryLink = styled(Link)`
    text-decoration: none;
    color: ${ (props) => {
        return props.isHighLight ?
        colors.font_darkgray :
        colors.font_lightgray
    }};
    margin-bottom: 0.5rem;

    padding-left: 0.5rem;
    font-size: 0.9375rem;
`;


/* React Component */

class CategoryBox extends Component {


    render () {

        const { kind } = this.props;

        return (
            <BoxArea>
                <SubGroup>
                    <SubTitle>작성한 글 관리</SubTitle>
                    <CategoryLink 
                        to='/manage/posts/market'
                        isHighLight={kind === MANAGE_POSTS_MARKET}
                    >
                        다판다 글 관리
                    </CategoryLink>
                    <CategoryLink 
                        to='/manage/posts/networking'
                        isHighLight={kind === MANAGE_POSTS_NETWORKING}
                    >
                        잉력시장 글 관리
                    </CategoryLink>
                </SubGroup>
                
                
                <SubGroup>
                    <SubTitle>관심 글 목록</SubTitle>
                    <CategoryLink 
                        to='/manage/comments'
                        isHighLight={kind === MANAGE_COMMENTS}
                    >
                        댓글을 단 게시글
                    </CategoryLink>
                    <CategoryLink 
                        to='/manage/likeposts'
                        isHighLight={kind === MANAGE_LIKEPOSTS}
                    >
                        관심있음 표시한 게시글
                    </CategoryLink>
                    <CategoryLink 
                        to='/manage/mycarpool'
                        isHighLight={kind === MANAGE_MYCARPOOL}
                    >
                        내 Carpool 일정
                    </CategoryLink>
                </SubGroup>
                

                <SubTitle>지난 알림 보기</SubTitle>
            </BoxArea>
        )
    }
}

CategoryBox.propTypes = {
    kind: PropTypes.string.isRequired,      // 카테고리 정보
}

export default CategoryBox;