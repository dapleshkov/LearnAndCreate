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
        alert(1);
        getRandomCourses().then(response => {
            debugger;
            alert(2)
            const list = this.state.courses.slice();
            this.setState({
                courses: new Array(response)
            });
            alert(this.state.courses);
        });
        alert(this.state.courses);
    }

    componentDidMount() {
        this.loadCourses();
    }
    render() {
        this.loadCourses();
        alert(3)
        return (
            <div className="Main">
                <Base/>
                <Menu/>
                <Courses courses={this.state.courses}/>
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

function CourseBlock(course) {
    return (
        <div className="CourseBlock">
            <text className="Infa">{course.title}</text>
            <br/>
            <text className="Infa">{course.duration}</text>
            <br/>
            <text className="Infa">{course.category.name}</text>
        </div>
    )
}

function Courses(props) {
    let corses = props.courses.map(p => {
        CourseBlock(p)
    });
    alert(4);
    return (
        {corses}
    );
}

function Menu() {
    return (
        <div className="Menu">
            <div className="Menu-head"> Открытый доступ ко всем направлениям искусства</div>
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