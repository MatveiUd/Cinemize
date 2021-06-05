import React, { Component } from 'react'
import { Redirect} from 'react-router'
import logo from '../img/logo.png'
import Footer from './footer';


function isAuth() {
	if ("user" in localStorage) {
		return null;
	} else return "/login"		
}
function getUser() {
	if ("user" in localStorage) {
        return JSON.parse(localStorage.user)
    } else return null
}
class UserProfile extends Component{
    constructor(props) {
        super(props);
		this.state = {
			referrer: isAuth(),
			user: getUser(),
			isChange: false,
			paidOrder: []
		}
        
		this.logout = this.logout.bind(this)
		this.say=  this.say.bind(this)
        
    }
	componentDidMount() {
		const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)

		const url = "http://localhost:8080/user"
        fetch(url, {
            method: "GET",
            headers
        })
			.then(response => response.json())
			
			.then(result => {
				console.log(result);
				let buff = []
				for (let i = 0; i < result.orders.length; i++){
					if (result.orders[i].padFor == true) {
						buff.push(result.orders[i])
					}
				}
				
				this.setState({
					user: result,
					paidOrder: buff
				})
				
			})
	}
	logout(e) {
		e.preventDefault()
		localStorage.clear();
		this.setState({referrer: "/login"})
	}
	say(e) {
		e.preventDefault()
		this.setState({isChange: !this.state.isChange})
		
	}
	changePassword(e) {
		e.preventDefault()
		
		let username = e.target.elements.email.value
		let password = e.target.elements.oldpassword.value
		if (/[0-9a-zA-Z]/.test(password)) {
			let userPassInBase64 = btoa(username + ':' + password);
		
			if (e.target.elements.newpassword.value === e.target.elements.newpasswordagain.value) {
				let userPassInBase64New = btoa(username + ':' + e.target.elements.newpassword.value);
				const headers = new Headers();
				headers.set('Authorization', 'Basic ' + userPassInBase64)
				let formData = new FormData()
				formData.append("password", e.target.elements.newpassword.value)
				const url = "http://localhost:8080/changepass"
				fetch(url, {
					method: "POST",
					body: formData,
					headers
				})
				.then(response => {
					if (response.ok) {
						
						localStorage.setItem("authData", userPassInBase64New)
						alert("Пароль успешно изменен")
						
					} else if (response.status === 401) {
						alert("Неверный пароль")
					}
			})
			} else alert("Пароли не совпадают" )	
		} else alert("Пароль должен состоять из латинских символов")
		
		
		
			
		
	}
    render() {
		const {  user, referrer } = this.state;
		if(referrer) return <Redirect to={referrer} ></Redirect>
        return (
            <div className="container">
				<a href="/">
					<img className="logo" src={ logo} alt="Картинка загружается"  property="image"/>
				</a>
            

			<div className="contact__info">
				<div>
					<p className="adress">Санкт-Петербург,</p>
					<p className="adress">Варшавская, 3</p>
				</div>
				<div>
					<p className="phone__number">+7 (911) 404-76-97</p>
					<a  className="logout__button" onClick={this.logout}>
						<img alt="Картинка загружается"  property="image"/>
						<p>ВЫХОД</p>
					</a>
				</div>
			</div>

			<div className="profile__info">
				<h1>ИНФОРМАЦИЯ</h1>
				<form onSubmit={this.changePassword} >
					<div className="profile__form">
						<div className="form__inputs">
							<div className="input__line">
								<div className="certain__input">
									<h1 htmlFor="name">ИМЯ</h1>
                                    <input type="text" name="name" value={ user.name} disabled/>
								</div>
								<div className="certain__input">
									<h1 htmlFor="email">EMAIL</h1>
									<input type="text" name="email" value={ user.username} disabled/>
								</div>
							</div>
							<div className="input__line">
								<div className="certain__input">
									<h1 htmlFor="birthday">ДАТА РОЖДЕНИЯ</h1>
									<input type="text" name="birthday" value={ user.birthdate} disabled/>
								</div>
								<div className="certain__input">
									<h1 htmlFor="phone">ТЕЛЕФОН</h1>
									<input type="tel" name="phone" value={ user.phoneNumber} disabled/>
								</div>
							</div>
						</div>
						<div className="points__container">
							<div className="points">
								<h1>БАЛЛЫ</h1>
											<p className="points__number__one">{ user.score}</p>
									<p className="points__number__two">{user.score}</p>
							</div>
						</div>
						</div>
						{this.state.isChange
							? <div>
								<div class="password__changing">
									<div class="form__inputs">
										<div class="input__line">
											<div class="certain__input">
												<h1 for="oldpassword">СТАРЫЙ ПАРОЛЬ</h1>
												<input type="password" name="oldpassword" />
											</div>
											<div class="certain__input">
												<h1 for="newpassword">НОВЫЙ ПАРОЛЬ</h1>
												<input type="password" name="newpassword"/>
											</div>
											<div class="certain__input">
												<h1 for="newpasswordagain">ПОВТОРИТЕ ПАРОЛЬ</h1>
												<input type="password" name="newpasswordagain"/>
											</div>
										</div>
									</div>
								</div>	
						
					
								<div class="buttons">
									<button class="button" type="submit" >
										<div class="button__border__one">
											<p>СОХРАНИТЬ ИЗМЕНЕНИЯ</p>
										</div>
										<div class="button__border__two"></div>
									</button>	
								</div>
							</div> 
						 	: <div className="buttons">
								<button className="button"  onClick={this.say}>
								<div className="button__border__one">
									<p>ИЗМЕНИТЬ</p>
								</div>
								<div className="button__border__two"></div>
								</button>	
							</div>
						 }
					
				</form>
			</div>

			
			<div className="your__sessions">
				<h1>ВАШИ СЕАНСЫ</h1>
				<div className="sessions">
					{
						this.state.paidOrder.map(order => (
						<div key={order.id} className="session">
							<div><img src={order.tickets[0].sessionId.film.frames[1].imageUrl} alt="Картинка загружается"  property="image"/></div>
										
								<div className="session__info">
									<p className="film__name">{ order.tickets[0].sessionId.film.title}</p>
									<p className="film__date">{ (new Date(order.tickets[0].sessionId.date)).toLocaleString("ru",{month: 'long', day: 'numeric',year: 'numeric'})}</p>
									<p className="film__time">{(new Date(order.tickets[0].sessionId.date)).toLocaleString("ru",{ hour: 'numeric',minute: 'numeric'})}</p>
								</div>
							</div>
						))
					}			

							
				</div>
			</div>
		
			<Footer/>
		</div>
                    
                )
    }
}
export default UserProfile