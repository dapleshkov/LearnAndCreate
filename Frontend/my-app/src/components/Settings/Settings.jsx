import React, {Component} from "react";
import "./Settings.css";
import {Switch, Route, NavLink} from "react-router-dom";
import {editName, editPassword, editUsername} from "../ServerAPI/userAPI";
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "../ServerAPI/utils";
import {Form} from "antd";


class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Settings">
                <UserSettings/>
                <Switch>
                    <Route path="/settings/editname" render={(props) => <EditName user={this.props.user}/>}/>
                    <Route path="/settings/editusername" render={(props) => <EditUserName user={this.props.user}/>}/>
                    <Route path="/settings/editpassword" render={(props) => <EditPassword user={this.props.user}/>}/>
                </Switch>
            </div>
        );
    }
}


class EditName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        editName(this.state.name).then(response => {
            debugger;
            alert(response.message);
        }).catch(response => {
            debugger;
            alert(response.message);
        });
    };

    handleChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    render() {
        return (
            <div className="MainBlock">
                <text className="Title">Изменить имя</text>
                <hr className="separator1"/>
                <div className="f">
                    <text className="Inform">Новое имя</text>
                    <input className="Changes" placeholder="name" onChange={this.handleChange}/>
                </div>
                <div>
                    <button className='Submit' onClick={this.handleSubmit}>Сохранить изменения</button>
                </div>
            </div>
        );
    }
}

class EditUserName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        editUsername(this.state.username).then(response => {
            debugger;
            alert(response.message);
        }).catch(response => {
            debugger;
            alert(response.message);
        });
    };

    handleChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    render() {
        return (
            <div className="MainBlock">
                <text className="Title">Изменить имя пользователя</text>
                <hr className="separator1"/>
                <div className="f">
                    <text className="Inform">Новое имя пользователя</text>
                    <input className="Changes" placeholder="username" onChange={this.handleChange}/>
                </div>
                <div>
                    <button className='Submit' onClick={this.handleSubmit}>Сохранить изменения</button>
                </div>
            </div>
        );
    }
}

class EditPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentpassword: {
                value: ''
            },
            firstpassword: {
                value: ''
            },
            secondpassword: {
                value: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateFirstPassword = this.validateFirstPassword.bind(this);
        this.validateSecondPassword = this.validateSecondPassword.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        editPassword(this.state.password).then(response => {
            alert(response.message);
        }).catch(response => {
            alert(response.message);
        });
    };

    handleChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    };

    isFormValid() {
        return !(this.state.firstpassword.validateStatus === 'success' &&
            this.state.secondpassword.validateStatus === 'success' &&
            this.state.currentpassword.validateStatus === 'success');
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="MainBlock">
                <text className="Title">Изменить пароль</text>
                <hr className="separator1"/>
                <text className="Inform">Текущий пароль</text>
                <Form.Item className="f">
                    <input className="Changes" placeholder="your password"/>
                </Form.Item>
                <text className="Inform">Новый пароль</text>
                <Form.Item className="f"
                           validateStatus={this.state.firstpassword.validateStatus}
                           help={this.state.firstpassword.errorMsg}>
                    <input className="Changes"
                           placeholder="new password"
                           name="firstpassword"
                           value={this.state.firstpassword.value}
                           onChange={(event) => this.handleChange(event, this.validateFirstPassword)}/>
                </Form.Item>
                <text className="Inform">Повторите новый пароль</text>
                <Form.Item className="f"
                           validateStatus={this.state.secondpassword.validateStatus}
                           help={this.state.secondpassword.errorMsg}>
                    <input className="Changes"
                           placeholder="repeat new password"
                           name="secondpassword"
                           value={this.state.secondpassword.value}
                           onChange={(event) => this.handleChange(event, this.validateSecondPassword)}/>
                </Form.Item>
                <div>
                    <button className='Submit' disabled={this.isFormValid}>Сохранить изменения</button>
                </div>
            </Form>
        );
    }

    validateFirstPassword = (password) => {
        if (password.length < PASSWORD_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
            }
        } else if (password.length > PASSWORD_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
            };
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };

    validateSecondPassword = (password) => {
        if (password < this.state.firstpassword.value) {
            return {
                validateStatus: 'error',
                errorMsg: `Passwords are not equal)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };
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