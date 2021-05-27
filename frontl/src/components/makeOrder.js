import { Component } from "react";

import topPanelImage from "../img/midsommarTopPannel.png"
import Header from "./header"

function isAuth() {
    if ("user" in localStorage) {
        return JSON.parse(localStorage.user)
    } else return null
}
function isAuthBoolean() {
	if ("user" in localStorage) {
        return true
    } else return false
}
class MakeOrder extends Component{
	constructor(props) {
		super(props)
		this.state = {
			user:isAuth(),
			session: [],
			isLoad: false,
			cost: 0,
			selectedPlaces: [],
			pointsInput: "",
			cardInput: ""
		}
		this.handleChange = this.handleChange.bind(this)
		this.buyTicket = this.buyTicket.bind(this)
		this.inputDiscount = this.inputDiscount.bind(this)
	}
	componentDidMount() {
		let id = new URLSearchParams(this.props.location.search).get("id")
		
		const url = `http://localhost:8080/api/session/${id}`
		fetch(url)
      	.then((response) => response.json())
			.then((result) => {
				
				let buffArr = []
				let buff = result
				buff["sortPlace"] = this.sortPlace(result)
				
				
				buffArr.push(buff)
				console.log(buff);
				this.setState({
				
					session: buffArr,
					
				isLoad: true,
				
				})
	
			
			
			
      	},
      (error) => {
        this.setState({error});
      }
		);
		
	}
	inputDiscountStatus(value) {
		if (value == "" || value == "0") {
			return true
		} else return false
	}
	inputDiscount(e) {
		
		if (e.target.className == "card__number__input") this.setState({cardInput: e.target.value})
		else if (e.target.className == "point__input") this.setState({pointsInput: e.target.value})
		
	}
	sortPlace(session) {
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
			return doubleSort
			
		} else return []
		
	}
	buyTicket(e) {
		e.preventDefault()
		
		if (parseInt(document.getElementsByClassName("point__input")[0].value) < this.state.user.score) {
			let placeId = []
			for (let i = 0; i < this.state.selectedPlaces.length;i++) placeId.push(this.state.selectedPlaces[i].id)
			// let checkboxes = e.target.elements.place
			// let placeId = []
			// for (let i = 0; i < checkboxes.length; i++){
			//     if (checkboxes[i].checked) {
			//         console.log(checkboxes[i].id)
			//         placeId.push(checkboxes[i].id)
			//     }
			// }
			let data = {
				placeId: placeId,
				cost: this.state.session[0].cost,
				usedScore: document.getElementsByClassName("point__input")[0].value,
				bonusCardNumber: document.getElementsByClassName("card__number__input")[0].value,
				sessionId: this.state.session[0].id,
				email: document.getElementsByClassName("email__input")[0].value

			}
			console.log(data);
			let formData = new FormData();
			formData.append('placeId', placeId);
			formData.append('cost', this.state.session[0].cost);
			formData.append('usedScore', document.getElementsByClassName("point__input")[0].value)
			formData.append('bonusCardNumber',  document.getElementsByClassName("card__number__input")[0].value)
			formData.append('sessionId',  this.state.session[0].id)
			formData.append('email',document.getElementsByClassName("email__input")[0].value)
			const url = "http://localhost:8080/api/order"
			const headers = new Headers();
			if ("user" in localStorage) {
			    headers.set('Authorization', 'Basic ' + localStorage.authData)    
			}
			
			fetch(url, {
			    method: "POST",
			    body: formData,
			    headers
			})
			    .then(response => {
			        console.log(response);
			    if (response.ok) {
			        alert("Заказ успешно создан")
			    } else if (response.status === 401) {
			        alert("Вы не вошли в систему")
			    }
			})
		}else alert("Многовато баллов, не думаете?")
		
    }
	handleChange(e) {
		
		
		if (e.target.checked) {
			let selectedPlaces = this.state.selectedPlaces
			selectedPlaces.push((this.state.session[0].hall.places.filter(place => place.id == e.target.id))[0])

			this.setState({
				cost: this.state.cost + this.state.session[0].cost,
				selectedPlaces: selectedPlaces
			})
		}
		else {
			let selectedPlaces = this.state.selectedPlaces
			selectedPlaces.splice(selectedPlaces.findIndex(place => place.id == e.target.id),1)
			
			
			this.setState({
				cost: this.state.cost - this.state.session[0].cost,
				selectedPlaces: selectedPlaces
			})
		}
		
    }
    
	render() {
		
        if(this.state.isLoad){
			return (
				<div className="container">
					<Header />
					{
							this.state.session.map(session => (
								<div key={session.id} className="buying__tickets">
						
									<div className="top__pannel">
										<div className="top__pannel__image__container">
												<img src={topPanelImage} />
										</div>	
										<div className="top__pannel__data">
											<div>
												<h1 className="top__pannel__film">{ session.film.title}</h1>
												<p className="top__pannel__session">{(new Date(session.date)).toLocaleString("ru", { day: "numeric", month: "long" })}
												, {(new Date(session.date)).toLocaleString("ru", { hour: "numeric", minute: "numeric" })}
												, Зал {session.hall.number}</p>
											</div>
										</div>
									</div>
									<div className="screen__container">
										<img className="screen"/>	
									</div>
									<div className="center__pannel">

										<div className="place__numbers">
											<p>1</p>
											<p>2</p>
											<p>3</p>
											<p>4</p>
											<p>5</p>
										</div>
										<div className="scheme">
											<form className="places__container">
												{
													session.sortPlace.map((row,index) => (
														<div key={index} className="places__row">
															{
																row.map(place => (
																	<div key={place.id} className="checkbox__holder">
																		<input id={place.id}
																			
																			name="place"
																			type="checkbox"
																			className={place.free ? "place" : "place place__locked"}
																			
																			disabled={place.free ? false : true}
																			onChange={this.handleChange} />
										
																	</div>
																))
															}
														</div>
													))
												}
											</form>
											<div className="scheme__info__container">
												<div className="scheme__info">
													<div className="example_free">
													</div>
													<p>СВОБОДНОЕ МЕСТО</p>
												</div>
												<div className="scheme__info">
													<div className="example_occupied">
													</div>
													<p>ЗАНЯТОЕ МЕСТО</p>
												</div>
											</div>
										</div>
										<div className="selected__places">
											<h2>ВЫБРАННЫЕ МЕСТА</h2>
											<div className="selected__places__container">
												{
													this.state.selectedPlaces.map((selectedPlace,index) => (
														<p key={index}>РЯД {selectedPlace.row} МЕСТО {selectedPlace.number}</p>
													))
												}
												
											</div>
											<h3 className="ticket__cost">ЦЕНА БИЛЕТА: {session.cost}₽</h3>
										</div>
									</div>
									<div className="bottom__pannel">
										<div className="bottom__container">
												<div className="bottom__inputs">
													<h1>СКИДКА</h1>
													<div className="bottom__input__row">
													
													<h2>НОМЕР КАРТЫ</h2>
													<input type="text"
														className="card__number__input"
														placeholder="ABC123"
														disabled={this.inputDiscountStatus(this.state.pointsInput) ? false : true}
														onChange={(e) => this.inputDiscount(e) }/>
												</div>
												<div className="bottom__input__row">
													
													<h2 >БАЛЛЫ</h2>
													<input type="text"
														className="point__input"
														placeholder="0"
														disabled={isAuthBoolean() && this.inputDiscountStatus(this.state.cardInput) ? false : true}
														onChange={(e) => this.inputDiscount(e) }/>
												</div>
												<div className="bottom__input__row">
													<h2>EMAIL</h2>
													<input type="text" className="email__input" value={isAuthBoolean() ? this.state.user.username : ""} placeholder="example@mail.com" />
												</div>
											</div>
										</div>
										<div className="buy__button" onClick={this.buyTicket}>
											<div className="buy__button__border__one">
												<p >{this.state.cost}₽ | ОПЛАТИТЬ</p>
											</div>
											<div className="buy__button__border__two"></div>
										</div>
									</div>
								</div>
							))
					}
					
					</div>
			)
		} else return (<h1>Загрузочка</h1>)
        
    }
}
export default MakeOrder