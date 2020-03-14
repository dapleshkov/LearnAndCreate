import React, {Component} from "react";
import "./UserAccount.css";
import {NavLink} from "react-router-dom";
import {getCoursesOfUser, getRandomCourses} from "../ServerAPI/courseAPI";

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
                    <text>Work</text>
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

function CourseBlock(props) {
    let path = "";
    if (props.course.image === null) {
        path = "https://yt3.ggpht.com/a/AGF-l7_tM_jmkKQ_T1sNRNBf-s7GZuhzFWbdEkSfHA=s900-c-k-c0xffffffff-no-rj-mo";
    } else {
        path = props.course.image;
    }
    debugger;

    let pathtocourse = "../courses/" + props.course.courseId;
    return (
        <NavLink className="CourseBlock" to={pathtocourse}>
            <img className="ImgCourse" src={path}
                 width="100" height="100"/>
            <br/>
            <text className="Infa">{props.course.title}</text>
            <br/>
            <text className="Infa">{props.course.description}</text>
        </NavLink>
    )
}

export default UserAccount;