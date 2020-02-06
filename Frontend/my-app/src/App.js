import React, {Component} from 'react';
import './App.css';
import AbstractHeader from "./components/Header/AbstractHeader";
import Login from "./components/login/Authorization";
import {BrowserRouter, Route} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import RefactorAccount from "./components/Refactor/RefactorAccount";
import MainPage from "./components/MainPage/MainPage";
import {getCurrentUser} from "./components/ServerAPI/serverAPI";
import user from "./components/States/Auth_Reducer";

class App extends Component {
    constructor(props) {
        super(props);
        user.isAuthenticated = localStorage.getItem('accessToken');
    }

    render() {
        getCurrentUser().then(response => {
            debugger;
            user.usernameOrEmail = response.usernameOrEmail;
            user.isAuthenticated = true;
        });
        return (
            <BrowserRouter>
                <div className="Abstract-wrapper">
                    <AbstractHeader isAuthenticated={user.isAuthenticated}/>
                    <Route path="/refactoraccount" component={RefactorAccount}/>
                    <Route path="/login" render={(props) => <Login user={user}/>}/>
                    <Route path='/registration' component={Registration}/>
                    <Route path='/mainpage' component={MainPage}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
