import React,{Component} from 'react'
function isAuth() {
    if ("user" in localStorage) {
        return (JSON.parse(localStorage.user)).username
    } else return null
}

class main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: isAuth()
        };
    }
    render() {
        
        const { username } = this.state
        if (username === null) {
                return (
                    <div>Приветствуем гость</div>
                )
            } else {
                return (
                    <div>Приветствуем {username}</div>
                )
            }
        
    }
    
}
export default main;