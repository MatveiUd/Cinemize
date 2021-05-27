import React, { Component } from 'react'

class Users extends Component{
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            user: null,
            roleAdmin: false,
            roleUser: false,
            error:null
        };
        this.getUser = this.getUser.bind(this)
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
    getUser(e) {
        let url = `http://localhost:8080/user/${e.target.id}`
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        fetch(url, {headers})
        .then((response) => response.json())
            .then((result) => {
                this.setState({ user: result })
                
                if (result.roles.includes("USER")) {
                    console.log("user")
                    this.setState({roleUser: true})
                }
                if(result.roles.includes("ADMIN")){
                    this.setState({roleAdmin: true})
                }
            },
            (error) => {
                this.setState({
                error
                });
            }
        );
    
        
    }
    saveChange(e) {
        e.preventDefault();
        let url = "http://localhost:8080/user/save"
        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + localStorage.authData)
        console.log(e.target.elements.roleAdmin.checked)
        let formData = new FormData();
        formData.append('isAdmin', e.target.elements.roleAdmin.checked)
        formData.append('isUser', e.target.elements.roleUser.checked)
        formData.append('userId', this.state.user.id)
        fetch(url, {
            method: "POST",
            headers,
            body: formData
        })
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
                this.setState({
                users: result
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
    
    roleCheck(role, roleArray) {
        if (roleArray.includes(role)) {
            return true
        } else return false
    }
    changeCheckbox(e) {
       this.setState({[e.target.name]:e.target.checked})
    }
    render() {
        const { users, user ,error } = this.state
        if (error) {
            return (<div>Ошибка</div>)
        } else {
            let userView
            if (user != null) {
                userView =
                    <form onSubmit={this.saveChange }>
                    <label>{user.username}</label>
                    <div>
                        <label><input type="checkbox" name="roleUser" checked={this.state.roleUser} onChange={this.changeCheckbox}/>USER</label>
                        <label><input type="checkbox" name="roleAdmin" checked={ this.state.roleAdmin} onChange={this.changeCheckbox} />ADMIN</label>
                        <label><button type="submit">Сохрвнить</button></label>
                    </div>
                    </form>
            } else {
                userView = <div>Выберите пользователя</div>
            }
            if (this.isAdmin) {
                return (
                    <div>
                        <table>
                        <thead>
                            <tr>
                                <th>Usernmae</th>
                                <th>Role</th>
                                <th></th>

                            </tr>
                        </thead>
                            <tbody>
                                
                            {
                                 users.map((usr) =>
                                     <tr key={usr.id }>
                                        <td >{usr.username}</td>
                                        <td >{usr.roles}</td>
                                         <td ><button id={usr.id} onClick={ this.getUser}>Изменить</button></td>
                                    </tr>  
                                )
                            }
                        </tbody>
                        
                        </table>
                        {userView}
                    </div>
                    
                    
                )
            }
        }
        
 }
}
export default Users;