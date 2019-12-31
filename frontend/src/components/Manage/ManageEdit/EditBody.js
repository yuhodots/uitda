import React, { Component } from 'react';
import styled from 'styled-components';

import {
    Title,
    DropZone,
    Description
} from './EditComponents'

import { 
    BGTemplate,
    PaperTemplate
} from '../../../styles/templates/manage'

/* Styled Components */
/* 배경 스타일 div 태그 */
const BackGround = styled(BGTemplate)`
    min-height: ${props => {
        return `${props.minHeight - 64}px`      // 64는 Header의 높이
    }};
`;

/* 글 작성하는 공간의 태그 */
const EditPaper = styled(PaperTemplate)`
    min-height: ${props => {
        return `${props.minHeight - 64}px`      // 64는 Header의 높이
    }};
    margin: 0 auto;
    width: 55rem;
    min-width: 40rem;
    padding: 3rem 4rem;

    display: flex;
    flex-flow: column nowrap;
`;


/* React Component */
class EditBody extends Component {

    state = {}

    componentDidMount() {
        let windowHeight = window.innerHeight;
        this.setState({
            ...this.state,
            windowHeight
        })
    }

    render() {

        const { windowHeight } = this.state;

        return (
            <BackGround minHeight={windowHeight} >
                <EditPaper minHeight={windowHeight}>
                    <Title />
                    <DropZone />
                    <Description />
                </EditPaper>
            </BackGround>
        )
    }
}

export default EditBody;