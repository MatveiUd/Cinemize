import React,{Component} from 'react'
import logo from '../img/logo.png'


class main extends Component{
    logout() {
        localStorage.clear()
        window.location.reload()
    }
    isAdmin() {
        if ("user" in localStorage) {
            let user = JSON.parse(localStorage.user)
            if (user.roles.includes("ADMIN")) {
                return true
            }
        } else return false     
    }
    isSchedule() {
        if (window.location.pathname === "/") {
            
            return true
        } else return false
    }
    isFilms() {
        if (window.location.pathname === '/films') {
            
            return true
        } else return false
    }
    isVisitors() {
        if (window.location.pathname === '/visitors') {
            
            return true
        } else return false
    }
    render() {
        let name;
        if ("user" in localStorage) {
            name = 
                    <a href="/lk" className="login__button">
                        
                        <img alt="Картинка загружается"  property="image" />
                <p>{JSON.parse(localStorage.user).name}</p>
                      
					</a>
        } else name = <a href="/login" className="login__button">
            <img alt="Картинка загружается" property="image" />
            <p>вход</p>
					</a>
        let header;
        header =
            <div className="container">
            <a href="/">
                <img className="logo" src={ logo} alt="Картинка загружается"  property="image"/>
            </a>
                

			<div className="contact__info">
				<div>
					<p className="adress">Санкт-Петербург,</p>
					<p className="adress">Варшавская, 3</p>
				</div>
				<div className="phone__account">
					<p className="phone__number">+7 (911) 404-76-97</p>
                    { name}
				</div>
			</div>

			<div className="menu">
				<a href="/">
					<div className={this.isSchedule() ? "menu__button active" : "menu__button "}>
						<div className="menu__button__border__one"></div>
						<div className="menu__button__border__two"></div>
						<p>РАСПИСАНИЕ</p>
					</div>
				</a>
				<a href="/films">
					<div  className= {this.isFilms() ? "menu__button active" : "menu__button "} >
						<div className="menu__button__border__one"></div>
						<div className="menu__button__border__two"></div>
						<p>ФИЛЬМЫ</p>
					</div>
				</a>
				<a href="/visitors">
					<div className= {this.isVisitors() ? "menu__button active" : "menu__button "}>
						<div className="menu__button__border__one"></div>
						<div className="menu__button__border__two"></div>
                        <p>{ this.isAdmin() ? "АДМИН" : "ПОСЕТИТЕЛЯМ"}</p>
					</div>
				</a>
			</div>
            </div>
            
        
        return (
            <div>
                {header}
            </div>
        )
    }
    
}
export default main;