import React, {Component} from "react";
import "./MainPage.css"
import {getRandomCourses} from "../ServerAPI/courseAPI";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        };
        this.loadCourses = this.loadCourses.bind(this);
    }


    loadCourses() {
        getRandomCourses().then(response => {
            this.setState({
                courses: JSON.parse(JSON.stringify(response))
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

        return (
            <div className="Main">
                <Base/>
                <Menu/>
                {coursesList}
            </div>);
    }
}

function Base() {
    return (
        <div className="Label">
            <div>
                <text fontSize="60">
                    LEARN AND CREATE
                </text>
            </div>
            <div>
                <button className="Try-button">
                    Попробовать бесплатно
                </button>
            </div>
        </div>
    );
}


function CourseBlock(props) {
    let path = "";
    if (props.course.image === null) {
        path = "https://yt3.ggpht.com/a/AGF-l7_tM_jmkKQ_T1sNRNBf-s7GZuhzFWbdEkSfHA=s900-c-k-c0xffffffff-no-rj-mo";
    } else {
        path = props.course.image;
    }

    return (
        <div className="CourseBlock">
            <img className="ImgCourse" src={path}
                 width="100" height="100"/>
            <br/>
            <text className="Infa">{props.course.title}</text>
            <br/>
            <text className="Infa">{props.course.description}</text>
        </div>
    )
}

function Menu() {
    return (
        <div className="Menu">
            <div className="Menu-head"> Открытый доступ ко всем направлениям искусства</div>
            <div className="Menu-categories">
                <MenuItem name="Все категории"/>
                <MenuItem name="Дизайн"/>
                <MenuItem name="Каллиграфия"/>
                <MenuItem name="История"/>
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