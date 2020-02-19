

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { EditBoard, EditCarpool } from './EditComponents'
import { BGTemplate } from '../../../styles/templates/manage'
import { CARPOOL } from '../../../constants/board_name'

/* Styled Components */
/* 배경 스타일 div 태그 */
const BackGround = styled(BGTemplate)`
    padding-top: 4rem;
    min-height: ${props => {
        return `${props.minHeight}px`
    }};
`;

/* React Component */
class EditBody extends Component {

    state = {}

    componentDidMount() {
        window.addEventListener('resize', this._updateWindowSize);
        this._updateWindowSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._updateWindowSize);
    }

    _updateWindowSize = () => {
        this.setState({
            ...this.state,
            windowHeight: window.innerHeight
        })
    }

    render() {

        const { 
            windowHeight,
        } = this.state;

        const {
            editCategory,

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
            {
                editCategory === CARPOOL ?
                <EditCarpool /> :
                <EditBoard minHeight={windowHeight}
                    title={title} storeTitleData={storeTitleData}
                    files={files} addFileData={addFileData} deleteFileData={deleteFileData}
                    description={description} storeDescriptionData={storeDescriptionData}
                />
            }
            </BackGround>
        )
    }
}

EditBody.propTypes = {
    editCategory: PropTypes.string.isRequired,          // Edit Category
    
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