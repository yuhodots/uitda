// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import { Header } from '../../components/Manage/ManageStructure'
import Body from '../../components/Manage/ManageEdit'

import { EditPostRequest } from '../../store/actions/manage'

class EditContainer extends Component {

    render() {

        const {
            EditPostRequest
        } = this.props;

        return(
            <div>
                <Header 
                    isEdit={true}                       // Edit 페이지 헤더임을 알려주는 props
                    EditPostRequest={EditPostRequest}
                />
                <Body 
                />
            </div>
        )
    }

}

EditContainer.propTypes = {
    isNew: PropTypes.bool,      // 새로 작성하는 것 인지
}

EditContainer.defaultProps = {
    isNew: false
}


const mapStateToProps = () => {

}

const mapDispatchToProps = (dispatch) => {
    return {
        EditPostRequest: (board, title, discription, files, id) => {
            dispatch(EditPostRequest(board, title, discription, files, id))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer);