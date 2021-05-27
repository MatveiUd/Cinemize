import React, { Component } from 'react'

class Users extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: null,
            roleAdmin: false,
            error: null,
            changedUsers: []
        };
        
        this.changeCheckbox = this.changeCheckbox.bind(this)
        this.saveChange = this.saveChange.bind(this)
    }
    
    isAdmin() {
        if ("user" in localStorage) {
            let user = JSON.parse(localStorage.user)
            if (user.roles.includes("ADMIN")) {
                return true
            }
        } else return false     
    }
    
    saveChange(e) {
        e.preventDefault();
        let url = "http://localhost:8080/user/save"
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        for (let i = 0; i < this.state.changedUsers.length; i++) {
            let usr = this.state.users.find(user => user.id ==  this.state.changedUsers[i])
            let isAdmin = usr.isAdmin;
            let isUser = !usr.isAdmin;
            let formData = new FormData();
            formData.append('isAdmin', isAdmin)
            formData.append('isUser', isUser)
            formData.append('userId',usr.id)
            fetch(url, {
            method: "POST",
            headers,
            body: formData
        })
        }
        alert("Роли изменены")
    }
    componentDidMount() {

        let url = "http://localhost:8080/user/all"
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        if (this.isAdmin) {
            fetch(url, {
                headers
            })
            .then((response) => response.json())
                .then((result) => {
                    let users = result
                    
                    for (let i = 0; i < result.length; i++){
                    
                        if (result[i].roles[0] == "ADMIN") {
                            users[i]["isAdmin"] = true
                        } else users[i]["isAdmin"] = false
                        
                    }
                   
                this.setState({
                users: users
                })
            },
            (error) => {
                this.setState({
                error
                });
            }
            );
        }
        
    }
    
    changeCheckbox(e) {
        let changedUsers =this.state.changedUsers
        let users = this.state.users
        for (let i = 0; i < users.length; i++){
            if (this.state.users[i].id == e.target.id) {
                console.log(users[i].id);
               console.log(changedUsers.indexOf(users[i].id));
                if (changedUsers.indexOf(users[i].id) != -1) {
                    changedUsers.splice(changedUsers.indexOf(users[i].id),1)
                } else changedUsers.push(parseInt(users[i].id))
                users[i].isAdmin = !users[i].isAdmin
            }
        }
        console.log(changedUsers);
       this.setState({users: users})
    }
    render() {
        const { users, user ,error } = this.state
        if (error) {
            return (<div>Ошибка</div>)
        } else {
            
            if (this.isAdmin) {
                return (
                    <div class="container">
					<form class="form__inputs_switch_roles" onSubmit={this.saveChange}>
                       <table>
							<tr>
								<th>Логин</th>
								<th>Роль</th>
                                </tr>
                                {
                                    users.map(user => (
                                        <tr key={user.id}>
                                            <td>{ user.username}</td>
                                            <td>
                                            <label><input id={user.id} type="checkbox" name="roleAdmin" checked={ user.isAdmin} onChange={this.changeCheckbox}/>
                                            <span></span>
                                            </label>
                                            </td>
                                            <td>
                                            <h1 htmlFor="admin">ADMIN</h1>
                                            </td>
                                        </tr>
                                    ))
                                }
							
						</table>
						<button class="button_switch_roles" type="submit" >
							<div class="button__border__one_switch_roles">
								<p>СОХРАНИТЬ</p>
							</div>
							<div class="button__border__two_switch_roles"></div>
						</button>
					</form>
					<div class="form__inputs_switch_roles">
					
					</div>
                   
		        </div>
                    
                    
                )
            }
        }
        
 }
}
export default Users;