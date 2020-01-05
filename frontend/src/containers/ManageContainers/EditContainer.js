// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Header } from '../../components/Manage/ManageStructure'
import EditBody from '../../components/Manage/ManageEdit'

import { 
    getUpdatePostRequest,
    EditPostRequest,
    storeEditTitleData,
    storeEditFileData,
    storeEditDescriptionData,
} from '../../store/actions/manage'

class EditContainer extends Component {

    state = {}

    componentDidMount() {
        const {
            isNew,
            match,

            getPostRequest
        } = this.props;

        if(!isNew) {
            const {
                boardName,
                id
            } = match.params;

            getPostRequest(boardName, id);
            
            /* 동기화 잘 쓰게 되면 수정할 것 */
            setTimeout(() => {
                this.setState({
                    getSuccess: true
                })
            }, 100);
        }
    }

    render() {

        const { getSuccess } = this.state;

        const {
            isNew,

            /* App States */
            title,
            files,
            description,
            editSuccess,

            /* App Methods */
            EditPostRequest,
            deletePostRequest,
            storeEditTitleData,
            storeEditFileData,
            storeEditDescriptionData
        } = this.props;

        // console.log(`title: ${title}, description: ${description}`)

        return(
            (!isNew && !getSuccess) ?
            'loading' : 
            <div>
                <Header 
                    isEdit={true}                       // Edit 페이지 헤더임을 알려주는 props
                    title={title}                       // Edit 페이지에서 작성한 Title 데이터
                    files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                    description={description}           // Eidt 페이지에서 작성한 Description 데이터
                    editSuccess={editSuccess}           // Edit이 완료되었음을 알리는 데이터

                    EditPostRequest={EditPostRequest}
                />
                <EditBody 
                    title={title}                       // Edit 페이지에서 작성한 Title 데이터
                    files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                    description={description}           // Eidt 페이지에서 작성한 Description 데이터

                    storeTitleData={storeEditTitleData}
                    storeFilesData={storeEditFileData}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        EditPostRequest: (board, title, discription, files, id) => {
            dispatch(EditPostRequest(board, title, discription, files, id))
        },
        getPostRequest: (board, id) => dispatch(getUpdatePostRequest(board, id)),

        storeEditTitleData: (title) => dispatch(storeEditTitleData(title)),
        storeEditFileData: (files) => dispatch(storeEditFileData(files)),
        storeEditDescriptionData: (description) => dispatch(storeEditDescriptionData(description)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);