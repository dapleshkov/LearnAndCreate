import React, {Component} from "react";

class UserAccount extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        debugger;
        alert(this.props.user.name);
        return (
            <div className="Wrapper">
                this is user account
            </div>
        );
    }
}
export default UserAccount;