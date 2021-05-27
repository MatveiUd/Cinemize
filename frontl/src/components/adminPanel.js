import { Component } from "react";

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
            }
            };

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
                let buffDate1 = new Date()
                //buffDate.setDate(buffDate.getDate() - 1)
                
                console.log((buffDate.setDate((new Date()).getHours())) - buffDate1.setDate((new Date()).getHours()))
                console.log(buffDate);
                for (let i = 0; i < result.length; i++){
                    
                    console.log(buffDate < new Date(result[i].date));
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
    render() {
        return (
            
            <div className="container">
                <Header/>
                <div class="film__panel">
                    {
                        this.state.films.map(film => (
                            <div kay={film.id} class="added__film">
                                <img class="added__film__image" src={ film.frames[0].imageUrl}/>
                                <p class="added__film__name">{film.title}</p>
                            </div>
                        ))
                    }
				
			
						
				
				<div class="add__new__film">
					<div class="plus">
					</div>
				</div>		
			</div>
			
			<div class="schedule__edit">
				<h2 class="schedule__edit__title">СФОРМИРОВАТЬ РАСПИСАНИЕ</h2>
                    <div class="schedule__day">
                    <h3 class="schedule__day__title">01.01, Понедельник</h3>
					<div class="schedule__day__row">
                            {
                                this.state.sessions.map(session => (
                                  <div key={session.id} class="schedule__day__session">
                                    <img class="session__image" src={ session.film.frames[0].imageUrl}/>
                                    <div class="session__name__time">
                                            <p class="schedule__session__name">{ session.film.title}</p>
                                        <p class="schedule__session__time">{(new Date(session.date)).toLocaleString("ru",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric"})}</p>
                                    </div>
                                </div>
                              ))  
                        }
						
						
						<div class="add__new__film">
							<div class="plus">
							</div>
						</div>	
					</div>
				</div>
			</div>
			
		
			<div class="permission__button">
				<div class="permission__button__border__one">
					<p>Управление правами</p>
				</div>
				<div class="permission__button__border__two"></div>
			</div>
            </div>
        )
    }
}
export default Admin