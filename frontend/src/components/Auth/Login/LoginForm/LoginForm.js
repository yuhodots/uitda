import React, { Component } from "react";
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

import { colors } from '../../../../styles/variables'

/* Styled Components */
const BackGround = styled.div`
    min-height: ${props => {
        return `${props.minHeight}px`
    }};
    width: 100%;
    background-color: ${colors.gray_bg};

    display: flex;
    justify-content: center;
    align-items: center;
`;

/*  */
const Container = styled.div`
    width: 20rem;
    padding: 2rem;

    background-color: ${colors.white};
`;

const LoginButton = styled.div`
    cursor: pointer;
`;

const HomeLink = styled(Link)`

`;


class LoginForm extends Component {

    state = {}

    componentDidMount () {
        const windowHeight = window.innerHeight;

        this.setState({
            ...this.state,
            windowHeight
        })
    }

    render() {

        const {
            windowHeight
        } = this.state;

        const {
            loginRequest,
            isLoggedIn
        } = this.props;

        return (
            isLoggedIn ?
            <Redirect to='/' /> :
            <BackGround minHeight={windowHeight}>
                <Container>
                    <LoginButton onClick={loginRequest} >로그인</LoginButton>
                    <HomeLink to='/'>홈으로</HomeLink>
                </Container>
            </BackGround>
        )
    }
}

export default LoginForm