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
            isLoaded: false
        };
        this.loadCourseInformation = this.loadCourseInformation.bind(this);
    }

    loadCourseInformation() {
        getCourseById(this.props.match.params.courseId).then(response => {
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

    render() {
        if (this.state.isLoaded) {
            return (
                <div className={styles.CoursePage}>
                    <NavBar courseId={this.state.course.courseId} courseName={this.state.course.title}/>
                    <br/>
                    <br/>
                    <br/>
                    <Switch>
                        <Route exact path={"/course/" + this.state.course.courseId}
                               render={(props) => <AboutCourse course={this.state.course}/>}/>
                        <Route exact path={"/course/" + this.state.course.courseId + "/comments"}
                               render={(props) => <CommentsCourse/>}/>
                        <Route exact path={"/course/" + this.state.course.courseId + "/content"}
                               render={(props) => <CourseContent/>}/>
                    </Switch>
                    <br/>
                </div>
            );
        } else {
            return (
                <div>
                    Course page
                </div>
            );
        }
    }
}

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick() {
        subscribe(this.props.courseId).then(response => {
            alert(response);
        }).catch(response => {
            alert(response.message);
        })
    };

    render() {
        return (
            <div className={styles.secondHead}>
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
                <button className={styles.Subscribe} onClick={this.handleOnClick}>Подписаться
                    на {this.props.courseName}</button>
            </div>
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
                        <img className={styles.ImageOfCourse} src={this.props.course.image.url} alt=""/>
                        <text className={styles.TextInMainBody}>
                            Мы приглашаем всех совершить online-путешествие по Басманному району! Почему именно этот
                            район Москвы? Все просто: он сохранил дух и настроение настоящей Москвы, время и городские
                            трансформации оказались не властны над уникальной живой атмосферой Басманного района.

                            Басманный район - настоящий музей Москвы под открытым небом. Наш адрес - не дом, не улица, а
                            вся территория Басманного района столицы, от Маросейки до Электрозавода. Это единство
                            культурно-исторического наследия, территории и, самое главное, опыта жителей. Это музей
                            городских микроисторий. Музей памятников культуры и архитектуры, знаковых деталей, которых
                            не всегда заметны глазу. Музей памяти о тех местах, которые исчезли из-за модернизации
                            города, но живы в воспоминаниях жителей...
                        </text>
                    </div>
                </div>
                <div className={styles.MarkOfTheCourse}>
                    <RatingBlock/>
                    <button className={styles.FeedbackSend}>Оставить отзыв</button>
                    <textarea className={styles.FeedbackText} name="comment" cols="30" rows="5"/>
                </div>
                <br/>
                <br/>
                <br/>
                <DescriptionBlock/>
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
            <div className={styles.videoWithDescription}>
                <text className={styles.titleOfCourse}>Басманные посиделки у директора Книжного клуба «Депо»,
                    журналиста, писателя и краеведа Олега Фочкина
                </text>
                <div className={styles.VideoWrapper}>
                    <ReactPlayer url="https://www.youtube.com/watch?v=uEP3Cx4Tu7E" controls={true}/>
                </div>
                <text className={styles.videoDescription}>
                    Олег Фочкин может очень эмоционально отстаивать то, что считает правильным. Может быть уютным и
                    гостеприимным. Ещё может быть совершенно кабинетным аналитиком - и ярким экскурсоводом...
                    Краевед, журналист, историк, автор книг о Москве, поэт и, конечно, житель Басманного Олег
                    Фочкин.
                    Летом мы пришли к нему в гости и сняли фильм проекта «Басманные посиделки».

                    Когда появились в России баклажаны и при чём здесь палаты Щербаковых? Что объединяет разведчика
                    Николая Кузнецова и любовницу товарища Берии? Как связаны Музей Басманного района и семейная
                    жизнь
                    Олега Фочкина? А морг больницы №6 - с пиццей? Где в Басманном были залежи курительных трубок и
                    обрывков тканей 17 века?..

                    А ещё мы говорили о том, как подружить Басманный с соседним Красносельским в пространстве
                    книжного
                    клуба «Депо» - и вот прошло всего ничего, а «Депо», увы, уже история...

                    Всё это - в фильме, фильм на ютюбе Басмании - смотрим по ссылке Олег Фочкин в проекте «Басманные
                    посиделки: в гостях у московских краеведов».

                </text>
            </div>
        );
    }
}


function RatingBlock() {
    return (
        <div className={styles.rating_block}>
            <input name="rating" value="5" id="rating_5" type="radio"/>
            <label htmlFor="rating_5" className={styles.label_rating}/>

            <input name="rating" value="4" id="rating_4" type="radio"/>
            <label htmlFor="rating_4" className={styles.label_rating}/>

            <input name="rating" value="3" id="rating_3" type="radio"/>
            <label htmlFor="rating_3" className={styles.label_rating}/>

            <input name="rating" value="2" id="rating_2" type="radio"/>
            <label htmlFor="rating_2" className={styles.label_rating}/>

            <input name="rating" value="1" id="rating_1" type="radio"/>
            <label htmlFor="rating_1" className={styles.label_rating}/>
        </div>
    );
}

function DescriptionBlock() {
    return (
        <div className={styles.Description}>
            <div>
                описание курса
            </div>
            <div>
                asdasdas
            </div>
            <div>
                asdasdas
            </div>
            <div>
                asdasdas
            </div>
            <div>
                asdasdas
            </div>
            <div>
                asdasdas111
            </div>
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