import React,{Component} from 'react'

const styles = {
    a: {
        display:"inline-block",
        padding:"10px"
    }
}
class main extends Component{
    render() {
    
        return (
            <div >
                <a style={styles.a} href="/main">Главная страница</a>
                <a style={styles.a} href="/films">Все фильмы</a>
                <a style={styles.a} href="/lk">Личный кабинет</a>
            </div>
            

        )
    }
    
}
export default main;