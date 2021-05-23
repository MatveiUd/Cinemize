import React, { Component} from 'react'
import { Redirect } from 'react-router';
import logo from '../img/logo.png'


function isAuth() {
	if ("user" in localStorage) return "/lk"
	else return null
}
class login extends Component{
     constructor(props) {
        super(props);
        this.state = {
            referrer: isAuth(),
         };
         this.auth = this.auth.bind(this);
    }
    async auth(e) {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value

        const userPassInBase64 = btoa(username + ':' + password);

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + userPassInBase64)


        const url = "http://localhost:8080/user"
        const response = await fetch(url, {
            method: "GET",
            headers
        })
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("authData", userPassInBase64)
            localStorage.setItem("user", JSON.stringify(data))
            this.setState({referrer:'/lk'})
        } else if (response.status === 401) {
            alert('Пользователь не найден')
        } else {
            throw new Error('invalid response')
        }
    
    }
    render() {
        
        
        const {referrer} = this.state
        if (referrer) return <Redirect to={referrer} />
        else {
            return (

            <div class="container">
                        <a href="/">
							<img className="logo" src={ logo} alt="Картинка загружается"  property="image"/>
						</a>
			<form class="login__form" onSubmit={this.auth}>
				<div class="form__inputs">
					<h1  htmlFor="email">EMAIL</h1>
					<input type="email" name="username"/>
					<h1 htmlFor="password">ПАРОЛЬ</h1>
					<input type="password" name="password"/>
				</div>
				<div class="buttons_login">
					<button class="button_login" type="submit">
						<div class="button__border__one_login">
							<p>ВОЙТИ</p>
						</div>
						<div class="button__border__two_login"></div>
					</button>	
					<a href="/regitration">
						<button class="button_login" type="button">
							<div class="button__border__one_login">
								<p>РЕГИСТРАЦИЯ</p>
							</div>
							<div class="button__border__two_login"></div>
						</button>
					</a>
				</div>
                    </form>
                
            </div>
            )    
        }
        
        
        
    }
}
export default login