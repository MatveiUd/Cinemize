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
      <div>
        <Header/>
          {
            films.map(film =>
              <div key={ film.id}>
                <h3>{film.title}</h3>
                <h4>{film.originTitle}</h4>
                <span>{ film.genre.map(genre => genre.genreName)}</span>
              </div>)
        }
      </div>
    )}
    
  }
}
export default film;