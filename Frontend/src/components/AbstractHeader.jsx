import React from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";


function AbstractHeader() {

    return (
            <header className="Absrtact-header">
                <text className="Header-text">Learn and create</text>
                <NavLink className="Reg" to='/registration'>
                    Регистрация
                </NavLink>
                <NavLink className="Enter" to='/login'>
                    Вход
                </NavLink>
            </header>
    );
}

export default AbstractHeader;