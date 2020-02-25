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
                <nav className="dropDownMenu">
                    <ul className="topmenu">
                        <li><a href="#">{this.props.user.username}</a>
                            <ul className="submenu">
                                <li><a href="/users/">Личный кабинет</a></li>
                                <li><a href="/mainpage" onClick={this.handleClickOut}>Выход</a></li>
                                {/*<NavLink className="toProfile" to="/users/">Личный кабинет</NavLink>*/}
                                {/*<NavLink className="Logout" to="/mainpage" onClick={this.handleClickOut}>Выход</NavLink>*/}
                            </ul>
                        </li>
                    </ul>
                </nav>
                // <NavLink className="Logout" to="/mainpage" onClick={this.handleClickOut}>Выход</NavLink>,
                // <NavLink className="Logout"  to="/">Личный кабинет</NavLink>,
            ];
        } else {
            menuItems = [
                <NavLink className="Reg" to='/registration'> Регистрация </NavLink>,
                <NavLink className="Enter" to='/login'>Вход</NavLink>,
            ];
        }
        return (
            <header className="Abstract-header">
                <div className="Header-components">
                    <a className="Header-text" href="/mainpage">LEARN AND CREATE</a>
                    {menuItems}
                </div>
            </header>
        )
    };
}

export default AbstractHeader;