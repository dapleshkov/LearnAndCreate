import React, {Component} from "react";
import "./Settings.css";
import {Switch, Route, NavLink} from "react-router-dom";
import {checkUsernameAvailability, editName, editPassword, editUsername} from "../ServerAPI/userAPI";
import {
    NAME_MAX_LENGTH,
    NAME_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../ServerAPI/utils";
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
            name: {
                value: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateName = this.validateName.bind(this);
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

    render() {
        return (
            <Form className="MainBlock">
                <text className="Title">Изменить имя</text>
                <hr className="separator1"/>
                <text className="Inform">Новое имя</text>
                <Form.Item className="f"
                           validateStatus={this.state.name.validateStatus}
                           help={this.state.name.errorMsg}>
                    <input className="Changes"
                           placeholder="name"
                           name="name"
                           onChange={(event) => this.handleChange(event, this.validateName)}/>
                </Form.Item>
                <Form.Item>
                    <button className='Submit' onClick={this.handleSubmit}>Сохранить изменения</button>
                </Form.Item>
            </Form>
        );
    }

    validateName = (name) => {
        if (name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    };
}

class EditUserName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {
                value: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateUsernameAvailability = this.validateUsernameAvailability.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
    }

    handleSubmit = event => {
        event.preventDefault();
        editUsername(this.state.username).then(response => {
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



    render() {
        return (
            <Form className="MainBlock" onSubmit={this.handleSubmit}>
                <text className="Title">Изменить имя пользователя</text>
                <hr className="separator1"/>
                <text className="Inform">Новое имя пользователя</text>
                <Form.Item className="f"
                           validateStatus={this.state.username.validateStatus}
                           help={this.state.username.errorMsg}>
                    <input className="Changes"
                           placeholder="username"
                           onBlur={this.validateUsernameAvailability}
                           name="username"
                           onChange={(event) => this.handleChange(event, this.validateUsername)}/>
                </Form.Item>
                <Form.Item>
                    <button className='Submit'>Сохранить изменения</button>
                </Form.Item>
            </Form>
        );
    }

    validateUsername = (username) => {
        if (username.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (username.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    };
    
    validateUsernameAvailability() {
        // First check for client side errors in username
        debugger;
        const usernameValue = this.state.username.value;
        const usernameValidation = this.validateUsername(usernameValue);
        if (usernameValidation.validateStatus === 'error') {
            this.setState({
                username: {
                    value: usernameValue,
                    ...usernameValidation
                }
            });
            return;
        }

        this.setState({
            username: {
                value: usernameValue,
                validateStatus: 'validating',
                errorMsg: null
            }
        });

        checkUsernameAvailability(usernameValue)
            .then(response => {
                if (response.success) {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'success',
                            errorMsg: null
                        }
                    });
                } else {
                    this.setState({
                        username: {
                            value: usernameValue,
                            validateStatus: 'error',
                            errorMsg: 'This username is already taken'
                        }
                    });
                }
            }).catch(error => {
            // Marking validateStatus as success, Form will be recchecked at server
            this.setState({
                username: {
                    value: usernameValue,
                    validateStatus: 'success',
                    errorMsg: null
                }
            });
        });
    };

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
            this.state.secondpassword.validateStatus === 'success');
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit} className="MainBlock">
                <text className="Title">Изменить пароль</text>
                <hr className="separator1"/>
                <text className="Inform">Текущий пароль</text>
                <Form.Item className="f">
                    <input className="Changes"
                           placeholder="your password"
                           name="currentpassword"
                           value={this.state.currentpassword.value}
                           onChange={(event) => this.handleChange(event, this.validateFirstPassword)}/>
                </Form.Item>
                <text className="Inform1">Новый пароль</text>
                <Form.Item className="f"
                           validateStatus={this.state.firstpassword.validateStatus}
                           help={this.state.firstpassword.errorMsg}>
                    <input className="Changes"
                           placeholder="new password"
                           name="firstpassword"
                           value={this.state.firstpassword.value}
                           onChange={(event) => this.handleChange(event, this.validateFirstPassword)}/>
                </Form.Item>
                <text className="Inform2">Повторите новый пароль</text>
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
        if (password !== this.state.firstpassword.value) {
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