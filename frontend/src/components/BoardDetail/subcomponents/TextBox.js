// 상위 컴포넌트: components/BoardDetail.js

import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
`;


const TextBox = ({title, user, created, condition, description, price}) => {

    return (
        <ContainerDiv>
            {title} {user.username} {created} {description}
        </ContainerDiv>
    )
}

export default TextBox;