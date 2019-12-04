


import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

import {
    Sidebar, ContentArea
} from '../'

/* Styled Components */
const BodyArea = styled.div`
    min-height: 40rem;
    background-color: ${colors.gray_bg};
    margin: 0;
    
    padding: 2rem;

    display: flex;
    flex-flow: row nowrap;
`;


class ManageBody extends Component {


    render () {
        return (
            <BodyArea>
                <Sidebar>

                </Sidebar>
                <ContentArea>
                    
                </ContentArea>
            </BodyArea>
        )
    }
}

export default ManageBody;