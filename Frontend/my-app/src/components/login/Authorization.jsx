import React, {Component} from 'react';
import './Authorization.css';
import {Link, NavLink} from 'react-router-dom';
import {loggin} from "../Helpers";
import user from "../States/Auth_Reducer"
import * as axios from "axios";


class Login extends Component {
    constructor(props) {
        super(props);
    }



    logrefactor = () => {
        user.usernameOrEmail = document.getElementById('login').value;
        user.password = document.getElementById('pass').value;
        axios.default.post('http://localhost:8080/api/auth/signin', user).then(response => {
            if(response.status===200){
                alert("cool")
            }
            else{
                if(response.status===401)
                {
                    alert('Wrong in login or password');
                }
                else{
                    alert("Something went wrong");
                }
            }
        });
    };

    render() {
        return (
            <div className="Autofication">
                <div className='Inf'>
                    <text>
                        Вход
                    </text>
                </div>
                <div>
                    <input className="Login" placeholder='Логин' id='login'>
                    </input>
                </div>
                <div>
                    <input className='Password' type='password' placeholder='Пароль' id='pass'>
                    </input>
                </div>
                <div>
                    <NavLink className='ForgetPassword' to='/refactoraccount'>
                        Забыли пaроль?
                    </NavLink>
                </div>
                <div>
                    <button className='Check' onClick={this.logrefactor}>
                        Войти
                    </button>
                </div>
            </div>
        );
    }
}


export default Login;