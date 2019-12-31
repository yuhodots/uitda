

import React, { Component } from 'react';
import styled from 'styled-components';

import { colors } from '../../../../styles/variables'

/* Styled Components */
const TempDiv = styled.div`
    height: 20rem;
    line-height: 20rem;
    margin-bottom: 3rem;

    border: 2px dashed ${colors.gray_line};
    border-radius: 12px;

    text-align: center;
`


class EditTitle extends Component {

    render() {
        return (
            <TempDiv>
                Drop Zone
            </TempDiv>
        )
    }
}

export default EditTitle;