import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from "../components/Login/LoginForm";
import { 
    getStatusRequest,
    loginRequest 
} from "../store/actions/auth";

class LoginContainer extends Component {

    componentDidMount() {
        this.props.getStatusRequest();
    }

    _renderLogin = () => {
        return (
            <div>
                <LoginForm postLoginData={this.props.loginRequest}/>
                <Link to="/auth/register">회원가입</Link>
            </div>
            
        )
    }

    render() {

        return(
            <div>
                {
                    this.props.isLoggedIn ?
                    <Redirect to='/'/> :
                    this._renderLogin()
                }
            </div>
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