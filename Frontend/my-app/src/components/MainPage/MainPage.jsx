import React, {Component} from "react";
import "./MainPage.css"
import {getRandomCourses} from "../ServerAPI/courseAPI";
import {NavLink} from "react-router-dom";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            isLoaded: false
        };
        this.loadCourses = this.loadCourses.bind(this);
    }


    loadCourses() {
        getRandomCourses().then(response => {
            this.setState({
                courses: JSON.parse(JSON.stringify(response)),
                isLoaded: true
            });
        });
    }

    componentDidMount() {
        this.loadCourses();
    }

    render() {
        const coursesList = [];
        this.state.courses.forEach((course) => {
            coursesList.push(<CourseBlock course={course}/>);
        });

        if (this.state.isLoaded) {
            return (
                <div className="Main">
                    <Base isAuthenticated={this.props.isAuthenticated}/>
                    <Menu/>
                    {coursesList}
                </div>);
        } else {
            return (
                <div className="Main">
                    <Base isAuthenticated={this.props.isAuthenticated}/>
                    <Menu/>
                </div>
            );
        }
    }
}

function Base(props) {
    if (props.isAuthenticated) {
        return (
            <div className="Label">
                <div className="MPTitle">
                    <text>LEARN AND CREATE</text>
                    <br/>
                </div>
            </div>
        );
    } else {
        return (
            <div className="Label">
                <div className="MPTitle">
                    <text>LEARN AND CREATE</text>
                    <NavLink className="Try-button" to='/registration'>Попробовать бесплатно</NavLink>
                    <br/>
                </div>
            </div>
        );
    }
}

function CourseBlock(props) {
    let path = "";
    if (props.course.image === null) {
        path = "https://yt3.ggpht.com/a/AGF-l7_tM_jmkKQ_T1sNRNBf-s7GZuhzFWbdEkSfHA=s900-c-k-c0xffffffff-no-rj-mo";
    } else {
        path = props.course.image.url;
    }

    let pathtocourse = "../course/" + props.course.courseId;
    return (
        <NavLink className="CourseBlock" to={pathtocourse}>
            <img className="ImgCourse" src={path}/>
            <text className="CourseName">{props.course.title}</text>
            <br/>
            <text className="CourseDescription">{props.course.description}</text>
        </NavLink>
    )
}

function Menu() {
    return (
        <div className="Menu">
            <div> Открытый доступ ко всем направлениям искусства</div>
            <div className="Menu-categories">
                <MenuItem name="Все категории"/>
                <MenuItem name="Дизайн"/>
                <MenuItem name="Каллиграфия"/>
                <MenuItem name="Музыка"/>
                <MenuItem name="Исскуство"/>
                <MenuItem name="Кино"/>
                <MenuItem name="Пение"/>
                <MenuItem name="Литература"/>
            </div>
        </div>
    );
}

function MenuItem(props) {
    return (
        <div className="Menu-item">
            {props.name}
        </div>
    )
}

export default MainPage;