// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Header } from '../../components/Manage/ManageStructure'
import EditBody from '../../components/Manage/ManageEdit'

import { 
    initEditPage,
    getUpdatePostRequest,
    EditPostRequest,
    storeEditTitleData,
    addFileData,
    deleteFileData,
    storeEditDescriptionData,
    editClickB,
    editClickI,
    editClickU,
    editClickS,
} from '../../store/actions/manage'

class EditContainer extends Component {

    state = {}

    componentDidMount() {
        const {
            isNew,
            match,

            initEditPage,
            getPostRequest
        } = this.props;

        initEditPage();
        setTimeout(() => {
            this.setState({
                getSuccess: true
            })
        }, 50);

        if(!isNew) {
            const {
                boardName,
                id
            } = match.params;

            getPostRequest(boardName, id);
            
            /* 동기화 잘 쓰게 되면 수정할 것
               수정 권장: GetRequest에 success 여부를 앱 state에 저장하기 */
            setTimeout(() => {
                this.setState({
                    getSuccess: true
                })
            }, 50);
        }
    }

    render() {

        const { getSuccess } = this.state;

        const {
            /* create / update 구분 props */
            isNew,
            match,

            /* App States */
            title,
            files,
            description,
            editSuccess,
            edit_spanStyle,

            /* App Methods */
            EditPostRequest,
            storeEditTitleData,
            addFileData,
            deleteFileData,
            storeEditDescriptionData,
            editClickB,
            editClickI,
            editClickU,
            editClickS,
        } = this.props;

        const id = isNew ? 0 : match.params.id;
        const board = isNew ? '' : match.params.boardName;

        // console.log(`title: ${title}, description: ${description}`)

        return(
            (!getSuccess) ?
            'loading' : 
            <div>
                <Header 
                    isEdit={true}                       // Edit 페이지 헤더임을 알려주는 props
                    isNew={isNew}                       // Create / Update 여부
                    id={id}                             // Update의 경우 해당 글의 id
                    board={board}                       

                    title={title}                       // Edit 페이지에서 작성한 Title 데이터
                    files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                    description={description}           // Eidt 페이지에서 작성한 Description 데이터
                    editSuccess={editSuccess}           // Edit이 완료되었음을 알리는 데이터

                    edit_spanStyle={edit_spanStyle}          // BIUS 스타일 선택 정보

                    EditPostRequest={EditPostRequest}
                    editClickB={editClickB}
                    editClickI={editClickI}
                    editClickU={editClickU}
                    editClickS={editClickS}
                />
                <EditBody 
                    title={title}                       // Edit 페이지에서 작성한 Title 데이터
                    files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                    description={description}           // Eidt 페이지에서 작성한 Description 데이터

                    storeTitleData={storeEditTitleData}
                    addFileData={addFileData}
                    deleteFileData={deleteFileData}
                    storeDescriptionData={storeEditDescriptionData}
                />
            </div>
        )
    }

}

EditContainer.propTypes = {
    isNew: PropTypes.bool,      // 새로 작성하는 것 인지
    match: PropTypes.object,    // url 데이터를 가진 객체
}

EditContainer.defaultProps = {
    isNew: false,
    match: undefined,
}


const mapStateToProps = (state) => {
    return {
        title: state.manage.editedTitle,                // Title Data
        files: state.manage.editedFiles,                // File List Data
        description: state.manage.editedDescription,    // Description Data
        editSuccess: state.manage.editSuccess,          // 작성 완료 정보
        edit_spanStyle: state.manage.edit_spanStyle,    // BUIS 스타일 선택 데이터
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initEditPage: () => {dispatch(initEditPage())},
        EditPostRequest: (board, title, discription, files, id) => {
            dispatch(EditPostRequest(board, title, discription, files, id))
        },
        getPostRequest: (board, id) => dispatch(getUpdatePostRequest(board, id)),

        storeEditTitleData: (title) => dispatch(storeEditTitleData(title)),
        addFileData: (file) => dispatch(addFileData(file)),
        deleteFileData: (file) => dispatch(deleteFileData(file)),
        storeEditDescriptionData: (description) => dispatch(storeEditDescriptionData(description)),

        editClickB: () => dispatch(editClickB()),
        editClickI: () => dispatch(editClickI()),
        editClickU: () => dispatch(editClickU()),
        editClickS: () => dispatch(editClickS()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);