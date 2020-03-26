/* 헤더의 Middle Component 중 게시판 이동을 기능을 가진 공통 컴포넌트
   Manage와 Chatting의 헤더에서 사용됨 */

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { colors } from '../../../styles/variables'


/* Styled Compoents */
/* 컴포넌트 전체 영역 */
const ComponentArea = styled.div`
    height: 4rem;
    flex: 1;
    padding-left: 2rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    color: ${colors.font_darkgray};
    font-size: 0.9375rem;
`; 

/* 세로 구분 선 */
const VirticleLine = styled.div`
    height: 2rem;
    width: 1px;
    background-color: ${colors.gray_line};

    margin-left: 3rem;
`;

/* 카테고리 이동 링크 텍스트 */
const CategoryLink = styled(Link)`
    margin-left: 3rem;
    
    text-decoration: none;
    color: ${colors.font_darkgray};
`;


/* react component */
const LinkCategory = ({categoryDatas}) => {
    return (
        <ComponentArea>
            게시판 이동
            <VirticleLine />
            {
                categoryDatas.map((data, idx) => {
                    const { url, text } = data
                    return <CategoryLink to={url} key={idx} >{text}</CategoryLink>
                })
            }
        </ComponentArea>
    )
}

LinkCategory.propTypes = {
    categoryDatas: PropTypes.array.isRequired,       // 카테고리 이름, url 이 담긴 Array 데이터
}

export default LinkCategory;