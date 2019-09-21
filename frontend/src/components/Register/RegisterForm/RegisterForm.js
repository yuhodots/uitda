import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import './RegisterForm.css';

class RegisterForm extends Component {

    state = {
        id: '',
        password: ''
    }

    _handleInput = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    _handleClick =  () => {
        this.props.postRegister(
            this.state.id,
            this.state.password
        );

        if (this.props.isSuccess) {
            this.prop.postLogin(
                this.state.id,
                this.state.password
            )
        }
    }

    render() {
        return (
            <div>

                {this.props.isSuccess && <Redirect to='/'/>}

                <h2>회원가입 페이지</h2>
                <p>
                    아이디
                    <input 
                        type='text' 
                        name='id'
                        onChange={this._handleInput}>
                    </input>
                </p>
                
                <p>
                    비밀번호 
                    <input 
                        type='password' 
                        name='password'
                        onChange={this._handleInput}>
                    </input>
                </p>
                
                <button onClick={this._handleClick}>회원가입</button>
            </div>
        )
    }
}

export default RegisterForm