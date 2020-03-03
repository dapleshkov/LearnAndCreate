import React, {Component} from "react";
import "./Settings.css";
import {Form} from "antd";

class EditName extends Component {
    render() {
        return (
            <Form className="MainBlock">
                <text className="Title">Изменить имя</text>
                <hr className="separator"></hr>
                <Form.Item>
                    <text className="Info">Новое имя</text>
                    <input className="Changes"/>
                </Form.Item>
                <br/>
                <Form.Item>
                    <text className="Info">Новый позывной</text>
                    <input className="Changes"/>
                </Form.Item>
                <Form.Item>
                    <button className='Submit'>Сохранить изменения</button>
                </Form.Item>
            </Form>
        );
    }
}

export default EditName;