// 상위 컴포넌트: ManageHeader


import React, { Component } from 'react';
import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom'


/* Styled Compoents */
const HeaderBox = styled.div`
    height: 4rem;
    line-height: 4rem;

    display: flex;
    flex-flow: row nowrap;
`; 


/* react component */
class EditComponent extends Component {

    render () {
        return (
            <HeaderBox>
            </HeaderBox>
        )
    }
}

EditComponent.propTypes = {
}

export default EditComponent;