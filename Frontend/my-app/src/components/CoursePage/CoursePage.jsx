import React, {Component} from 'react';
import './CoursePage.css';
import {NavLink} from 'react-router-dom';
import {getCourseById} from "../ServerAPI/courseAPI";
import {subscribe} from "../ServerAPI/userAPI";


class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            isLoaded: false
        };
        this.loadCourseInformation = this.loadCourseInformation.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    loadCourseInformation() {
        getCourseById(window.location.pathname).then(response => {
            this.setState({
                course: response,
                isLoaded: true
            });
        }).catch(response=>{
            alert(response.message);
        })
    }

    componentDidMount() {
        this.loadCourseInformation();
    }

    handleOnClick () {
        subscribe(this.state.course.courseId).then(response => {
            alert(12);
        }).catch(response => {
            debugger;
            alert(response.message);
        })
    };

    render() {
        if (this.state.isLoaded) {
            debugger;
            return (
                <div >
                    <button onClick={this.handleOnClick}>Subscribe to {this.state.course.title}</button>
                </div>
            );
        } else {
            return (
                <div >
                    this is course page
                </div>
            );
        }

    }
}

export default CoursePage;