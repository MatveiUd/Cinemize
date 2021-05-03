import React, { Component} from 'react'
import { Redirect } from 'react-router';





class login extends Component{
     constructor(props) {
        super(props);
        this.state = {
            referrer: null,
         };
         this.auth = this.auth.bind(this);
    }
    async auth(e) {
        e.preventDefault();

        let username = e.target.elements.username.value;
        let password = e.target.elements.password.value

        const userPassInBase64 = btoa(username + ':' + password);

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + userPassInBase64)

        const url = 'http://localhost:8080/api/test/login'
        const test = "http://localhost:8080/user"
        const response = await fetch(test, {
            method: "GET",
            headers
        })
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("authData", userPassInBase64)
            localStorage.setItem("user", JSON.stringify(data))
            this.setState({referrer:'/lk'})
        } else if (response.status === 401) {
            alert('Пользователь не найден')
        } else {
            throw new Error('invalid response')
        }
    
    }
    render() {
        
        
        const {referrer} = this.state
        if (referrer) return <Redirect to={referrer} />
        else {
            return (
            <div className="login-wrapper">
            <h1>Please Log In</h1>
                <form onSubmit={this.auth}>
                <label>
                <p>Username</p>
                        <input type="text" name="username" />
                    </label>
                    <label>
                        <p>Password</p>
                         <input type="password" name="password" />
                    </label>
                <div>
                        <button type="submit"  >Submit</button>
                    
                </div>
                </form>    
            </div>
        )    
        }
        
        
        
    }
}
export default login