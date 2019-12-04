import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../../styles/variables'

/* Styled Components */
const BoxArea = styled.div`

    margin: 0;
    padding: 1rem;

    width: 100%;
    height: 32rem;

    background-color: ${colors.white};
`;



class CategoryBox extends Component {



    render () {
        return (
            <BoxArea>
                CategoryBox
            </BoxArea>
        )
    }
}

export default CategoryBox;