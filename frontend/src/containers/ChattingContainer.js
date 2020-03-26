

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getStatusRequest } from "../store/actions/auth";
import ChattingHeader from "../components/Chatting/ChattingHeader";
import ChattingBody from "../components/Chatting/ChattingBody";


class ChattingContainer extends Component {

    state = {}

    componentDidMount() {
        const { getStatusRequest } = this.props;

        getStatusRequest();
        this.setState({
            ...this.state,
            isLoaded: true
        })
    }


    render() {

        const { isLoaded } = this.state;
        const { curUser, isIndex } = this.props;


        return(
            isLoaded ?

                curUser ?

                <div style={{height: '100%', width: '100%'}}>
                    <ChattingHeader />
                    <ChattingBody isIndex={isIndex} />
                </div> :

                <Redirect to='/' /> :

            ''
        )
    }
}

ChattingContainer.propTypes = {
    isIndex: PropTypes.bool,        // index 페이지인지 아닌 지
}

ChattingContainer.defaultProps = {
    isIndex: false,
}


const mapStateToProps = (state) => {
    return {
        curUser: state.auth.user,           // 현재 유저 정보
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => dispatch(getStatusRequest()),           // 현재 유저 정보를 불러오는 request 액션
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ChattingContainer);