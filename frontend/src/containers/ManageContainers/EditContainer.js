// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Modal } from 'antd'
import { withLastLocation } from 'react-router-last-location';

import { MARKET, NETWORKING, CARPOOL } from "../../constants/board_name";
import { Header } from '../../components/Manage/ManageStructure'
import EditBody from '../../components/Manage/ManageEdit'
import { 
    initEditPage,
    setInitFalse,
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
    editSelectTextAlign,
} from '../../store/actions/manage'


const { confirm } = Modal;

class EditContainer extends Component {

    state = {}

    componentDidMount() {

        console.log(this.props.lastLocation);

        const {
            isNew,
            match,

            initEditPage,
            getPostRequest
        } = this.props;

        /* 첫 시작은 초기화부터 ! */
        initEditPage();

        /* 새 글 작성 (create) 아닌 경우, get요청을 통해 update 이전 데이터 가져오기 */
        if(!isNew) {
            const {
                boardName,
                id
            } = match.params;

            getPostRequest(boardName, id);
        }

        // window.onpopstate = (e) => {
        //     e.preventDefault();
        //     console.log(window.history)
        //     confirm({
        //         title: '페이지를 나가시겠습니까?',
        //         content: 'Ok 버튼을 누르면 작성한 내용이 모두 사라집니다.',
        //         onOk: () => { window.history.go(0) },
        //         onCancel: () => { window.history.forward() }
        //     }) 
        // }

        // console.log(window);

        // setInitFalse('왜우');

        // window.addEventListener("beforeunload", this._onUnload);
    }

    componentWillUnmount() {
        // window.removeEventListener("beforeunload", this._onUnload);
    }

    _getDefaultBoardForCreate = (pathname) => {
        
        switch (pathname) {
            case '/manage/posts/networking':
                return NETWORKING;

            case '/manage/mycarpool':
                return CARPOOL;

            /* /manage/posts/networking 을 포함해 모든 다른 주소도
               기본적으로 MARKET으로 이동 */
            default:
                return MARKET;
        }
    }

    _onUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
    }

    _onBackButton = (e) => {
        e.preventDefault();
        console.log(e);
        confirm({
            title: '페이지를 나가시겠습니까?',
            content: 'Ok 버튼을 누르면 작성한 내용이 모두 사라집니다.',
            onOk: () => { window.history.go(0) },
            onCancel: () => { window.history.forward() }
        }) 
    }


    render() {

        const {
            /* create / update 구분 props */
            isNew,
            match,
            lastLocation,

            /* App States */
            isEditGetSuccess,
            isEditInit,

            title,
            files,
            deletedFileIDs,
            description,
            editSuccess,
            edit_spanStyle,
            edit_textAlign,

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
            editSelectTextAlign,
        } = this.props;

        const id = isNew ? 0 : match.params.id;

        /* 새 글의 경우, 이전의 path 정보에서 board 값을 가져오고,
           update의 경우, 현재 url 정보에서 board 값을 가져올 수 있다. */
        
        const lastPath = lastLocation ? lastLocation.pathname : '';
        const defaultBoard = isNew ? 
        this._getDefaultBoardForCreate(lastPath) : match.params.boardName;

        /* 동기화 문제 해결
           create의 경우 init 완료되었음을 의미하는 isEditInit을,
           update의 경우 get 요청이 완료되었음을 의미하는 isEditGetSuccess를
           load가 완료되었는가의 boolean 값 isLoad로 이용함 */
        let isLoad = isNew ? isEditInit : isEditGetSuccess

        console.log(defaultBoard)

        return(
            isLoad ?
            <div>
                <Header 
                    isEdit={true}                       // Edit 페이지 헤더임을 알려주는 props
                    isNew={isNew}                       // Create / Update 여부
                    defaultBoard={defaultBoard}         // 카테고리 선택 박스에 default로 들어갈 게시판 정보
                    id={id}                             // Update의 경우 해당 글의 id

                    title={title}                       // Edit 페이지에서 작성한 Title 데이터
                    files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                    deletedFileIDs={deletedFileIDs}     // 수정 시, 삭제할 사진 id 리스트
                    description={description}           // Eidt 페이지에서 작성한 Description 데이터
                    editSuccess={editSuccess}           // Edit이 완료되었음을 알리는 데이터

                    edit_spanStyle={edit_spanStyle}     // BIUS 스타일 선택 정보
                    edit_textAlign={edit_textAlign}     // p태그 text align 속성

                    EditPostRequest={EditPostRequest}
                    editClickB={editClickB}
                    editClickI={editClickI}
                    editClickU={editClickU}
                    editClickS={editClickS}
                    editSelectTextAlign={editSelectTextAlign}
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
            </div> : 
            'loading'
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
        title: state.manage.editedTitle,                    // Title Data
        files: state.manage.editedFiles,                    // File List Data
        deletedFileIDs: state.manage.deletedFileIDs,        // 삭제할 파일 ID 리스트
        description: state.manage.editedDescription,        // Description Data

        isEditGetSuccess: state.manage.isEditGetSuccess,    // update 포스팅 데이터 받아졌는지 여부
        isEditInit: state.manage.isEditInit,                // Edit 페이지 초기화 완료 여부
        isModified: state.manage.isModified,                // 작성을 했는 지 여부
        editSuccess: state.manage.editSuccess,              // 작성 완료 정보
        edit_spanStyle: state.manage.edit_spanStyle,        // BUIS 스타일 선택 데이터
        edit_textAlign: state.manage.edit_textAlign,        // p태그 text align 속성 값
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initEditPage: () => {dispatch(initEditPage())},
        setInitFalse: () => {dispatch(setInitFalse())} ,
        EditPostRequest: (board, title, discription, files, id, deletedFileIDs) => {
            dispatch(EditPostRequest(board, title, discription, files, id, deletedFileIDs))
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
        editSelectTextAlign: (textAlignAttr) => {
            dispatch(editSelectTextAlign(textAlignAttr))
        }
    }
}

export default withLastLocation(connect(mapStateToProps, mapDispatchToProps)(EditContainer));