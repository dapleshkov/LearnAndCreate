import React, {Component} from 'react';
import './Authorization.css';
import {NavLink} from 'react-router-dom';
import {login} from "../ServerAPI/serverAPI";
import {loadUser} from "../States/Auth_Reducer";


class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = event => {
        event.preventDefault();
        let user={
            usernameOrEmail : document.getElementById('login').value,
        password:document.getElementById('pass').value
        };
        login(user).then(response => {
            localStorage.setItem('accessToken', response.accessToken);
            this.props.onLogin();
            window.location.assign('http://localhost:3000/mainpage')
        }).catch(error => {
            if (error.status === 401) {
                alert('Your Username or Password is incorrect. Please try again!');
            } else {
                alert('Sorry! Something went wrong. Please try again!');
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