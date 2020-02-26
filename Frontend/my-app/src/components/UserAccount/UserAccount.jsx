import React, {Component} from "react";

class UserAccount extends Component{
    constructor(props)
    {
        super(props);
    }
    render(){
        return (
            <div className="Wrapper">
                <text>{this.props.user.name}</text>
                </div>
        );
    }
}
export default UserAccount;