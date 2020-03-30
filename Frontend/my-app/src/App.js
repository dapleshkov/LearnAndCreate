import React, {Component} from 'react';
import './App.css';
import AbstractHeader from "./components/Header/AbstractHeader";
import Login from "./components/login/Authorization";
import {Switch, Route, withRouter} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import RefactorAccount from "./components/Refactor/RefactorAccount";
import MainPage from "./components/MainPage/MainPage";
import {getCurrentUser} from "./components/ServerAPI/userAPI.js";
import UserAccount from "./components/UserAccount/UserAccount";
import {ACCESS_TOKEN} from "./components/ServerAPI/utils";
import Settings from "./components/Settings/Settings";
import CoursePage from "./components/CoursePage/CoursePage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {
                name: null,
                username: null,
                email: null,
                password: null
            },
            isAuthenticated: false,
            isLoaded: false
        };
        this.loadUser = this.loadUser.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    loadUser() {
        getCurrentUser().then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
                isLoaded: true
            });
        }).catch(response => {
            this.setState({
                isLoaded: true
            });
        });
    }

    logOut() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
            currentUser: null,
            isAuthenticated: false
        });
    }

    componentDidMount() {
        this.loadUser();
    }

    render() {
        if (this.state.isLoaded) {
            return (
                <div className="Abstract-wrapper">
                    <AbstractHeader LogOut={this.logOut} user={this.state.currentUser}
                                    isAuthenticated={this.state.isAuthenticated}/>
                    <Switch>
                        <Route path="/refactoraccount" component={RefactorAccount}/>
                        <Route path="/login"
                               render={(props) => <Login onLogin={this.loadUser}/>}/>
                        <Route path='/registration'
                               render={(props) => <Registration/>}/>
                        <Route path='/mainpage'
                               render={(props) => <MainPage isAuthenticated={this.state.isAuthenticated}/>}/>
                        <Route exact path='/'
                               render={(props) => <MainPage isAuthenticated={this.state.isAuthenticated}/>}/>
                        <Route path='/settings'
                               render={(props) => <Settings user={this.state.currentUser}/>}/>
                        <Route path='/users/:username'
                               render={(props) => <UserAccount user={this.state.currentUser}/>}/>
                        <Route path='/course/:courseId' component={CoursePage}/>
                    </Switch>
                </div>
            );
        } else {
            return (
                <div className="Abstract-wrapper">
                </div>
            )
        }
    }
}

export default withRouter(App);
