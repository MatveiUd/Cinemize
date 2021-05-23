import { React, Component } from 'react'

class Footer extends Component{
    render() {
		return (
			<div className="container">
					<div className="footer">
				<div className="left__column">
					<p>АДРЕС КИНОТЕАТРА</p>
					<p>Санкт-Петербург</p>
					<p>ул. Варшавская, д.3</p>
					<p><a href="/map">Посмотреть на карте</a></p>
					<p><a href="/rules">Правила посещения</a></p>
				</div>
				<div className="right__column">
					<p>ПОЗВОНИТЕ НАМ</p>
					<p>+7 (911) 404-76-97</p>
					<br/>
					<p>НАПИШИТЕ НАМ</p>
					<p>cinemize@gmail.com</p>
			    </div>
				</div>
			</div>
            
        )
    }
}
export default Footer