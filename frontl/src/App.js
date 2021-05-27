import React, { Component} from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Main from './components/main'
import Film from './components/film'

import Login from './components/login'
import UserProfile from './components/userProfile'
import AddFilm from './components/addFilm'
import Users from "./components/users"
import AddSession from "./components/addSession"
import Register from "./components/register"
import Visitors from "./components/visitors"
import Footer from './components/footer'
import MakeOrder from './components/makeOrder'
import Admin from './components/adminPanel'

import './styles/style.css'
import './styles/reset.css'
import "./styles/login.css"
import "./styles/newAcc.css"
import "./styles/profile.css"
import './styles/visitors.css'
import './styles/makeOrders.css'
import './styles/admin.css'

class App extends Component{

  render() {
    return ( 
      
      <BrowserRouter>
 
        <Route exact path="/" component={Main} />
        <Route path="/films" component={Film} />
        <Route path="/login" component={Login} />
        <Route path="/lk" component={UserProfile}/>
        <Route path="/addfilm" component={AddFilm} />
        <Route path="/users" component={Users} />
        <Route path="/addSession" component={AddSession} />
        <Route path="/regitration" component={Register} />
        <Route path="/visitors" component={Visitors} />
        <Route path="/buy" component={MakeOrder} />
        <Route path="/admin" component={Admin}/>
        <Footer/>
      </BrowserRouter>
    )
  }
  
}



export default App;
