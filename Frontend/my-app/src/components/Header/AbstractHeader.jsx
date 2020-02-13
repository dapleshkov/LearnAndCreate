import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";
import UserAccount from "../UserAccount/UserAccount";

class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }

    handleClickOut = event => {
        localStorage.removeItem("accessToken");
        this.props.user.isAuthenticated = false;
        window.location.assign('http://localhost:3000/mainpage');
    };

    render() {
        let menuItems;
        alert(this.props.user.username);
        if (this.props.user.isAuthenticated) {
            menuItems = [
                <NavLink className="Logout" to="/mainpage" onClick={this.handleClickOut}>Выход</NavLink>,
                <NavLink className="Logout" to={'http://localhost:3000/users/' + this.props.user.username}>Личный
                    кабинет</NavLink>,
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
                    <text className="Header-text">LEARN AND CREATE</text>
                    {menuItems}
                </div>
            </header>
        )
    };
}

export default AbstractHeader;