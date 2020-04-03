

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PaperTemplate } from "../../../../styles/templates/manage";
import { EditTitle, DropZone, Description } from './Subcomponents'

/* Styled Components */

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

const EditBoard = ({ minHeight, title, storeTitleData, 
                     files, addFileData, deleteFileData,
                     description, storeDescriptionData }) => {

    return (
        <EditPaper minHeight={minHeight} >
            <EditTitle title={title} storeTitleData={storeTitleData} />
            <DropZone files={files} addFileData={addFileData} deleteFileData={deleteFileData} />
            <Description description={description} storeDescriptionData={storeDescriptionData} />
        </EditPaper>
    )
}

EditBoard.propTypes = {
    minHeight: PropTypes.number.isRequired,             // Edit Paper의 최소 높이 값

    title: PropTypes.string.isRequired,                 // Edit 페이지에서 작성한 Title 데이터
    files: PropTypes.array.isRequired,                  // Edit 페이지에서 업로드한 사진 데이터
    description: PropTypes.string.isRequired,           // Eidt 페이지에서 작성한 Description 데이터

    storeTitleData: PropTypes.func.isRequired,          // Title 데이터를 App State로 저장하는 함수
    addFileData: PropTypes.func.isRequired,             // Files 데이터를 App State로 저장하는 함수
    deleteFileData: PropTypes.func.isRequired,          // App State에 있는 파일 데이터 중 해당 파일을 지우는 함수
    storeDescriptionData: PropTypes.func.isRequired,    // Description 데이터를 App State로 저장하는 함수
}

export default EditBoard;