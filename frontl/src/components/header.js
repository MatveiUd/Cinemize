import React,{Component} from 'react'

const styles = {
    a: {
        display:"inline-block",
        padding:"10px"
    }
}

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
    render() {
        let header;
        if ("user" in localStorage) {
            if (this.isAdmin()) {
                header =
                <div >
                    <a style={styles.a} href="/main">Главная страница</a>
                    <a style={styles.a} href="/films">Все фильмы</a>
                    <a style={styles.a} href="/lk">Личный кабинет</a>
                    <a style={styles.a} href="/addfilm">Добавить фильм</a>
                    <a style={styles.a} href="/users">Пользователи</a>
                    <button onClick={this.logout} >Выйти</button>
                </div>
            } else {
               header =
                <div >
                    <a style={styles.a} href="/main">Главная страница</a>
                    <a style={styles.a} href="/films">Все фильмы</a>
                    <a style={styles.a} href="/lk">Личный кабинет</a>
                    <button onClick={this.logout} >Выйти</button>
                </div> 
            }
            
        } else {
            header =
                <div>
                    <a style={styles.a} href="/main">Главная страница</a>
                    <a style={styles.a} href="/films">Все фильмы</a>
                    <a style={styles.a} href="/login">Войти</a>
                </div>
                
                
        }
        return (
            <div>
                {header}
            </div>
        )
    }
    
}
export default main;