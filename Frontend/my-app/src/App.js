import React, {Component} from 'react';
import './App.css';
import AbstractHeader from "./components/Header/AbstractHeader";
import Login from "./components/login/Authorization";
import {BrowserRouter, Route} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import RefactorAccount from "./components/Refactor/RefactorAccount";
import MainPage from "./components/MainPage/MainPage";
import {getCurrentUser} from "./components/ServerAPI/serverAPI";
import UserAccount from "./components/UserAccount/UserAccount";
import {ACCESS_TOKEN} from "./components/ServerAPI/utils";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false
        };
        this.loadUser = this.loadUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.loadUser();
    }

    loadUser() {
        debugger;
        getCurrentUser().then(response => {
            this.setState({
                currentUser: response,
                isAuthenticated: true,
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

    render() {
        return (
            <BrowserRouter>
                <div className="Abstract-wrapper">
                    <AbstractHeader LogOut={this.logOut} user={this.state.currentUser}
                                    isAuthenticated={this.state.isAuthenticated}/>
                    <Route path="/refactoraccount" component={RefactorAccount}/>
                    <Route path="/login" render={(props) => <Login onLogin={this.loadUser}/>}/>
                    <Route path='/registration' render={(props) => <Registration/>}/>
                    <Route path='/mainpage' component={MainPage}/>
                    <Route path='/users/:username' render={(props) => <UserAccount user={this.state.currentUser}
                                                                                   isAuthenticated={this.state.isAuthenticated}/>}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
