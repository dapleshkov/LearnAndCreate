import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";

class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }

    handleClickOut = event => {
        this.props.LogOut();
        window.location.assign('https://learning-app-client.herokuapp.com/mainpage');
    };

    render() {
        let path = "";
        if (this.props.user.image !== null) {
            path = this.props.user.image;
        } else {
            path = "http://cdn.onlinewebfonts.com/svg/img_51324.png";
        }
        let menuItems;
        if (this.props.isAuthenticated) {
            menuItems = [
                <nav className="dropDownMenu">
                    <ul className="topmenu">
                        <li>
                            <a className="maina" href="#">
                                <text className="ddusn">{this.props.user.username}</text>
                                <img className="ico" src={path} alt="ico"/>
                                <div className="arrow-wrapper">
                                    &or;
                                </div>
                            </a>
                            <ul className="submenu">
                                <li className="item"><NavLink to={`/users/${this.props.user.username}`}>Личный
                                    кабинет</NavLink></li>
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
                    <SearchField/>
                    <NavLink className="Header-text" to="/mainpage">LEARN AND CREATE</NavLink>
                </div>
            </header>
        )
    };
}

class SearchField extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="InputForm">
                <div className="Search">
                    <img src="http://cliparts.co/cliparts/8cG/b5q/8cGb5q86i.jpg" alt="" className="SearchIcon"/>
                    <input className="SearchInput" name="s" placeholder="Что ты хочешь узнать сегодня?" type="search"/>
                </div>
            </form>
        )
    }
}

export default AbstractHeader;