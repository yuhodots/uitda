import React, { Component } from "react";
import './LoginForm.css';

class LoginForm extends Component {

    state = {
        id: '',
        password: ''
    }

    _handleInput = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    _handleClick = () => {
        this.props.postLoginData(
            this.state.id,
            this.state.password
        )
    }

    render() {
        return (
            <div>
                <h2>로그인 페이지</h2>
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
                
                <button onClick={this._handleClick}>로그인</button>
            </div>
        )
    }
}

export default LoginForm