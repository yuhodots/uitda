

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BaseHeader from "../Structure/BaseHeader";
import EditHeaderComponent from "./EditHeaderComponent";


/* React Component */
class EditHeader extends Component {

    _renderMiddleComponent = () => {
        
        const {
            editCategory,
            isNew, id,
            editSuccess,

            title, files, deletedFileIDs, description,
            selectedDate, roomInfoData,

            selectEditCategory,
            EditPostRequest,
            postCarpoolEvent,
        } = this.props
        
        return (
            <EditHeaderComponent 
                editCategory={editCategory}
                isNew={isNew} id={id}
                editSuccess={editSuccess}
            
                title={title} files={files}
                deletedFileIDs={deletedFileIDs}
                description={description}

                selectedDate={selectedDate}
                roomInfoData={roomInfoData}

                /* Methods */
                selectEditCategory={selectEditCategory}
                EditPostRequest={EditPostRequest}
                postCarpoolEvent={postCarpoolEvent}
            />
        )
    }

    render() {
        return (
            <BaseHeader
                isBGWhite={true}
                MiddleComponent={this._renderMiddleComponent}
                doesNeedUserBadge={false}
            />
        )
    }
}


EditHeader.propTypes = {
    isNew: PropTypes.bool.isRequired,               // Create / Update 여부
    editCategory: PropTypes.string.isRequired,      // 카테고리 선택 박스에 들어갈 게시판 정보 (default로도 사용됨)
    id: PropTypes.number.isRequired,                // Update의 경우 해당 글의 id
    editSuccess: PropTypes.bool.isRequired,         // Edit이 완료되었음을 알리는 데이터

    title: PropTypes.string,                        // Edit 페이지에서 작성한 Title 데이터
    files: PropTypes.array,                         // Edit 페이지에서 업로드한 사진 데이터
    deletedFileIDs: PropTypes.array,                // 수정 시, 삭제할 사진 id 리스트
    description: PropTypes.string,                  // Edit 페이지에서 작성한 Description 데이터

    selectedDate: PropTypes.object,                 // Carpool 탭에서 선택된 날짜 데이터
    roomInfoData: PropTypes.object,                 // 카풀 방 정보

    /* 메서드 */
    selectEditCategory: PropTypes.func.isRequired,  // 카테고리를 선택하는 메서드
    EditPostRequest: PropTypes.func.isRequired,     // Board 작성 내용을 POST 요청 보내는 메서드

    postCarpoolEvent: PropTypes.func.isRequired,    // Carpool Event 등록하는 Post Action
}

EditHeader.defaultProps = {
    title: '',
    files: [],
    deletedFileIDs: [],
    description: '',

    selectedDate: new Date(),
    roomInfoData: {},
}


export default EditHeader;