import React, { Component } from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom'

import {colors} from '../../../../../styles/variables'

/* Styled Components */
const BoxArea = styled.div`

    margin: 0;
    padding: 1rem;

    width: 100%;
    height: 32rem;

    background-color: ${colors.white};

    display: flex;
    flex-flow: column nowrap;
`;

const CategoryLink = styled(Link)`
`;


class CategoryBox extends Component {



    render () {
        return (
            <BoxArea>
                <CategoryLink to='/manage/posts/market'>다판다 글 관리</CategoryLink>
                <CategoryLink to='/manage/posts/networking'>잉력시장 글 관리</CategoryLink>
                <CategoryLink to='/manage/comments'>댓글을 단 게시글</CategoryLink>
                <CategoryLink to='/manage/likeposts'>관심있음 표시한 게시글</CategoryLink>
                <CategoryLink to='/manage/mycarpool'>내 Carpool 일정</CategoryLink>
            </BoxArea>
        )
    }
}

export default CategoryBox;