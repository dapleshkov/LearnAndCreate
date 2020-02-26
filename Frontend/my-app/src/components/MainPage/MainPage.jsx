import React, {Component} from "react";
import "./MainPage.css"
import {getRandomCourses} from "../ServerAPI/courseAPI";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lst: [
                {name: "c1", id: 1, duration: 12, mark: 3},
                {name: "asdlkg skajdhgkj sdfjkgh", id: 2, duration: 100, mark: 5},
                {name: "qwrdfhs dsfhsdjs sdfa", id: 3, duration: 10, mark: 4.2},
                {name: "c6", id: 4, duration: 122, mark: 3.4},
                {name: "c5", id: 5, duration: 1231, mark: 1}
            ]
        }
    }


    render() {
        return (
            <div className="Main">
                <Base/>
                <Menu/>
                <Courses courselst={this.state.lst}/>
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
    return(
        <div className="CourseBlock">
            <text className="Inf">{course.name}</text>
            <br/>
            <text className="Inf">{course.duration}</text>
            <br/>
            <text className="Inf">{course.mark}</text>
        </div>
    )
}

function Courses(props) {
    let course = props.courselst.map(p => CourseBlock(p));

    // getRandomCourses().then(response => {
    // });
    return (
        <div>
            {course}
        </div>
    )
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