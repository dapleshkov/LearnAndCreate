import React, {Component} from "react";
import "./UserAccount.css";
import {getCoursesOfUser, getRandomCourses} from "../ServerAPI/courseAPI";
import {CourseBlock} from "../MainPage/MainPage";

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
                    <text className="coursesCount">Number of course subscriptions 0</text>
                </div>
                <hr className="separator"/>
                <div className="courses">
                    <UsersCourses/>
                </div>
            </div>
        );
    }
}

class UsersCourses extends Component{
    constructor(props) {
        super(props);
        this.state={
            courses:[],
            isLoaded:false
        };
        this.getCourses=this.getCourses.bind(this);
    }


    getCourses(){
        getCoursesOfUser().then(response => {
            this.setState({
                courses: JSON.parse(JSON.stringify(response)),
                isLoaded: true
            });
        });
    }
    componentDidMount() {
        this.getCourses();
    }

    render() {
        const coursesList = [];
        this.state.courses.forEach((course) => {
            coursesList.push(<CourseBlock course={course}/>);
        });
        if(this.state.isLoaded) {
            return (
                <div>
                    {coursesList}
                </div>
            );
        }
        else{
            return(
                <div>
                    not found
                </div>
            )
        }

    }

}



export default UserAccount;