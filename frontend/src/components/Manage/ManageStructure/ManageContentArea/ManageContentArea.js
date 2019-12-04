

import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

/* Styled Components */
const ContentArea = styled.div`

    margin: 0;
    padding: 2rem;

    height: 50rem;
    
    flex: 4;

    background-color: ${colors.white};
`;


class ManageContentArea extends Component {



    render () {
        return (
            <ContentArea>
                Hi, this is ____.
            </ContentArea>
        )
    }
}

export default ManageContentArea;