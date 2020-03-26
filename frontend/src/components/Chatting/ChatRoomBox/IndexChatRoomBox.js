

import React from 'react';
import styled from 'styled-components';


/* Styled Components */
const WholeBox = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;


/* React Component */
const IndexChatRoomBox = () => {

    return (
        <WholeBox>
            채팅룸 index
        </WholeBox>
    )
}


export default IndexChatRoomBox;