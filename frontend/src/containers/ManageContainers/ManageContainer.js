// 상위 컴포넌트: pages/manage.js


import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Components */
import {
    Header, Body,
} from '../../components/Manage/ManageStructure'



class ManageContainer extends Component {

    render() {


        return(
            <div>
                <Header isEdit={false} />
                <Body>
                </Body>
            </div>
        )
    }

}

ManageContainer.propTypes = {
    match: PropTypes.object.isRequired,     // url을 통해 주는 정보.
}

export default ManageContainer;