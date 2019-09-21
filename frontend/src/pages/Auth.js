import React from "react";

import LoginContainer from "../containers/LoginContainer";
import RegisterContainer from "../containers/RegisterContainer";
import NotFound from './NotFound';

const Auth = ({match}) => {

    switch (match.params.kind) {
        case 'login':
            return (
                <LoginContainer/>
            )
    
        case 'register':
            return (
                <RegisterContainer/>
            )

        default:
            return (
                <NotFound/>
            )
    }
}

export default Auth;