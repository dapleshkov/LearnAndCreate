import React, {Component} from 'react';
import './CoursePage.css';
import {NavLink} from 'react-router-dom';
import {getCourseById} from "../ServerAPI/courseAPI";


class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            isLoaded: false
        };
        this.loadCourseInformation = this.loadCourseInformation.bind(this);
    }

    loadCourseInformation() {
        getCourseById(window.location.pathname).then(response => {
            this.setState({
                course: response,
                isLoaded: true
            });
        })
    }

    componentDidMount() {
        this.loadCourseInformation();
    }

    render() {
        if (this.state.isLoaded) {
            debugger;
            return (
                <div>
                    {this.state.course.title}
                </div>
            );
        } else {
            return (
                <div>
                    this is course page
                </div>
            );
        }
    }
}


export default CoursePage;