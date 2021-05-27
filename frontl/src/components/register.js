import { React, Component } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import { Redirect} from 'react-router'
import logo from '../img/logo.png'
import Footer from './footer'

function isAuth() {
	if ("user" in localStorage) return "/lk"
	else return null
}
class Regiser extends Component{
	constructor(props) {
		super(props)
		this.state = {
			value: "",
			referrer: isAuth()
		}
		this.registration = this.registration.bind(this)
	}
	registration(e) {
		e.preventDefault()
		let formData = new FormData()
		let date = new Date(e.target.elements.birthday.value)
		formData.append('email', e.target.elements.email.value)
		formData.append('name', e.target.elements.name.value)
		formData.append('birthdate', date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear())
		formData.append('phonenumber',e.target.elements.phone.value)
		const url = "http://localhost:8080/registration"
		fetch(url, {
			method: "POST",
			body: formData
		})
		.then(response => {
            if (response.ok) {
				alert("Пользователь успешно создан, проверьте почту!")
				this.setState({referrer:'/login'})
            } else if (response.status === 400) {
                alert("Пользователь с таким e-mail уже сущестует")
            }
        })
		
	}
	
    render() {
		const {referrer} = this.state
        if (referrer) return <Redirect to={referrer} />
        return (

            <div class="container">
                	<a href="/">
						<img className="logo" src={ logo} alt="Картинка загружается"  property="image"/>
					</a>
                <form class="login__form_regiser" onSubmit={this.registration}>
                
				<div class="form__inputs_regiser">
					<h1 htmlFor="email">EMAIL</h1>
					<input type="email" name="email" required/>
					<h1 htmlFor="name">ИМЯ</h1>
					<input type="text" name="name" required/>
					<h1 htmlFor="birthday">ДАТА РОЖДЕНИЯ</h1>
					<input type="date" name="birthday" required/>
					<h1 htmlFor="phone">ТЕЛЕФОН</h1>
					<PhoneInput name="phone" placeholder="+7 923 456 98 56" required value={ this.state.value} onChange={(e) => this.setState({value: e}) } ></PhoneInput>
				</div>
				<div class="buttons_regiser">
					<button class="button_regiser" type="submit">
						<div class="button__border__one_regiser">
							<p>СОЗДАТЬ АККАУНТ</p>
						</div>
						<div class="button__border__two_regiser"></div>
					</button>	
				</div>
				</form>
				<Footer/>
            </div>
            
        )
    }
}
export default Regiser