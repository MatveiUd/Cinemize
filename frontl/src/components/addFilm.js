import React, { Component } from 'react'


class addFilm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            genreInput: [<input type="text" name="genre" id="A1"  required/>],
            countryInput: [<input type="text" name="country" id="A1" required/>],
            directorInput: [<input type="text" name="director" id="A1" required/>],
            
        }
        this.addInput = this.addInput.bind(this)
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
        let title = e.target.elements.title.value;
        let originTitle = e.target.elements.originTitle.value
        let description = e.target.elements.description.value
        let genre;
        if (e.target.elements.genre.length > 1) {
            genre = []
            for (let i = 0; i < e.target.elements.genre.length; i++) {
            genre.push(e.target.elements.genre[i].value); 
            }
        } else genre = e.target.elements.genre.value
        
        
        let country;
        if (e.target.elements.country.length > 1) {
            country = []
            for (let i = 0; i < e.target.elements.country.length; i++) {
                country.push(e.target.elements.country[i].value); 
            }
        } else country = e.target.elements.country.value
        
        let director = e.target.elements.director.value
        let data = e.target.elements.data.value;
        let duration = e.target.elements.duration.value
        
        let imagesUrl = [];
        for (let i = 0; i < e.target.elements.imageUrl.length; i++) {
            imagesUrl.push(e.target.elements.imageUrl[i].value); 
        }
        
        let formData = new FormData();
        formData.append('title', title)
        formData.append('originTitle', originTitle)
        formData.append('description', description)
        formData.append('genre', genre)
        formData.append('country', country)
        formData.append('director', director)
        formData.append('data', Date.parse(data))
        formData.append('duration', duration)
        formData.append('imagesUrl', imagesUrl)
        const url = "http://localhost:8080/api/film/add"
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        fetch(url, {
            method: "POST",
            body: formData,
            headers
        })
            .then(response => {
            if (response.ok) {
                alert("Фильм успешно добавлен")
            } else if (response.status === 401) {
                alert("Вы не вошли в систему")
            }
        })
        

    }
    addInput(e) {
        e.preventDefault()
        console.log(e.target.id);
        let buffArr = []
        switch (e.target.id) {
            case "addGenre":
                buffArr = this.state.genreInput
                buffArr.push(<input type="text" name="genre" id="A1" required/>)
                this.setState({genreInput: buffArr})
                break;
            case "addCountry":
                buffArr = this.state.countryInput
                buffArr.push(<input type="text" name="country" id="A1" required/>)
                this.setState({countryInput: buffArr})
                break;
            case "addDirector":
                buffArr = this.state.directorInput
                buffArr.push(<input type="text" name="director" id="A1" required/>)
                this.setState({directorInput: buffArr})
                break;
        
            default:
                break;
        }
    }
    render() {
        if (this.isAdmin()) {
            return (
          <div className="container">
              <form class="addfilm__form" onSubmit={this.sendInformation}>
                    <div class="form__inputs_addFilm">
                        <h1 htmlFor="title">Название фильма</h1>
					<input type="text" name="title" required/>
					<h1 htmlFor="originTitle">Оригинальное название</h1>
					<input type="text" name="originTitle"required/>
					<h1 htmlFor="description">Описание</h1>
                            <textarea rows="5" cols="55" name="description" required></textarea>
                             <h1 htmlFor="genre">Жанр</h1>
                            <div>
                                { this.state.genreInput.map(genre => genre)}
                                <div class="button__plus">
                                <button class="button_add_genre"  >
                                <p id="addGenre" onClick={this.addInput}> + </p>
                                <div class="button_add_genre_two"> </div>
                                </button>
                                </div>
                            </div>
                            
                            
                            <h1 htmlFor="country">Страна</h1>
                            
                            <div>
                                {this.state.countryInput.map(country => country)}
                                <div class="button__plus">
                                <button class="button_add_genre"  >
                                <p id="addCountry" onClick={this.addInput}> + </p>
                                <div class="button_add_genre_two"> </div>
                                </button>
                                </div>
                            </div>
                            <h1 htmlFor="director">Режиссер</h1>
                            <input type="text" name="director"  required/>
                            {/* <div>
                                {this.state.directorInput.map(director => director)}
                                <div class="button__plus">
                                <button class="button_add_genre"  >
                                <p id="addDirector" onClick={this.addInput}> + </p>
                                <div class="button_add_genre_two"> </div>
                                </button>
                                </div>
                            </div> */}
					<h1 htmlFor="data">Дата выхода</h1>
					<input type="date" name="data" required/>
					<h1 htmlFor="duration">Продолжительность</h1>
					<input type="time" name="duration" required/>
					<h1 htmlFor="duration">Фото</h1>
                    <input type="text" name="imageUrl" required/>
                    <h1 htmlFor="duration">Постер</h1>
					<input type="text" name="imageUrl" required/>
					<button class="button_addFilm" type="submit">
							<div class="button__border__one_addFilm">
								<p>СОХРАНИТЬ ИЗМЕНЕНИЯ</p>
							</div>
							<div class="button__border__two_addFilm" ></div>
						</button>
                    </div>
			</form>
        </div>  
        )
    
        } else {
            return (
               <div>
                    <h1>Недостаточно прав для данного раздела</h1>
                </div> 
            )
        }
        
        
    }
}
export default addFilm