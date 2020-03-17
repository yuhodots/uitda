// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Modal } from 'antd'
import { withLastLocation } from 'react-router-last-location';
import { Redirect } from 'react-router-dom';

import { MARKET, NETWORKING, CARPOOL } from "../../constants/categories";
import { Header } from '../../components/Manage/ManageStructure'
import EditBody from '../../components/Manage/ManageEdit'
import { 
    initEditPage,
    selectEditCategory,
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
    storeCarpoolData,
    postCarpoolEvent,
} from '../../store/actions/manage'
import { initCalenderEvents, selectDate } from '../../store/actions/carpool'
import { getStatusRequest } from "../../store/actions/auth";


const { confirm } = Modal;

class EditContainer extends Component {

    state = { didMount: false }

    componentDidMount() {

        const {
            isNew,
            match,
            lastLocation,

            getStatusRequest,
            initEditPage,
            getPostRequest,
            selectEditCategory
        } = this.props;

        /* 첫 시작은 초기화부터 ! */
        initEditPage();
        getStatusRequest();

        /* 새 글인 경우 (create), last path를 통해 default 카테고리를 정함  */
        if(isNew) {
            const lastPath = lastLocation ? lastLocation.pathname : '';
            const defaultCategory = this._getDefaultCategoryForCreate(lastPath);

            console.log(lastPath)
            console.log(defaultCategory)

            selectEditCategory(defaultCategory);
        }

        /* 새 글 작성 아닌 경우 (update), get요청을 통해 update 이전 데이터 가져오기 + 카테고리 선택 */
        else {
            const {
                boardName, id
            } = match.params;

            getPostRequest(boardName, id);
            selectEditCategory(boardName);
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

        this.setState({
            didMount: true
        })
    }

    componentWillUnmount() {
        // window.removeEventListener("beforeunload", this._onUnload);
    }

    /* Create 시, pathname을 통해 default category 값을 반환하는 함수
       /manage/posts/networking -> NETWORKING
       /carpool                 -> CARPOOL
       나머지 모두               -> MARKET */
    _getDefaultCategoryForCreate = (pathname) => {

        switch (pathname) {
            case '/manage/posts/networking':
                return NETWORKING;

            case '/carpool':
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

        const { didMount } = this.state

        const {
            curUser,

            /* create / update 구분 props */
            isNew,
            match,
            
            /* App States */
            isEditGetSuccess,
            editCategory,

            title,
            files,
            deletedFileIDs,
            description,
            editSuccess,
            edit_spanStyle,
            edit_textAlign,
            selectedDate,
            eventsToRenderObj,
            roomInfoData,

            /* App Methods */
            EditPostRequest,
            selectEditCategory,
            storeEditTitleData,
            addFileData,
            deleteFileData,
            storeEditDescriptionData,
            editClickB,
            editClickI,
            editClickU,
            editClickS,
            editSelectTextAlign,
            initCalenderEvents,
            selectDate,
            storeCarpoolData,
            postCarpoolEvent
        } = this.props;

        const id = isNew ? 0 : match.params.id;

        /* 동기화 문제 해결
           create의 경우 init 완료되었음을 의미하는 isEditInit을,
           update의 경우 get 요청이 완료되었음을 의미하는 isEditGetSuccess를
           load가 완료되었는가의 boolean 값 isLoad로 이용함 */
        let isLoad = isNew ? didMount : isEditGetSuccess

        return(
            isLoad ?

                curUser ?
                <div>
                    <Header 
                        isEdit={true}                       // Edit 페이지 헤더임을 알려주는 props
                        isNew={isNew}                       // Create / Update 여부
                        editCategory={editCategory}         // 카테고리 선택 박스에 들어갈 게시판 정보 (default로도 사용됨)
                        id={id}                             // Update의 경우 해당 글의 id

                        title={title}                       // Edit 페이지에서 작성한 Title 데이터
                        files={files}                       // Edit 페이지에서 업로드한 사진 데이터
                        deletedFileIDs={deletedFileIDs}     // 수정 시, 삭제할 사진 id 리스트
                        description={description}           // Eidt 페이지에서 작성한 Description 데이터
                        editSuccess={editSuccess}           // Edit이 완료되었음을 알리는 데이터

                        edit_spanStyle={edit_spanStyle}     // BIUS 스타일 선택 정보
                        edit_textAlign={edit_textAlign}     // p태그 text align 속성

                        selectedDate={selectedDate}         // Carpool 탭에서 선택된 날짜 데이터
                        roomInfoData={roomInfoData}         // 카풀 방 정보

                        /* Methods */
                        selectEditCategory={selectEditCategory}
                        EditPostRequest={EditPostRequest}
                        editClickB={editClickB}
                        editClickI={editClickI}
                        editClickU={editClickU}
                        editClickS={editClickS}
                        editSelectTextAlign={editSelectTextAlign}

                        postCarpoolEvent={postCarpoolEvent}         // Carpool Event 등록하는 Post Action
                    />
                    <EditBody 
                        editCategory={editCategory}                         // Edit 카테고리

                        /* property */
                        title={title}                                       // Edit 페이지에서 작성한 Title 데이터
                        files={files}                                       // Edit 페이지에서 업로드한 사진 데이터
                        description={description}                           // Edit 페이지에서 작성한 Description 데이터

                        eventsObj={eventsToRenderObj}                       // 카풀 탭의 캘린더에 띄울 일정 데이터 객체
                        selectedDate={selectedDate}                         // Carpool 탭에서 선택된 날짜 데이터

                        /* methods */
                        storeTitleData={storeEditTitleData}
                        addFileData={addFileData}
                        deleteFileData={deleteFileData}
                        storeDescriptionData={storeEditDescriptionData}

                        initCalenderEvents={initCalenderEvents}             // 캘린더 첫 화면에서 띄울 events를 받는 액션
                        selectDate={selectDate}                             // Carpool 탭에서 날짜를 선택하는 메서드
                        storeCarpoolData={storeCarpoolData}
                    />
                </div> : 
                <Redirect to='/' /> :
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
        curUser: state.auth.user,                           // 현재 로그인 된 유저 정보

        isEditGetSuccess: state.manage.isEditGetSuccess,    // update 포스팅 데이터 받아졌는지 여부
        isEditInit: state.manage.isEditInit,                // Edit 페이지 초기화 완료 여부
        isModified: state.manage.isModified,                // 작성을 했는 지 여부
        editSuccess: state.manage.editSuccess,              // 작성 완료 정보
        editCategory: state.manage.editCategory,            // edit 카테고리 정보 (market, networking, carpool)

        title: state.manage.editedTitle,                    // Title Data
        files: state.manage.editedFiles,                    // File List Data
        deletedFileIDs: state.manage.deletedFileIDs,        // 삭제할 파일 ID 리스트
        description: state.manage.editedDescription,        // Description Data
        
        edit_spanStyle: state.manage.edit_spanStyle,        // BUIS 스타일 선택 데이터
        edit_textAlign: state.manage.edit_textAlign,        // p태그 text align 속성 값

        selectedDate: state.carpool.selectedDate,           // 카풀 탭에서 선택된 날짜 정보
        eventsToRenderObj: state.carpool.eventsToRenderObj, // 카풀 탭의 캘린더에 띄울 일정 데이터 객체
        roomInfoData: state.manage.carpool_RoomInfoData,    // 카풀 방 정보
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => dispatch(getStatusRequest()),                                   // 현재 유저 정보를 요청하는 액션

        initEditPage: () => {dispatch(initEditPage())},
        selectEditCategory: (category) => {dispatch(selectEditCategory(category))},             // edit 카테고리를 선택하는 메서드
        EditPostRequest: (board, title, discription, files, id, deletedFileIDs) => {
            dispatch(EditPostRequest(board, title, discription, files, id, deletedFileIDs))
        },
        getPostRequest: (board, id) => dispatch(getUpdatePostRequest(board, id)),

        storeEditTitleData: (title) => dispatch(storeEditTitleData(title)),
        addFileData: (file) => dispatch(addFileData(file)),
        deleteFileData: (file) => dispatch(deleteFileData(file)),
        storeEditDescriptionData: (description) => {
            dispatch(storeEditDescriptionData(description))
        },

        editClickB: () => dispatch(editClickB()),
        editClickI: () => dispatch(editClickI()),
        editClickU: () => dispatch(editClickU()),
        editClickS: () => dispatch(editClickS()),
        editSelectTextAlign: (textAlignAttr) => {
            dispatch(editSelectTextAlign(textAlignAttr))
        },

        /* Edit Carpool Actions */
        selectDate: (category, date) => dispatch(selectDate(category, date)),                   // carpool 탭에서 날짜를 선택하는 액션
        initCalenderEvents: (category) => dispatch(initCalenderEvents(category)),               // 캘린더 첫 화면에서 띄울 events를 받는 액션
        storeCarpoolData: (data_key, data_value) => {                                           // Carpool 탭의 Room Info Data를 담는 액션
            dispatch(storeCarpoolData(data_key, data_value))
        },
        postCarpoolEvent: (title, departure, destination, start_date, start_time, meeting_place, contact, description) => {         // Carpool Event 등록하는 Post Action
            dispatch(postCarpoolEvent(title, departure, destination, start_date, start_time, meeting_place, contact, description))
        }
    }
}

export default withLastLocation(connect(mapStateToProps, mapDispatchToProps)(EditContainer));