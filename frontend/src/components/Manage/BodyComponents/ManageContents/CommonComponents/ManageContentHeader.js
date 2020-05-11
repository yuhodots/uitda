

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { colors } from "../../../../../styles/variables";


/* 제목, 글 개수, 글쓰기 항목 담는 div 태그 */
const HeaderBox = styled.div`
    margin-bottom: 2rem;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
`;

    /* 좌측에 정렬될 Title, SubInfo를 감싸는 div 태그 */
    const TextBox = styled.div`
        display: flex;
        flex-flow: row nowrap;
        align-items: baseline;
    `;

        /* 관리 페이지 제목 */
        const Title = styled.div`
            font-size: 1.75rem;
        `;

        /* 추가 정보 */
        const SubInfo = styled.div`
            margin-left: 2rem;
            font-size: 1.125rem;
        `;

    /* 글 쓰기 버튼 */
    const CreateButton = styled(Link)`
        padding: 0.375rem 1rem;

        color: ${colors.font_gray};
        font-size: 0.875rem;

        background-color: ${colors.white};
        border: 1px solid ${colors.gray_line};

        cursor: pointer;
        :hover {
            color: ${colors.font_darkgray};
            box-shadow: 0 0 3px rgba(0,0,0,.2);
        }
    `;


/* React Component */
const ManageContentHeader = ({title, subInfo, hasCreatedButton}) => {

    return (
        <HeaderBox>
            <TextBox>
                <Title>{title}</Title>
                <SubInfo>{subInfo}</SubInfo>
            </TextBox>
            {
                hasCreatedButton &&
                <CreateButton to='/manage/edit/newpost' >글쓰기</CreateButton>
            }
        </HeaderBox>
    )
}

ManageContentHeader.propTypes = {
    title: PropTypes.string.isRequired,     // Title 내용
    subInfo: PropTypes.string,              // Sub Info 내용
    hasCreatedButton: PropTypes.bool,       // 글 생성 버튼이 필요한지
}

ManageContentHeader.defaultProps = {
    subInfo: '',
    hasCreatedButton: false,
}

export default ManageContentHeader;