import React, { Component } from 'react'


class addFilm extends Component {
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
        let genre = [];
        for (let i = 0; i < e.target.elements.genre.length; i++) {
            genre.push(e.target.elements.genre[i].value); 
        }
        let country = e.target.elements.country.value;
        let director = e.target.elements.director.value;
        let data = e.target.elements.data.value;
        let duration = e.target.elements.duration.value
        //let durationArray = e.target.elements.duration.value.split(":");
        //let duration = parseInt(durationArray[0] * 3600000) + parseInt(durationArray[1] * 60000) + parseInt(durationArray[2] * 1000);
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
    render() {
        if (this.isAdmin()) {
            return (
          <div>
                <form onSubmit={ this.sendInformation}>
                <p>Название фильма</p>
                <input type="text" name="title" />
                <p>Оригинальное название</p>
                <input type="text" name="originTitle" />
                <p>Описание</p>
                <input type="text" name="description" />
                <p>Жанр</p>
                        <input type="text" name="genre" />
                        <input type="text" name="genre" />
                <p>Страна</p>
                <input type="text" name="country" />
                <p>Режиссер</p>
                <input type="text" name="director" />
                <p>Дата выпуска</p>
                <input type="date" name="data" />
                <p>Продолжительность</p>
                <input type="time" name="duration" />
                <p>Кадры из фильма</p>
                    <input type="text" name="imageUrl" />
                    <input type="text" name="imageUrl" />
                    <input type="text" name="imageUrl" />
                    <input type="text" name="imageUrl" />
                    <input type="text" name="imageUrl" />
                    <input type="text" name="imageUrl" />
                    <button type="submit">Добавить фильм</button>
                    
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