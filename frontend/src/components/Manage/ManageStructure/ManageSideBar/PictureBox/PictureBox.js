import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../../styles/variables'

/* Styled Components */
const BoxArea = styled.div`

    margin-bottom: 2rem;
    padding: 1rem;

    width: 100%;
    height: 16rem;

    background-color: ${colors.white};
`;


class PictureBox extends Component {



    render () {
        return (
            <BoxArea>
                PictureBox
            </BoxArea>
        )
    }
}

export default PictureBox;