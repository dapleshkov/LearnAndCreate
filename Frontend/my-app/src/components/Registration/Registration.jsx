import React, {Component} from "react";
import "./Registration.css";
import user from "../States/Auth_Reducer";
import {login, singUp} from "../ServerAPI/serverAPI";

class SingUp extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    };

    handleSubmit = event => {
        event.preventDefault();

        let singupuser = {
            name: document.getElementById('name').value,
            email: document.getElementById('mail').value,
            username: document.getElementById('password2').value,
            password: document.getElementById('password1').value
        }
        singUp(singupuser).then(response => {
            if (response.data.success) {
                window.location.assign('http://localhost:3000/login')
            }
        });
    };

    render() {
        return (
            <div className="Registration">
                <form onSubmit={this.handleSubmit}>
                    <div className='Inf'>
                        <text>
                            Регистрация
                        </text>
                    </div>
                    <div>
                        <input className="Login" placeholder='Имя и фамилия' onChange={this.handleChange} id="name">
                        </input>
                    </div>
                    <div>
                        <input className="Login" placeholder='e-mail' onChange={this.handleChange} id="mail">
                        </input>
                    </div>
                    <div>
                        <input className='Password' type='password' placeholder='Пароль' onChange={this.handleChange}
                               id="password1">
                        </input>
                    </div>
                    <div>
                        <input className='Password' type='password' placeholder='Повторите пароль'
                               onChange={this.handleChange} id="password2">
                        </input>
                    </div>
                    <div>
                        <button className='Register'>
                            Зарегистрироваться
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SingUp;