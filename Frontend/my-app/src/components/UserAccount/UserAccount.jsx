import React, {Component} from "react";

class UserAccount extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        alert(this.props.user.name);
        return (
            <div>
                this is user account
            </div>
        );
    }
}
export default UserAccount;