import React, {Component} from 'react';
import './CoursePage.module.css';
import {Switch, Route, NavLink} from "react-router-dom";
import {getCourseById} from "../ServerAPI/courseAPI";
import {subscribe} from "../ServerAPI/userAPI";
import styles from "./CoursePage.module.css";



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
        }).catch(response => {
            alert(response.message);
        })
    }

    componentDidMount() {
        this.loadCourseInformation();
    }

    handleOnClick() {
        subscribe(this.state.course.courseId).then(response => {
            alert(response);
        }).catch(response => {
            alert(response.message);
        })
    };

    render() {
        if (this.state.isLoaded) {
            return (
                <div className={styles.CoursePage}>
                    <NavBar courseId={this.state.course.courseId}/>
                    <br/>
                    <Switch>
                        <Route exact path={"/course/" + this.state.course.courseId}
                               render={(props) => <AboutCourse user={this.props.user} course={this.state.course}/>}/>
                        <Route exact path={"/course/" + this.state.course.courseId + "/comments"}
                               render={(props) => <CommentsCourse user={this.props.user}/>}/>
                    </Switch>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                </div>
            );
        }
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ul className={styles.NavBar}>
                <li className={styles.SettingsItem}>
                    <NavLink to={"/course/" + this.props.courseId} className={styles.SettingsLink}
                             exact activeClassName={styles.selected_link}>О курсе</NavLink>
                </li>
                <li className={styles.SettingsItem}>
                    <NavLink to={"/course/" + this.props.courseId + "/comments"} className={styles.SettingsLink}
                             activeClassName={styles.selected_link}>Комментарии</NavLink>
                </li>
                <li className={styles.SettingsItem}>
                    <NavLink to={"/course/" + this.props.courseId + "/feedback"} className={styles.SettingsLink}
                             activeClassName={styles.selected_link}>Отзывы</NavLink>
                </li>
                <li className={styles.SettingsItem}>
                    <NavLink to={"/course/" + this.props.courseId + "/xyi"} className={styles.SettingsLink}
                             activeClassName={styles.selected_link}>Содержание</NavLink>
                </li>
            </ul>
        )
    };
}

class AboutCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Content}>
                wekjwehjtwehgltjhegtljqhegrl
                <button className={styles.Subscribe} onClick={this.handleOnClick}>Subscribe
                    to {this.props.course.title}</button>
            </div>
        );
    }
}


class CommentsCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Content}>
                asdsdad
            </div>
        );
    }
}

export default CoursePage;