import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";
import UserAccount from "../UserAccount/UserAccount";
import user from "../States/Auth_Reducer";

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
                //<NavLink className="Logout" to ={'http://localhost:3000/users/' + this.props.user.username}>Личный кабинет</NavLink>,
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