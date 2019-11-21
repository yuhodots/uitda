// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';


/* Styled Components */

const DescriptionArea = styled.div`
    padding: 2rem 1rem;
    margin-bottom: 2rem;

    font-size: 1.125rem;
`;


/* React Component */

const DescriptionBox = ({description}) => {

    return (
        <DescriptionArea>
            { description }
        </DescriptionArea>
    )
}

export default DescriptionBox;