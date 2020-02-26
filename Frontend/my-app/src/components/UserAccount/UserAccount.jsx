import React, {Component} from "react";

class UserAccount extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        alert(this.props.user.name);
        return (
            <div className="QW">
                this is user account
            </div>
        );
    }
}
export default UserAccount;