import React, { Component } from 'react'
import Footer from './footer';
import Header from "./header"


class film extends Component{
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      films: []
    };
  }

  componentDidMount() {
    const url = "http://localhost:8080/api/film"
    
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          films: result
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    );
    
  }
  render() {
    const { error, films } = this.state
    if (error) {
        return <div>Необходимо войти в систему <a href="/login">войти</a> </div>;
    } else {
      return (
      <div className="container">
        <Header/>
          {
            films.map(film =>
              
              <div  key={ film.id} class="film__card">
                <img src={film.frames[0].imageUrl} alt="Картинка загружается"  property="image"/>
                <h1>{film.title}</h1>
                <p>{film.description}</p>
                
                
              </div>
            )
          }
    
          <Footer/>
      </div>
    )}
    
  }
}
export default film;