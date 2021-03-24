import React from 'react'
import fire from './config/fire';
class Login extends React.Component{


    constructor(props){
        super(props)
        this.state={
            email:'',
            password:''
        }
    }


    login=(e)=>{
        e.preventDefault();

        fire.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u,"in then login")
        }).catch((err)=>{
        
            console.log(err,"in error login")
        })
    }

    signUp=(e)=>{
        alert("signup called")
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((u)=>{
            console.log(u,"in then signup")
        }).catch((err)=>{
            console.log(err,"in catch signup")
        })
    }


    handleEmailChange=(e)=>{
        this.setState({email:e.target.value})
    }

    handlePasswordChange=(e)=>{
        this.setState({password:e.target.value})

    }

    render(){
       return <div>
            <form>
                <input type="email" id="email" placeholder="enter email" onChange={this.handleEmailChange} value={this.state.email} />
                <input type="password" id="password" placeholder="enter password" onChange={this.handlePasswordChange} value={this.state.password} />
                <button onClick={this.login}>Login</button> 
                <button onClick={this.signUp}>SignUp</button> 
            </form>
        </div>
    }

}

export default Login