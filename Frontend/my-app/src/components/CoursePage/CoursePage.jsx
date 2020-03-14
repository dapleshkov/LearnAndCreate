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
        alert(window.location.pathname);
        getCourseById(window.location.pathname).then(response => {
            alert(response.message());
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
            alert(response.message);
        }).catch(response => {
            alert(response.message);
        })
    };

    render() {
        // alert(12);
        // if (this.state.isLoaded) {
        //     alert(this.state.course.courseId);
        //     return (
        //         <div >
        //             this is coursepage
        //             {/*<button className="CPSub" onClick={this.handleOnClick}>Subscribe to {this.state.course.title}</button>*/}
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div >
        //             this is course page
        //         </div>
        //     );
        // }
        return(
            <div>
                {window.location.pathname}
            </div>
        )
    }
}


export default CoursePage;