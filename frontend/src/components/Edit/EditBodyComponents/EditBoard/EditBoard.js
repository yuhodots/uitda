

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PaperTemplate } from "../../../../styles/templates/manage";
import { EditTitle, EditPrice, DropZone, Description } from './Subcomponents'
import { MARKET } from '../../../../constants/categories';
import { Screen_Size } from "../../../../styles/variables";


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

    @media (max-width: ${Screen_Size.edit_paper_max_width}) {
        width: 100%;
        min-width: 40rem;
    }
`;

/* React Component */

const EditBoard = (props) => {

    const { 
        minHeight, editCategory, 
        editBoardData, 
        storeBoardData,
        addFileData, deleteFileData 
    } = props;

    const { title, price, files, description } = editBoardData

    return (
        <EditPaper minHeight={minHeight} >
            <EditTitle title={title} storeBoardData={storeBoardData} isMarket={editCategory === MARKET} />
            {
                editCategory === MARKET &&
                <EditPrice price={price} storeBoardData={storeBoardData} />
            }
            <DropZone files={files} addFileData={addFileData} deleteFileData={deleteFileData} />
            <Description description={description} storeBoardData={storeBoardData} />
        </EditPaper>
    )
}

EditBoard.propTypes = {
    minHeight: PropTypes.number.isRequired,             // Edit Paper의 최소 높이 값
    editCategory: PropTypes.string.isRequired,          // Edit Category
    editBoardData: PropTypes.object.isRequired,         // Edit Board Data

    storeBoardData: PropTypes.func.isRequired,          // Edit Board 데이터를 App State로 저장하는 함수
    addFileData: PropTypes.func.isRequired,             // Files 데이터를 App State로 저장하는 함수
    deleteFileData: PropTypes.func.isRequired,          // App State에 있는 파일 데이터 중 해당 파일을 지우는 함수
}

export default EditBoard;