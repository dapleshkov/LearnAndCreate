import React from 'react';
import './App.css';
import AbstractHeader from "./components/AbstractHeader";
import Login from "./components/login/Authorization";
import {BrowserRouter, Route} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import RefactorAccount from "./components/Refactor/RefactorAccount";

function App() {
    return (
        <BrowserRouter>
            <div className="Abstract-wrapper">
                <AbstractHeader/>
                <Route path="/refactoraccount" component={RefactorAccount}/>
                <Route path="/login" component={Login}/>
                <Route path='/registration' component={Registration}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
