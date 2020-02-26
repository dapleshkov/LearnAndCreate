import React, {Component} from "react";
import "./UserAccount.css";

class UserAccount extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Wrapper">
                <div className="info">
                    <img className="avatar" src="https://www.stickpng.com/assets/images/585e4bcdcb11b227491c3396.png"
                         alt="ava"/>
                    <text className="username">{this.props.user.username}</text>
                    <text className="name">{this.props.user.name}</text>
                    <text className="coursesCount">{`Number of course subscriptions 0`}</text>
                </div>
                <hr className="separator"></hr>
                <div className="courses">
                    <text>There some courses</text>
                </div>
            </div>
        );
    }
}

export default UserAccount;