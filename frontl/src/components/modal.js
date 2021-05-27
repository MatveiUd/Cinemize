import { React, Component } from 'react'
import '../styles/modal.css'

function getUserEmail() {
    if ("user" in localStorage) {
        return JSON.parse(localStorage.user).username
    } else return ""
}
class Modal extends Component{
    constructor(props) {
        super(props)
        this.state = {
            cost: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.clearCost = this.clearCost.bind(this)
    }
    buyTicket(e,cost,sessionId) {
        e.preventDefault()
        
        let checkboxes = e.target.elements.place
        let placeId = []
        for (let i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].checked) {
                console.log(checkboxes[i].id)
                placeId.push(checkboxes[i].id)
            }
        }
        console.log(cost, sessionId);
        let formData = new FormData();
        formData.append('placeId', placeId);
        formData.append('cost', this.state.cost);
        formData.append('usedScore', 0)
        formData.append('bonusCardNumber', "AKD781")
        formData.append('sessionId', sessionId)
        formData.append('email',e.target.elements.email.value)
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
    }
    handleChange(e) {
        if (e.target.checked) this.setState({ cost: this.state.cost + this.props.session.cost })
        else this.setState({ cost: this.state.cost - this.props.session.cost })
    }
    clearCost(e) {
        this.setState({ cost: 0 })
        this.props.setActive(e)
    }
    render() {
        
        return (
            <div>
                {this.props.active && (
                    <div className="modal">
                    <div className="modal-body">
                        <h1>Покупка билетов</h1>
                        <h3>Зал: {this.props.session.hall.number }</h3>
                        <p>{this.props.session.cost}</p>
                        
                                <form class="places__container" onSubmit={(e) => this.buyTicket(e, this.props.session.cost, this.props.session.id)}>
                                
                                {
                                    this.props.session.sortPlaces.map((row,index) => (
                                        <div key={index} class="places__row">
                                            {
                                                row.map(place => (
                                                    <div key={place.id} class="checkbox__holder">
                                                        <input id={place.id}
                                                            
                                                            name="place"
                                                            type="checkbox"
                                                            className={place.free ? "place" : "place__locked"}
                                                            
                                                            disabled={place.free ? false : true}
                                                            onChange={this.handleChange} />
                        
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                                <p>{ this.state.cost}</p>
                                <input name="email" defaultValue={getUserEmail()}></input>
                                <input type="submit" ></input>
                                </form>
                                





                            {/* {
                            
                                this.props.session.sortPlaces.map(place =>
                                    
                                    place.map(el => (
                                        <div key={el.id}>
                                        <input id={el.id} name="place" type="checkbox" disabled={el.free ? false : true} onChange={this.handleChange }/>
                                        <label style={{ color: el.free ? "blue" : "red" }}>ряд:{el.row } место:{el.number }</label><br />
                                        </div>
                                    ))
                                
                                )
                            } */}
                            
                        
                        <button onClick={  this.clearCost } >Закрыть окно</button>
                        <button    >Купить билет  </button>
                    </div>
                </div>)}
            </div>
        )
    }
}
export default Modal