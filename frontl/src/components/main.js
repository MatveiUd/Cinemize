import React,{Component} from 'react'

class main extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: ""
        };
    }
    componentDidMount() {
        fetch('http://localhost:8080', {
            method: "GET",
            credentials:'include'
        })
            .then((response) => response.text())
            .then((result) => {
                this.setState({
                    username: result

                })
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }
    render() {
        
        const { error, username } = this.state
        if (error) {
            return (<div>ОШИБОЧКА</div>);
        } else {
            
            if (username === "null") {
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
    
}
export default main;