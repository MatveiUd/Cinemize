import React,{Component} from 'react'
import Footer from './footer'

import Header from './header'

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
		this.changeDay = this.changeDay.bind(this)
	}
	componentDidMount() {
		const url = "http://localhost:8080/api/session"
		fetch(url)
      	.then((response) => response.json())
			.then((result) => {
				let filterSession = []
				for (let i = 0; i < result.length; i++){
					if ((new Date(result[i].date)).getDate() === (new Date()).getDate()) {
						filterSession.push(result[i])
					}
				}
			this.setState({
				session: result,
				filterSession: filterSession
			})
			console.log(result);
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
			let doubleSort = [];
			let min = session.hall.places[0].id;
			for (let i = 0; i < 25; i++) {
				if (min > session.hall.places[i].id) {
					min = session.hall.places[i].id
				}
			}
			for (let i = min; i <min + 25; i++){
				sortPlaces.push(session.hall.places[session.hall.places.findIndex(el => el.id === i)])
			}
			let buffArr1 = [];
			let buffArr2 = [];
			let buffArr3 = [];
			let buffArr4 = [];
			let buffArr5 = [];
			for (let i = 0; i < sortPlaces.length; i++) {
				
				if (i < 5) buffArr1.push(sortPlaces[i])
				if (i > 4 && i < 10) buffArr2.push(sortPlaces[i])
				if (i > 9 && i < 15) buffArr3.push(sortPlaces[i])
				if (i > 14 && i < 20) buffArr4.push(sortPlaces[i])
				if (i > 19 && i < 25) buffArr5.push(sortPlaces[i])	
			}
			doubleSort.push(buffArr1);
			doubleSort.push(buffArr2);
			doubleSort.push(buffArr3);
			doubleSort.push(buffArr4);
			doubleSort.push(buffArr5);
			console.log(doubleSort);
			 session['sortPlaces'] = doubleSort
			this.setState({activeSession: session})
			this.setState({ modalActive: !this.state.modalActive })
			
		} else this.setState({modalActive: !this.state.modalActive})
		
	}
	changeDay(e) {
		document.getElementsByClassName("selected__date")[0].classList.remove("selected__date")
		e.target.classList.toggle("selected__date")
		let sessions = this.state.session;
		let filterSession = [];
		let day = document.getElementsByClassName("selected__date")[0].textContent
		let selectDay = 0;
		if (day === "Сегодня") selectDay = (new Date()).getDate()
			else if (day === "Завтра") selectDay = (new Date()).getDate() + 1
		else selectDay = parseInt(day.substring(0, 2));
		
		for (let i = 0; i < sessions.length; i++){
			
			if ((new Date(sessions[i].date)).getDate() === selectDay) {
				
				filterSession.push(sessions[i])
			}
		}
		this.setState({filterSession: filterSession})
		
	}
	getDate(dayPlus) {
		let date = new Date()
		date.setDate(date.getDate() + dayPlus)
		return date
	}
	render() {
		const sessions = this.state.filterSession;
		
        return (
            <div className="container">
			<Header/>

			<div className="days">
				<p onClick={this.changeDay} className="selected__date">Сегодня</p>
				<p onClick={this.changeDay} >Завтра</p>
				<p onClick={this.changeDay}>{ this.getDate(2).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
				<p onClick={this.changeDay}>{ this.getDate(3).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
				<p onClick={this.changeDay}>{ this.getDate(4).toLocaleString("ru",{month: "numeric",day: "numeric" })}</p>
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
						<p>Режиссер: { session.film.director.map(director => director.name)}</p>
						<p>Жанр: { session.film.genre.map(genre => genre.genreName + " ")}</p>
						<p>{session.film.country.map(country => country.name + " ")} { session.film.duration}</p>
							<a href={`/buy?id=${session.id}`}  >
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

				<Footer/>
		</div>
        )
         
    }
    
}

export default main;