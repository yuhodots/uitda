

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BoxHeaderArea, BoxHeaderTitle } from "../CommonComponents";


/* Styled Components */
const WholeArea = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
`;


/* React Component */
class ContectListBox extends Component {


    render() {

        return(
            <WholeArea>
                <BoxHeaderArea>
                    <BoxHeaderTitle>채팅방</BoxHeaderTitle>
                </BoxHeaderArea>
            </WholeArea>
        )
    }
}

ContectListBox.propTypes = {
    opntID: PropTypes.number.isRequired,    // Opponent ID. 채팅 상대방 ID
}

export default ContectListBox;