import React, { Component } from 'react'



class film extends Component{
    constructor(props) {
    super(props);
    this.state = {
      error: null,
      films: []
    };
  }

  componentDidMount() {
    const url = "http://localhost:8080/film"
    
    let req = new Request(url, {

        method: 'GET',
        credentials: 'include'
        
    })
    fetch(req)
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
        <h1>CINEMIZE</h1>
        <ul>
          {
            films.map(film => 
              <li key={ film.id}> {film.text} </li>)
          }
        </ul>
        
        
      </div>
    )}
    
  }
}
export default film;