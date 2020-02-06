import React, {Component} from 'react';
import './Authorization.css';
import {NavLink} from 'react-router-dom';
import user from "../States/Auth_Reducer"
import {login} from "../ServerAPI/serverAPI";


class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = event => {
        event.preventDefault();
        user.usernameOrEmail = document.getElementById('login').value;
        user.password = document.getElementById('pass').value;
        login().then(response => {
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.accessToken);
                user.isAuthenticated = true;
                alert(user.isAuthenticated);
                window.location.assign('http://localhost:3000/mainpage')
            } else {
                if (response.status === 401) {
                    alert('Your Username or Password is incorrect. Please try again!');
                } else {
                    alert('Sorry! Something went wrong. Please try again!');
                }
            }
        });
    };

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    render() {
        return (
            <div className="Autofication">
                <form onSubmit={this.handleSubmit}>
                    <div className='Inf'>
                        <text id="message">
                            Вход
                        </text>
                    </div>
                    <div>
                        <input className="Login" onChange={this.handleChange} id='login'>
                        </input>
                    </div>
                    <div>
                        <input className='Password' type='password' onChange={this.handleChange} id='pass'>
                        </input>
                    </div>
                    <div>
                        <NavLink className='ForgetPassword' to='/refactoraccount'>
                            Забыли пaроль?
                        </NavLink>
                    </div>
                    <div>
                        <button type="submit" className='Check'>
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}


export default Login;