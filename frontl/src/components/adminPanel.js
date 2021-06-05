import { Component } from "react";
import { Redirect } from "react-router";

import Header from './header'

class Admin extends Component{
    constructor(props) {
        super(props)
        this.state = {
            error: null,
            films: [],
            sessions: [],
            filterSessions: {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            },
            referrer: null
            };
            this.routing = this.routing.bind(this)
    }
    componentDidMount() {
        const urlFulm = "http://localhost:8080/api/film"
    
        fetch(urlFulm)
        .then((response) => response.json())
        .then((result) => {
            this.setState({
            films: result
            })
            console.log(result);
        },
        (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
        );
        const urlSession = "http://localhost:8080/api/session"
		fetch(urlSession)
      	.then((response) => response.json())
            .then((result) => {
            let  filterSessions = {
                monday: [],
                tuesday: [],
                wednesday: [],
                thursday: [],
                friday: [],
                saturday: [],
                sunday: []
            }
                
                let buffDate = new Date()
               
                buffDate.setHours(0)
                buffDate.setMinutes(0)
                buffDate.setSeconds(0)

                for (let i = 0; i < result.length; i++){
                    if (buffDate < new Date(result[i].date)) {
                        switch ((new Date(result[i].date)).toLocaleString("en", { weekday: "long" })) {
                        case "Monday":
                            filterSessions.monday.push(result[i])
                            break;
                        case "Tuesday":
                            filterSessions.tuesday.push(result[i])
                            break;
                        case "Wednesday":
                            filterSessions.wednesday.push(result[i])
                            break;
                        case "Thursday":
                            filterSessions.thursday.push(result[i])
                            break;
                        case "Friday":
                            filterSessions.friday.push(result[i])
                            break;
                        case "Saturday":
                            filterSessions.saturday.push(result[i])
                            break;
                        case "Sunday":
                            filterSessions.sunday.push(result[i])
                            break;
                    
                        default:
                            break;
                    }
                    }
                    
                    
                }
                
			this.setState({
				sessions: result,
				filterSessions: filterSessions
			})
			console.log(this.state.filterSessions);
      	},
      (error) => {
        this.setState({error});
      }
    );
    }
    routing(e) {
		e.preventDefault()
        console.log(e.target);
        if (e.target.id === "film") this.setState({ referrer: "/addfilm" })
        if (e.target.id === "session") this.setState({ referrer: "/addsession" })
        if (e.target.id === "users") this.setState({ referrer: "/users" })
		//this.setState({referrer: "/login"})
	}
    render() {
        
        if(this.state.referrer) return <Redirect to={this.state.referrer} ></Redirect>
        return (
            
            <div className="container">
                <Header />
                <h2 class="film__edit__title">ФИЛЬМЫ</h2>
                <div class="film__panel">
                    {
                        this.state.films.map(film => (
                            <div kay={film.id} class="added__film">
                                <img class="added__film__image" src={ film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                <p class="added__film__name">{film.title}</p>
                            </div>
                        ))
                    }
				
			
						
				
				<div class="add__new__film" >
					<div class="plus" id="film" onClick={this.routing}>
					</div>
				</div>		
			</div>
			
			<div class="schedule__edit">
				<h2 class="schedule__edit__title">РАСПИСАНИЕ</h2>
                    <div class="schedule__day">
                    <h3 class="schedule__day__title">Понедельник</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.monday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                    </div>
                    <h3 class="schedule__day__title">Вторник</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.tuesday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                    </div>
                    <h3 class="schedule__day__title">Среда</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.wednesday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                        </div>
                    <h3 class="schedule__day__title">Четверг</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.thursday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                        </div>
                    <h3 class="schedule__day__title">Пятница</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.friday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                        </div>
                    <h3 class="schedule__day__title">Суббота</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.saturday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
						
						
							
                        </div>
                        <h3 class="schedule__day__title">Воскресенье</h3>
					<div class="schedule__day__row">
                            {
                                this.state.filterSessions.sunday.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                            }
		
                        </div>
                        <h3 class="schedule__day__title">Добавить</h3>
                        <div class="schedule__day__row">                           
                            <div class="add__new__film" >
                                <div class="plus" id="session" onClick={this.routing}>
                                </div>
                            </div>
                        </div>
				</div>
			</div>
			
		
			<div class="permission__button" >
				<div class="permission__button__border__one" >
					<p >Управление правами</p>
				</div>
				<div class="permission__button__border__two" id="users" onClick={this.routing}></div>
			</div>
            </div>
        )
    }
}
export default Admin