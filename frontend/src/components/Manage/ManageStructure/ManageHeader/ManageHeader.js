

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

    position: relative;
    z-index: 100;
    box-shadow: 0 0 5px rgba(0,0,0,.05);
    /* border-bottom: 1px solid ${colors.gray_line}; */

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

        const { 
            isEdit,
            isNew,
            id,
            board,

            title,
            files,
            description,
            editSuccess,

            EditPostRequest
        } = this.props;

        return (
            <HeaderBox>
                <HomeLink to='/'></HomeLink>
                { 
                    isEdit ?
                    <EditComponent 
                        isNew={isNew}
                        id={id}
                        defaultBoard={board}

                        title={title}
                        files={files}
                        description={description}
                        editSuccess={editSuccess}

                        EditPostRequest={EditPostRequest}
                    /> :
                    <DefaultCompoent />
                }
                {/* 유저, 알림, 메시지 */}
            </HeaderBox>
        )
    }
}

ManageHeader.propTypes = {
    isEdit: PropTypes.bool,             // Edit header인지 아닌지

    /* Edit Header를 위한 props */
    isNew: PropTypes.bool,              // Create / Update 여부
    id: PropTypes.number,               // Update의 경우 해당 글의 id
    board: PropTypes.string,

    title: PropTypes.string,            // Title Data
    files: PropTypes.array,             // Files Data
    description: PropTypes.string,      // Description Data
    editSuccess: PropTypes.bool,        // 작성 완료를 알리는 데이터

    EditPostRequest: PropTypes.func,    // Post Create / Update function
}

ManageHeader.defaultProps = {
    isEdit: false,

    /* Edit Header를 위한 props */
    isNew: true,
    id: 0,

    title: '',            
    files: [],             
    description: '',
    editSuccess: false,

    EditPostRequest: undefined,
}

export default ManageHeader;