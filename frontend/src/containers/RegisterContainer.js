import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import RegisterForm from "../components/Auth/Register/RegisterForm";
import { 
    getStatusRequest,
    registerRequest,
    loginRequest
} from "../store/actions/auth";

class RegisterContainer extends Component {

    componentDidMount() {
        this.props.getStatusRequest();
    }

    _renderRegister = () => {
        return (
            <RegisterForm 
                postRegister={this.props.registerRequest}
                postLogin={this.props.loginRequest}
                isSuccess={this.props.isSuccess}    
            />
        )
    }

    render() {
        return(
            <div>
                {
                    this.props.isLoggedIn ?
                    <Redirect to='/'/> :
                    this._renderRegister()
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        userInfo: state.auth.userInfo,
        isSuccess: state.auth.registerSuccess
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},
        registerRequest: (username, password) => {dispatch(registerRequest(username, password))},
        loginRequest: (username, password) => {dispatch(loginRequest(username, password))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);