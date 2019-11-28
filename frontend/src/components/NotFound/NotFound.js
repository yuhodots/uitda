// 상위 컴포넌트: pages/NotFound.js, BoardDetailContainer.js

/* 404 NotFound 페이지 스타일 컴포넌트 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* styled components */
const NotFoundArea = styled.div`
    margin: 0 auto;
    margin-top: 10rem;
`;


const NotFound = () => {

    return (
        <NotFoundArea>
            <h2>Page Not Found.</h2>
            <p>잘못된 url 접근입니다.</p>
            <br/><br/>
            <Link to='/'>홈으로</Link>
        </NotFoundArea>
    )
}

export default NotFound;