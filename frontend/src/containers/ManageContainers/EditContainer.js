// 상위 컴포넌트: /pages/manage.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Header } from '../../components/Manage/ManageStructure'
import Body from '../../components/Manage/ManageEdit'


class EditContainer extends Component {

    render() {
        return(
            <div>
                <Header isEdit={true} />
                <Body />
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

export default EditContainer;