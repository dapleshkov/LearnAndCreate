import React, {Component} from "react";
import "./Settings.css";
import "./EditName";
import EditName from "./EditName";
import EditUserName from "./EditUserName";
import EditPassword from "./EditPassword";
import {Switch, Route, NavLink} from "react-router-dom";


class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Settings">
                <UserSettings/>
                <Switch>
                    <Route path="/settings/editname" component={EditName}/>
                    <Route path="/settings/editusername" component={EditUserName}/>
                    <Route path="/settings/editpassword" component={EditPassword}/>
                </Switch>
            </div>
        );
    }
}

function UserSettings() {
    return (
        <ul className="UserSettings">
            <li className="SettingsItem">
                <NavLink to="/settings/editname" className="SettingsLink">Изменить имя</NavLink>
            </li>
            <li className="SettingsItem">
                <NavLink to="/settings/editusername" className="SettingsLink">Изменить имя пользователя</NavLink>
            </li>
            <li className="SettingsItem">
                <NavLink to="/settings/editpassword" className="SettingsLink">Изменить пароль</NavLink>
            </li>
        </ul>

    )
}

export default Settings;