import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";
import UserAccount from "../UserAccount/UserAccount";

class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }

    handleClickOut = event => {
        this.props.LogOut();
        window.location.assign('http://localhost:3000/mainpage');
    };

    render() {
        let menuItems;
        if (this.props.isAuthenticated) {
            menuItems = [
                <NavLink className="Logout" to="/mainpage" onClick={this.handleClickOut}>Выход</NavLink>,
                <NavLink className="Logout"  to="/">Личный кабинет</NavLink>,
            ];
        } else {
            menuItems = [
                <NavLink className="Reg" to='/registration'> Регистрация </NavLink>,
                <NavLink className="Enter" to='/login'>Вход</NavLink>,
            ];
        }
        return (
            <header className="Absrtact-header">
                <div className="Header-components">
                    <a className="Header-text" accessKey="/mainpage">LEARN AND CREATE</a>
                    {menuItems}
                </div>
            </header>
        )
    };
}

export default AbstractHeader;