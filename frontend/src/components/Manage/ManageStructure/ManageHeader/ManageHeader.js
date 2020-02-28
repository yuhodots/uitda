

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Logo from '../../../Structure/CommonComponents/Logo';
import { colors } from '../../../../styles/variables'

import EditComponent from './EditComponent'
import DefaultCompoent from './DefaultComponent'


/* Styled Compoents */
const HeaderBox = styled.div`
    height: 4rem;
    background-color: ${colors.white};

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    /* border-bottom: 1px solid ${colors.gray_line}; */

    display: flex;
    flex-flow: row nowrap;
`; 


/* react component */
class ManageHeader extends Component {

    render () {

        const { 
            isEdit,
            isNew,
            id,
            editCategory,

            title,
            files,
            deletedFileIDs,
            description,
            editSuccess,

            edit_spanStyle,
            edit_textAlign,

            selectedDate,

            EditPostRequest,
            selectEditCategory,
            
            editClickB,
            editClickI,
            editClickU,
            editClickS,
            editSelectTextAlign,
        } = this.props;

        return (
            <HeaderBox>
                <Logo isWhite={false} />
                { 
                    isEdit ?

                    <EditComponent 
                        isNew={isNew}
                        id={id}
                        editCategory={editCategory}

                        title={title}
                        files={files}
                        deletedFileIDs={deletedFileIDs}
                        description={description}
                        editSuccess={editSuccess}

                        spanStyle={edit_spanStyle}
                        textAlign={edit_textAlign}

                        selectedDate={selectedDate}

                        EditPostRequest={EditPostRequest}
                        selectEditCategory={selectEditCategory}

                        editClickB={editClickB}
                        editClickI={editClickI}
                        editClickU={editClickU}
                        editClickS={editClickS}
                        selectTextAlign={editSelectTextAlign}
                    /> :

                    <DefaultCompoent />
                }
                {/* 유저, 알림, 메시지 */}
            </HeaderBox>
        )
    }
}

ManageHeader.propTypes = {
    isEdit: PropTypes.bool,                 // Edit header인지 아닌지

    /* Edit Header를 위한 props */
    isNew: PropTypes.bool,                  // Create / Update 여부
    editCategory: PropTypes.string,         // 카테고리 선택창의 기본 게시판 값
    id: PropTypes.number,                   // Update의 경우 해당 글의 id

    title: PropTypes.string,                // Title Data
    files: PropTypes.array,                 // Files Data
    deletedFileIDs: PropTypes.array,        // 수정 시, 삭제할 사진 id 리스트
    description: PropTypes.string,          // Description Data
    editSuccess: PropTypes.bool,            // 작성 완료를 알리는 데이터

    edit_spanStyle: PropTypes.object,       // BIUS 스타일 선택 정보
    edit_textAlign: PropTypes.string,       // p태그 text align 속섣값

    selectedDate: PropTypes.object,         // Carpool 탭에서 선택된 날짜 데이터

    /* Edit Header를 위한 Methods */
    EditPostRequest: PropTypes.func,        // Post Create / Update function
    selectEditCategory: PropTypes.func,     // 카테고리를 선택하는 메서드

    editClickB: PropTypes.func,
    editClickI: PropTypes.func,
    editClickU: PropTypes.func,
    editClickS: PropTypes.func,
    editSelectTextAlign: PropTypes.func,    // Text Align 속성값을 선택하는 함수
}

ManageHeader.defaultProps = {
    isEdit: false,

    /* Edit Header를 위한 props */
    isNew: true,
    defaultBoard: '',
    id: 0,
    board: '',

    title: '',            
    files: [],          
    deletedFileIDs: [],   
    description: '',
    editSuccess: false,

    edit_spanStyle: {},
    edit_textAlign: '',

    EditPostRequest: undefined,
    selectEditCategory: undefined,
    editSelectTextAlign: undefined,
}

export default ManageHeader;