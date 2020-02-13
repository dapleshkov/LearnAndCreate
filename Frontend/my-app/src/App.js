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
import UserAccount from "./components/UserAccount/UserAccount";

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="Abstract-wrapper">
                    <AbstractHeader user={user}/>
                    <Route path="/refactoraccount" component={RefactorAccount}/>
                    <Route path="/login" render={(props) => <Login user={user}/>}/>
                    <Route path='/registration' render={(props) => <Registration user={user}/>}/>
                    <Route path='/mainpage' component={MainPage}/>
                    <Route path='/users/:username' render={(props) => <UserAccount user={user}/>}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
