import React, {Component} from 'react';
import './Authorization.css';
import {NavLink} from 'react-router-dom';
import {login} from "../ServerAPI/userAPI";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            usernameOrEmail:null,
            password:null
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        login(this.state).then(response => {
            localStorage.setItem('accessToken', response.accessToken);
            this.props.onLogin();
            window.location.assign('https://learning-app-client.herokuapp.com/mainpage')
        }).catch(error => {
            if (error.status === 401) {
                alert('Your Username or Password is incorrect. Please try again!');
            } else {
                alert('Sorry! Something went wrong. Please try again!');
            }
        });
    };

    handleChangeName = event => {
        this.setState({usernameOrEmail: event.target.value});
    };

    handleChangePassword = event => {
        this.setState({password: event.target.value});
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
                        <input className="Login" onChange={this.handleChangeName} id='login'>
                        </input>
                    </div>
                    <div>
                        <input className='Passwordi' type='password' onChange={this.handleChangePassword} id='pass'>
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