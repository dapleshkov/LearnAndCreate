import React from "react";
import "./Registration.css";

function Registration() {
    return (
        <div className="Registration">
            <div className='Inf'>
                <text>
                    Регистрация
                </text>
            </div>
            <div>
                <input className="Login" placeholder='Имя и фамилия' name='name'>
                </input>
            </div>
            <div>
                <input className="Login" placeholder='e-mail' name='login'>
                </input>
            </div>
            <div>
                <input className='Password' type='password' placeholder='Пароль' name='pass'>
                </input>
            </div>
            <div>
                <input className='Password' type='password' placeholder='Повторите пароль' name='pass'>
                </input>
            </div>
            <div>
                <button className='Register'>
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );
}

export default Registration;