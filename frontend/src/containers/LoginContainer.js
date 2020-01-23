import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from "../components/Auth/Login/LoginForm";
import { 
    getStatusRequest,
} from "../store/actions/auth";

class LoginContainer extends Component {

    componentDidMount() {
        this.props.getStatusRequest();
    }

    render() {

        const { 
            user,
        } = this.props

        return(
            user ?
            <Redirect to='/'/> :
            <LoginForm 
                user={user}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getStatusRequest: () => {dispatch(getStatusRequest())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);