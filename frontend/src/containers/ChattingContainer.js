

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getStatusRequest } from "../store/actions/auth";


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
        const { curUser } = this.props;


        return(
            isLoaded ?

                curUser ?

                <div>
                    chatting Container
                </div> :

                <Redirect to='/' /> :

            ''
        )
    }
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