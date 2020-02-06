import React, {Component} from "react";
import './AbstractHeader.css'
import user from "../States/Auth_Reducer";
import {NavLink} from "react-router-dom";
import {getCurrentUser} from "../ServerAPI/serverAPI";


class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        let menuItems;
        if (user.isAuthenticated) {
            menuItems = [
                <text>
                    profile
                </text>,
                <text>
                    icon
                </text>,
                <text>
                    menu
                </text>
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