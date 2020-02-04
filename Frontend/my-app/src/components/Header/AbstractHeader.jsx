import React, {Component} from "react";
import './AbstractHeader.css'
import {NavLink} from "react-router-dom";
import {Menu} from "antd";
import * as axios from "axios";
import {getCurrentUser} from "../ServerAPI/serverAPI";

class AbstractHeader extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        debugger;
        let menuItems;
        getCurrentUser().then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoading: false
            });
        });
        if (this.props.currentUser) {
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
                <NavLink className="Enter" to='/login'>Вход</NavLink>,
                <NavLink className="Reg" to='/registration'>Регистрация</NavLink>
            ];
        }

        return (
            <header className="Absrtact-header">
                <div>
                        <text className="Header-text">Learn and create</text>
                        {menuItems}
                </div>
            </header>
        )
    };
}

export default AbstractHeader;