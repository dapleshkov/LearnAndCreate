import React, {Component} from 'react';
import './CoursePage.module.css';
import {Switch, Route, NavLink} from "react-router-dom";
import {getCourseById} from "../ServerAPI/courseAPI";
import {subscribe} from "../ServerAPI/userAPI";
import styles from "./CoursePage.module.css";
import ReactPlayer from "react-player";
class CoursePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            course: null,
            isLoaded: false,
            user:{}
        };
        this.loadCourseInformation = this.loadCourseInformation.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    loadCourseInformation() {
        getCourseById(this.props.match.params.courseId).then(response => {
            this.setState({
                course: response,
                isLoaded: true
            });
        }).catch(response => {
            debugger;
            alert(response.message);
        })
    }

    componentDidMount() {
        this.loadCourseInformation();
        this.setState({
            user:this.props.user
        })
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
                    <br/>
                    <br/>
                    <Switch>
                        <Route exact path={"/course/" + this.state.course.courseId}
                               render={(props) => <AboutCourse user={this.state.user} course={this.state.course}/>}/>
                        <Route exact path={"/course/" + this.state.course.courseId + "/comments"}
                               render={(props) => <CommentsCourse user={this.state.user}/>}/>
                        <Route exact path={"/course/" + this.state.course.courseId + "/content"}
                               render={(props) => <CourseContent user={this.state.user}/>}/>
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
                    <NavLink to={"/course/" + this.props.courseId + "/content"} className={styles.SettingsLink}
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
        debugger;
        return (
            <div className={styles.Content}>
                <header className={styles.CourseName}>{this.props.course.title}</header>
                <div className={styles.InformationAboutCourse}>
                    <header className={styles.HeadOfINfCourse}>О курсе</header>
                    <div className={styles.InformationMainBody}>
                        <img className={styles.ImageOfCourse} src={this.props.course.image.url}/>
                        <text className={styles.TextInMainBody}>
                            The UI/UX Design Specialization brings a design-centric approach to user interface and user
                            experience design, and offers practical, skill-based instruction centered around a visual
                            communications perspective, rather than on one focused on marketing or programming alone. In
                            this sequence of four courses, you will summarize and demonstrate all stages of the UI/UX
                            development process, from user research to defining a project’s strategy, scope, and
                            information architecture, to developing sitemaps and wireframes. You’ll learn current best
                            practices and conventions in UX design and apply them to create effective and compelling
                            screen-based experiences for websites or <apps className=""></apps>
                            User interface and user experience design is a high-demand field, but the skills and
                            knowledge you will learn in this Specialization are applicable to a wide variety of careers,
                            from marketing to web design to human-computer interaction.
                        </text>
                    </div>
                </div>
                <div className={styles.MarkOfTheCourse}>
                    <RatingBlock/>
                </div>
                <CourseContent/>

            </div>
        );
    }
}


class CourseContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ReactPlayer url="https://d3c33hcgiwev3.cloudfront.net/Thz5oiWmEeeErgpOFanBSA.processed/full/540p/index.webm?Expires=1585353600&Signature=hoARjJH9eCI4yw~iDMr20tc1Re5eqdCWo7Ug8RZXdh0rur2absDTTKH7dC8BT-6~sNInI3CAiAJ9x0GClY21W-sTQju1F3wv0lBn8MJswpiAm1iu1ADVosX2Y0YfEV3QxwcwySqbWiff1ASEv8RdC-BhzVkKvMz0cXcgtSi8jh4_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A" controls={true}/>
            </div>
        );
    }
}

function RatingBlock() {
    return (
        <div className={styles.rating_block}>
            <input name="rating" value="5" id="rating_5" type="radio"/>
            <label htmlFor="rating_5" className="label_rating"></label>

            <input name="rating" value="4" id="rating_4" type="radio"/>
            <label htmlFor="rating_4" className="label_rating"></label>

            <input name="rating" value="3" id="rating_3" type="radio"/>
            <label htmlFor="rating_3" className="label_rating"></label>

            <input name="rating" value="2" id="rating_2" type="radio"/>
            <label htmlFor="rating_2" className="label_rating"></label>

            <input name="rating" value="1" id="rating_1" type="radio"/>
            <label htmlFor="rating_1" className="label_rating"></label>
        </div>
    );
}


class CommentsCourse extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.Content}>
            courses
            </div>
        );
    }
}

export default CoursePage;