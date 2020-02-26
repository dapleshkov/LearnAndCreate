import React, {Component} from "react";
import './AbstractHeader.css'
import {BrowserRouter, NavLink, Route} from "react-router-dom";
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
            let pathToUser = "/users/" + this.props.user.username;
            menuItems = [
                <nav className="dropDownMenu">
                    <ul className="topmenu">
                        <li>
                            <img className="ico" src="http://cdn.onlinewebfonts.com/svg/img_51324.png" alt="ico"></img>
                            <a className="maina" href="#">{this.props.user.username}</a>
                            <ul className="submenu">
                                <li className="item"><a href={`/users/${this.props.user.username}`}>Личный кабинет</a></li>
                                <li className="item"><a href="/settings">Настройки</a></li>
                                <li className="item"><a href="/mainpage" onClick={this.handleClickOut}>Выход</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            ];
        } else {
            menuItems = [
                <NavLink className="Reg" to='/registration'> Регистрация </NavLink>,
                <NavLink className="Enter" to='/login'>Вход</NavLink>
            ];
        }
        return (
            <header className="Abstract-header">
                <div className="Header-components">
                    {menuItems}
                    <a className="Header-text" href="/mainpage">LEARN AND CREATE</a>
                </div>
            </header>
        )
    };
}

export default AbstractHeader;