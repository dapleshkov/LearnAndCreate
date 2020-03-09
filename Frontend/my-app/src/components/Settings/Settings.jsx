import React, {Component} from "react";
import "./Settings.css";
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


class EditName extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainBlock">
                <text className="Title">Изменить имя</text>
                <hr className="separator1"/>
                <div className="f">
                    <text className="Inform">Новое имя</text>
                    <input className="Changes" placeholder="name"/>
                </div>
                <div>
                    <button className='Submit'>Сохранить изменения</button>
                </div>
            </div>
        );
    }
}

class EditUserName extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainBlock">
                <text className="Title">Изменить имя пользователя</text>
                <hr className="separator1"/>
                <div className="f">
                    <text className="Inform">Новое имя пользователя</text>
                    <input className="Changes" placeholder="username"/>
                </div>
                <div>
                    <button className='Submit'>Сохранить изменения</button>
                </div>
            </div>
        );
    }
}

class EditPassword extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="MainBlock">
                <text className="Title">Изменить пароль</text>
                <hr className="separator1"/>
                <div className="f">
                    <text className="Inform">Текущий пароль</text>
                    <input className="Changes" placeholder="your password"/>
                </div>
                <br/>
                <div className="f">
                    <text className="Inform">Новый пароль</text>
                    <input className="Changes" placeholder="new password"/>
                </div>
                <br/>
                <div className="f">
                    <text className="Inform">Повторите новый пароль</text>
                    <input className="Changes" placeholder="repeat new password"/>
                </div>
                <div>
                    <button className='Submit'>Сохранить изменения</button>
                </div>
            </div>
        );
    }
}

function UserSettings() {
    return (
        <ul className="UserSettings">
            <li className="SettingsItem">
                <NavLink to="/settings/editname" className="SettingsLink" activeClassName="selected_link">Изменить
                    имя</NavLink>
            </li>
            <li className="SettingsItem">
                <NavLink to="/settings/editusername" className="SettingsLink" activeClassName="selected_link">Изменить
                    имя пользователя</NavLink>
            </li>
            <li className="SettingsItem">
                <NavLink to="/settings/editpassword" className="SettingsLink" activeClassName="selected_link">Изменить
                    пароль</NavLink>
            </li>
        </ul>
    )
}

export default Settings;