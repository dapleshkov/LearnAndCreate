import React, {Component} from "react";
import "./Settings.css";

class Settings extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
            <div className="Settings">
                <UserSettings/>
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