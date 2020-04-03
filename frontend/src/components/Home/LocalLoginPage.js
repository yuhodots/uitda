

import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Input, Button } from "antd";
import axios from "axios";
import qs from "qs";

import { colors } from "../../styles/variables";


const LoginForm = styled.div`
    margin: 0 auto;    
    padding: 2rem;
    width: 500px;
    height: 400px;

    background-color: ${colors.gray_bg};

    display: flex;
    flex-flow: column nowrap;
    /* align-items: center; */
    justify-content: center;
`;

    const FormTitle = styled.div`
        margin-bottom: 1.5rem;
        
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
    `;

    const InputBox = styled.div`
        /* margin: 0.5rem 0; */
        margin-bottom: 1rem;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;
    `;

        const InputTitle = styled.div`
            width: 7rem;
        `;


class LocalLogin extends Component {

    state = {
        username: '',
        email: ''
    }

    _storeInputData = (input_key, value) => {
        for ( let key in this.state ) {
            if ( key === input_key ) {
                let newState = this.state;
                newState[key] = value;
                this.setState(newState)
            }
        }
    }

    _handleSubmit = () => {
        const { username, email } = this.state;

        const POSTurl = '/api/login';
        const reqBody = {username, email};
        const config = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }

        return axios.post(POSTurl, qs.stringify(reqBody), config)
        .then(res => {
            this.setState({
                ...this.state,
                isLoggedIn: true
            })
        })
    }

    render() {

        const { isLoggedIn } = this.state

        return isLoggedIn ?
            <Redirect to='/' /> :
            <LoginForm>
                <FormTitle> Local Login </FormTitle>

                <InputBox>
                    <InputTitle>username</InputTitle>
                    <Input onChange={e => this._storeInputData('username', e.target.value)} />
                </InputBox>
                <InputBox>
                    <InputTitle>email</InputTitle>
                    <Input onChange={e => this._storeInputData('email', e.target.value)} />
                </InputBox>
                <Button type='primary' onClick={this._handleSubmit} >로그인</Button>
            </LoginForm>
        
    }
}

export default LocalLogin;