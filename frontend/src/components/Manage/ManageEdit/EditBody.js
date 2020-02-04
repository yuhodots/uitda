

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
    padding-top: 4rem;
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
    padding-bottom: 5rem;

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

        const { 
            windowHeight,
        } = this.state;

        const {
            title,
            files,
            description,

            storeTitleData,
            addFileData,
            deleteFileData,
            storeDescriptionData,
        } = this.props;

        return (
            <BackGround minHeight={windowHeight} >
                <EditPaper minHeight={windowHeight}>
                    <Title title={title} storeTitleData={storeTitleData} />
                    <DropZone files={files} addFileData={addFileData} deleteFileData={deleteFileData} />
                    <Description description={description} storeDescriptionData={storeDescriptionData} />
                </EditPaper>
            </BackGround>
        )
    }
}

EditBody.propTypes = {
    title: PropTypes.string,                            // Edit 페이지에서 작성한 Title 데이터
    files: PropTypes.array,                             // Edit 페이지에서 업로드한 사진 데이터
    description: PropTypes.string,                      // Eidt 페이지에서 작성한 Description 데이터

    storeTitleData: PropTypes.func.isRequired,          // Title 데이터를 App State로 저장하는 함수
    addFileData: PropTypes.func.isRequired,             // Files 데이터를 App State로 저장하는 함수
    deleteFileData: PropTypes.func.isRequired,          // App State에 있는 파일 데이터 중 해당 파일을 지우는 함수
    storeDescriptionData: PropTypes.func.isRequired,    // Description 데이터를 App State로 저장하는 함수
}

EditBody.defaultProps = {
    title: '',                            
    files: [],                             
    description: '',
}

export default EditBody;