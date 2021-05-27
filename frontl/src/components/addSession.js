import { Component } from "react"


class addSession extends Component{
    constructor(props) {
        super(props);
        this.state = {
            films: [],
            halls: [],
            error: null
        };
    }
    isAdmin() {
        if ("user" in localStorage) {
            let user = JSON.parse(localStorage.user)
            if (user.roles.includes("ADMIN")) {
                return true
            }
        } else return false     
    }
    sendInformation(e) {
        e.preventDefault();
        let filmTitle = e.target.elements.title.value;
        let hallNumber = e.target.elements.hallNumber.value;
        let date = e.target.elements.date.value;
        let cost = e.target.elements.cost.value;
        console.log({
            filmTitle, hallNumber, date: Date.parse(date), cost
        });
        let formData = new FormData()
        formData.append("filmTitle", filmTitle);
        formData.append("hallNumber", hallNumber);
        formData.append("date", Date.parse(date));
        formData.append("cost", cost);
        const url = "http://localhost:8080/api/session/add"
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        fetch(url, {
            method: "POST",
            body: formData,
            headers
        })
            .then(response => {
            if (response.ok) {
                alert("Сеанс успешно добавлен")
            } else if (response.status === 401) {
                alert("Вы не вошли в систему")
            }
        })

    }
    componentDidMount() {
        if (this.isAdmin) {
            const headers = new Headers();
            headers.set('Authorization', 'Basic ' + localStorage.authData)
            const url = "http://localhost:8080/api/session/add"
            fetch(url, {headers: headers})
            .then((response) => response.json())
            .then((result) => {
                this.setState({ films: result.films })
                this.setState({ halls: result.halls })
            },
            (error) => {
                this.setState({
                error
                });
            }
        );
        }
        
    }
    render() {
        const { films } = this.state
        return (
            <div>
                <form onSubmit={this.sendInformation}>
                    <p>Фильм</p>
                    <select name="title" >
                    {
                        films.map(film =>
                            <option key={ film.id}>{ film.title}</option>)
                    }
                    </select>
                    <p>Зал</p>
                    <select name="hallNumber">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                    </select>
                    <p>Время</p>
                    <input name="date" type="datetime-local" />
                <p>Стоимость</p>
                <input type="text" name="cost" />
                     <button type="submit">Добавить сеанс</button>
                </form>
                
            </div>
        )
    }
}
export default addSession