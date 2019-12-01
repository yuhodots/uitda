


import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

/* Styled Components */
const BodyArea = styled.div`
    min-height: 40rem;
    background-color: ${colors.gray_bg};
    margin: 0;
    
    padding: 2rem;
`;


class ManageBody extends Component {


    render () {
        return (
            <BodyArea>
                Hi, Body
            </BodyArea>
        )
    }
}

export default ManageBody;