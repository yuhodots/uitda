

import React, { Component } from 'react';
import styled from 'styled-components';

import {colors} from '../../../../styles/variables'

import ErrorPage from '../../ManageContents/ErrorPage'
import ManagePost from '../../ManageContents/ManagePost'


/* Styled Components */
const ContentBox = styled.div`

    margin: 0;
    padding: 2rem;

    height: 50rem;
    
    flex: 4;

    background-color: ${colors.white};
`;


class ManageContentBox extends Component {



    render () {

        const {
            err,
            // kind, 
            // board,

            postList
        } = this.props
    
        return (
            <ContentBox>
                {
                    err ?
                    <ErrorPage /> :
                    <ManagePost 
                        postList={postList}
                    />
                }
            </ContentBox>
        )
    }
}

export default ManageContentBox;