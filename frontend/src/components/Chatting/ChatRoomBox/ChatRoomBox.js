

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BoxHeaderArea, BoxHeaderTitle } from "../CommonComponents";


/* Styled Components */
const WholeBox = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
`;


/* React Component */
class ChatRoomBox extends Component {


    render() {



        return (
            <WholeBox>
                <BoxHeaderArea>
                    <BoxHeaderTitle>ㅇ</BoxHeaderTitle>
                </BoxHeaderArea>
            </WholeBox>
        )
    }
}

ChatRoomBox.propTypes = {
    opntID: PropTypes.number.isRequired,    // Opponent ID. 채팅 상대방 ID
}

export default ChatRoomBox;