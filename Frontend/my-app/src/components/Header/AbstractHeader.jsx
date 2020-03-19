import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";

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
                        <li>
                            <a className="maina" href="#">
                                <text className="ddusn">{this.props.user.username}</text>
                                <img className="ico" src="http://cdn.onlinewebfonts.com/svg/img_51324.png" alt="ico"/>
                                <div className="arrow-wrapper">
                                    &or;
                                </div>
                            </a>
                            <ul className="submenu">
                                <li className="item"><NavLink to={`/users/${this.props.user.username}`}>Личный кабинет</NavLink></li>
                                <li className="item"><NavLink to="/settings/editname">Настройки</NavLink></li>
                                <li className="item"><NavLink to="/mainpage"
                                                              onClick={this.handleClickOut}>Выход</NavLink></li>
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
                    <NavLink className="Header-text" to="/mainpage">LEARN AND CREATE</NavLink>
                </div>
            </header>
        )
    };
}

export default AbstractHeader;