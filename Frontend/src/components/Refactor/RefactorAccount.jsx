import React from "react";
import "./RefactorAccount.css"

function RefactorAccout() {
    return (
        <div className="Refactor">
            <div className='Inf'>
                <text>
                    Введите ваш e-mail<br></br>
                    и мы пришлем ссылку для восстановления пароля
                </text>
            </div>
            <div>
                <input className="Login" placeholder='e-mail' name='login'>
                </input>
            </div>
            <div>
                <button className='Refactor-button'>
                    Сбросить пароль
                </button>
            </div>
        </div>);
}

export default RefactorAccout;