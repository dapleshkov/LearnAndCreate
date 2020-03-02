import React, {Component} from "react";
import "./Settings.css";import "./EditName";
import EditName from "./EditName";
import {Switch, Route} from "react-router-dom";


class Settings extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
            <div className="Settings">
                <UserSettings/>
                <Switch>
                    <Route path="/editname" component={EditName}/>
                    {/*<Route path="/login" render={(props) => <Login onLogin={this.loadUser}/>}/>*/}
                    {/*<Route path='/registration' render={(props) => <Registration/>}/>*/}
                    {/*<Route path='/mainpage' component={MainPage}/>*/}
                    {/*<Route path='/settings' render={(props) => <Settings user={this.state.currentUser}/>}/>*/}
                    {/*<Route path='/users/:username' render={(props) => <UserAccount user={this.state.currentUser}/>}/>*/}
                </Switch>
            </div>
        );
    }
}

function UserSettings() {
    return(
        <div className="UserSettings">
            This is Menu
        </div>
    )
}
export default Settings;