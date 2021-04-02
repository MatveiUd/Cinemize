import React, { Component} from 'react'
import axios from 'axios'

function axionsFetch(e) {
    e.preventDefault()
    let formData = new FormData();
    formData.append('username', 'admin')
    formData.append('password','admin')
    const url = "http://localhost:8080/api/login"
    axios.post(url, formData)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function fetchForSignin(e) {
    e.preventDefault()
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value

    const url = "http://localhost:8080/api/login"
    let formData = new FormData();
    formData.append('username', username)
    formData.append('password',password)
     
    let req = new Request(url, {
        method: 'POST',
        body: formData,
        redirect: 'follow'  
    })
    fetch(req)
    .then((response) => response.text())
      .then((result) => {
        console.log(result)
      })
    //     .then(response => {
    //         if (response.ok) {
    //       localStorage.setItem('isAuth', true);
    //       console.log("okd");
    //     } else if (response.status === 401) {
    //       alert('не существует пользователя с таким именем и паролем')
    //     } else {
    //       throw new Error('invalid response')
    //     }
    //     })
    // .catch(error => console.log(error))
}



class login extends Component{
    
    render() {
        
        return (
            <div className="login-wrapper">
            <h1>Please Log In</h1>
                <form onSubmit={axionsFetch}>
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