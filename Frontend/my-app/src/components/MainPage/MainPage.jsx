import React, {Component} from "react";
import "./MainPage.css"

class MainPage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="Main">
                <Base/>
                <Menu/>
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