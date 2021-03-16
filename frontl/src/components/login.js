import React, { Component} from 'react'


function authentication(e) {
    e.preventDefault();

    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value


    const userPassInBase64 = btoa(username + ':' + password);

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + userPassInBase64)

    const url = 'http://localhost:8080/api/test/login'
    fetch(url, {
      method: 'GET',
      headers
    })
      .then(response => {
        if (response.ok) {
          localStorage.setItem('user:pass', userPassInBase64);
          console.log("okd");
        } else if (response.status === 401) {
          alert('не существует пользователя с таким именем и паролем')
        } else {
          throw new Error('invalid response')
        }
      })
      .catch(error => console.log(error))
}
function fetchForSignin(e) {
    e.preventDefault()
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value

    const url = "http://localhost:8080/film"
    let header = new Headers();
      
    let encoded = btoa(`${username}:${password}`)
    let auth = 'Basic ' + encoded;
    console.log(auth);
    header.set('Authorization',auth);  
    let req = new Request(url, {
        method: 'GET',
        headers: header,
        //credentials:'include'
    })
    fetch(req)
        .then((response) => {
            if (response.ok) {
                console.log(response.json()); 
            } else {
                console.log("GOsa");
            }
        })
    
}



class login extends Component{
    
    render() {
        
        return (
            <div className="login-wrapper">
            <h1>Please Log In</h1>
                <form onSubmit={ authentication}>
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
export default login