import React, { Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Main from './components/main'
import Film from './components/film'
import Header from './components/header'
import Login from './components/login'
import UserProfile from './components/userProfile'
class App extends Component{

  render() {
    return ( 
      
      <BrowserRouter>
        <Header/>
        <Route path="/main" component={Main} />
        <Route path="/films" component={Film} />
        <Route path="/login" component={Login} />
        <Route path="/lk" component={UserProfile}/>
  
      </BrowserRouter>
    )
  }
  
}



export default App;
