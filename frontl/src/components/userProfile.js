import React,{Component} from 'react'
function isAuth() {
    if ("user" in localStorage) {
        return JSON.parse(localStorage.user)
    } else return null
}
class UserProfile extends Component{
    constructor(props) {
        super(props);
        const user = isAuth();
        if (user != null) {
            this.state = {
            username: user.username,
            userId: user.id,
            userPassword: user.password
            };
        } else {
            this.state = {
            username: null,
            userId: null,
            userPassword: null
        };
        }
        
    }
    
    componentDidMount() {
    
       
    }
    render() {
        const { username ,userId,userPassword} = this.state;
        if ( username=== null) {
                return (
                    <div><a href="/login">Войти</a></div>
                )
            } else {
                return (
                    <div>
                        <ul>
                            <li>Приветствуем: <strong>{username}</strong></li>
                            <li>Ваш ID: <strong>{userId}</strong></li>
                            <li>Ваш пароль: <strong>{userPassword}</strong></li>
                        </ul> 
                    </div>
                    
                )
            }
    }
}
export default UserProfile