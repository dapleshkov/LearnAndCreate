import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";

class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }

    handleClick = event => {
        localStorage.removeItem("accessToken");
        this.props.user.isAuthenticated = false;
        window.location.assign('http://localhost:3000/mainpage');
    };

    render() {
        let menuItems;
        if (this.props.user.isAuthenticated) {
            menuItems = [
                <NavLink className="Logout" to="/mainpage" onClick={this.handleClick}>Выход</NavLink>
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