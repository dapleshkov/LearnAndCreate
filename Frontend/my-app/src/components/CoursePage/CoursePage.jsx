import React, {Component} from 'react';
import './CoursePage.module.css';
import {Switch, Route, NavLink} from "react-router-dom";
import {getCourseById} from "../ServerAPI/courseAPI";
import {editName, subscribe} from "../ServerAPI/userAPI";
import {NAME_MAX_LENGTH, NAME_MIN_LENGTH} from "../ServerAPI/utils";
import styles from "./CoursePage.module.css";


let URL = window.location.pathname;

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
                    <NavBar/>
                    <br/>
                    <Switch>
                        <Route path={URL + "/about"} render={(props) => <AboutCourse user={this.props.user}/>}/>
                        <Route path={URL + "/comments"} render={(props) => <CommentsCourse user={this.props.user}/>}/>
                    </Switch>
                    <br/>
                    <button className={styles.Subscribe} onClick={this.handleOnClick}>Subscribe to {this.state.course.title}</button>
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

function NavBar() {
    return (
        <ul className={styles.NavBar}>
            <li className={styles.SettingsItem}>
                <NavLink to={URL + "/about"} className={styles.SettingsLink} activeClassName={styles.selected_link}>О
                    курсе</NavLink>
            </li>
            <li className={styles.SettingsItem}>
                <NavLink to={URL + "/comments"} className={styles.SettingsLink}
                         activeClassName={styles.selected_link}>Комментарии</NavLink>
            </li>
        </ul>
    )
}

class AboutCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Content}>
                <img className={styles.ImgAbout}
                     src="https://s3-alpha-sig.figma.com/img/5fa4/1c4c/23d116e574e4d63ffcabfb35efe2a2db?Expires=1585526400&Signature=NLgeGtEr~kbCz7jw0Z-CpJzPRsoR2rRxGSN3NgMP2menlmpHYd0MnIcdS4byxwzRFtQh6HaW4rI-IXQMeBx1cjwUiyMzRQ3-7FwnQmi918Ge8CthSJl976XW8Th5M8a5CUFPDPh9Mv1-cMLJsi6jX~or7fv47tj5i125J8CKjGxST09MWfiuoG3pneNZbmPrDFxYr6ECEwFkO90BK5f7lONgBFrv7xl5fBd8~NyciOiuEYSxnl1hthu92ORtEh3VlDa-0ktXbwm9B7nP98hlB5Dv44cdsqAAtUjUC9fWwQfgxMDHw7sYMPEP~JKXwPu7grv44sjnfa4te8s5dI8g6A__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"></img>
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
                There will comments
            </div>
        );
    }
}

export default CoursePage;