import React,{Component} from 'react'
import Footer from './footer'

import Header from './header'

import Modal from './modal'

function isAuth() {
    if ("user" in localStorage) {
        return (JSON.parse(localStorage.user)).username
    } else return null
}

class main extends Component{
    constructor(props) {
        super(props);
        this.state = {
			username: isAuth(),
			session: [],
			filterSession:[],
			error: null,
			modalActive: false,
			activeSession: null,
			
		};
		this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount() {
		const url = "http://localhost:8080/api/session"
		fetch(url)
      	.then((response) => response.json())
      	.then((result) => {
			this.setState({
			session: result
			})
			
      	},
      (error) => {
        this.setState({error});
      }
    );
			
	}
	handleClick(e,session) {
		e.preventDefault();
		if (session != null) {
			let sortPlaces = [];
			let min = session.hall.places[0].id;
			for (let i = 0; i < 25; i++) {
				if (min > session.hall.places[i].id) {
					min = session.hall.places[i].id
				}
			}
			for (let i = min; i <min + 25; i++){
				sortPlaces.push(session.hall.places[session.hall.places.findIndex(el => el.id === i)])
			}
			
			 session['sortPlaces'] = sortPlaces
			this.setState({activeSession: session})
			this.setState({ modalActive: !this.state.modalActive })
			
		} else this.setState({modalActive: !this.state.modalActive})
		
	}
	say(e) {
		console.log(e.target);
		e.target.classList.toggle("selected__date")
		document.getElementsByClassName("selected__date")[0].classList.remove("selected__date")
	}
	getDate(dayPlus) {
		let date = new Date()
		date.setDate(date.getDate() + dayPlus)
		return date
	}
	render() {
		const sessions = this.state.session;
		
        return (
            <div className="container">
				<Header/>

			<div className="days">
				<p onClick={this.say} className="selected__date">Сегодня</p>
				<p onClick={this.say} >Завтра</p>
				<p onClick={this.say}>{ this.getDate(2).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
				<p onClick={this.say}>{ this.getDate(3).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
				<p onClick={this.say}>{ this.getDate(4).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
			</div>
			
				{
					sessions.map(session =>
						<div key={ session.id} className="film__card">
							<img src={session.film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
							<h1>
								<a href={ "/film/" + session.film.id}>{session.film.title }</a>
							</h1>
							
						<h2>{(new Date(session.date)).toLocaleString("ru", {month: 'long', day: 'numeric', hour: 'numeric',minute: 'numeric'})}</h2>
						<p>{session.film.originTitle} ({ new Date(session.film.data).getFullYear()})</p>
						<p>Режиссер: { session.film.director}</p>
						<p>Жанр: { session.film.genre.map(genre => genre.genreName + " ")}</p>
						<p>{session.film.country} { session.film.duration}</p>
							<a href="/buy"  onClick={(e) => this.handleClick(e,session)}>
						<div className="buy__button">
							<div className="buy__button__border__one">
								<p>КУПИТЬ БИЛЕТ</p>
							</div>
							<div className="buy__button__border__two"></div>
						</div>
							</a>
							
					</div>
					)
				}
			
				<Modal active={this.state.modalActive} setActive={this.handleClick} session={ this.state.activeSession}/>
		
		</div>
        )
         
    }
    
}
export default main;