import React, { Component } from "react";
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

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

const LoginButton = styled.a`
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
            user
        } = this.props;

        return (
            user ?
            <Redirect to='/' /> :
            <BackGround minHeight={windowHeight}>
                <Container>
                    <LoginButton href='http://localhost:3000/api/login/outlook' >로그인</LoginButton><br />
                    <HomeLink to='/'>홈으로</HomeLink>
                </Container>
            </BackGround>
        )
    }
}

LoginForm.propTypes = {
    user: PropTypes.oneOfType([         // 현재 유저 정보
        PropTypes.number,
        PropTypes.object
    ]).isRequired
}

export default LoginForm