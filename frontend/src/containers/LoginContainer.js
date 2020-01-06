import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from "../components/Auth/Login/LoginForm";
import { 
    getStatusRequest,
    loginRequest 
} from "../store/actions/auth";

class LoginContainer extends Component {

    componentDidMount() {
        this.props.getStatusRequest();
    }

    render() {

        const { 
            isLoggedIn,
            loginRequest
        } = this.props

        return(
            isLoggedIn ?
            <Redirect to='/'/> :
            <LoginForm 
                loginRequest={loginRequest} 
                isLoggedIn={isLoggedIn}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userInfo: state.auth.userInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},
        loginRequest: (username, password) => {
            dispatch(loginRequest(username, password))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);