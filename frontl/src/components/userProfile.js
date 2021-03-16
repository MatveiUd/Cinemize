import React,{Component} from 'react'

class UserProfile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: "",
            userId: "",
            userPassword: ""
        };
    }
    
    componentDidMount() {

        fetch('http://localhost:8080/user', {
            
            method: "GET",
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                this.setState({
                    username: result.username,
                    userId: result.id,
                    userPassword: result.password
                    

                })

            },
                (error) => {
                    console.log(error)
                    this.setState({
                        error
                    });
                });
    }
    render() {
        const { error, username ,userId,userPassword} = this.state;
        if (error) {
            return (<div>ОШИБОЧКА</div>);
        }else {
            
            if ( username=== "null") {
                return (
                    <div>Приветствуем гость</div>
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
}
export default UserProfile