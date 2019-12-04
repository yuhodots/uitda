

import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import { colors } from '../../../../styles/variables'
import logoImg from '../../../../styles/images/logo-color.png'

import EditComponent from './EditComponent'
import DefaultCompoent from './DefaultComponent'


/* Styled Compoents */
const HeaderBox = styled.div`
    height: 4rem;
    background-color: ${colors.white};
    line-height: 4rem;

    display: flex;
    flex-flow: row nowrap;
`; 

const HomeLink = styled(Link)`
    height: 4rem;
    width: 4.5rem;
    margin: 0 3rem;

    background-image: ${`url(${logoImg})`};
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
`


/* react component */
class ManageHeader extends Component {

    render () {

        const { isEdit } = this.props;

        return (
            <HeaderBox>
                <HomeLink to='/'></HomeLink>
                { 
                    isEdit ?
                    <EditComponent /> :
                    <DefaultCompoent />
                }
                {/* 유저, 알림, 메시지 */}
            </HeaderBox>
        )
    }
}

ManageHeader.propTypes = {
    isEdit: PropTypes.bool.isRequired,      // 에디터형의 header인지 아닌지
}

export default ManageHeader;