import React from 'react'
import fire from './config/fire'
class Home extends React.Component{


    constructor(props){
        super(props)
    }

    onLogout=()=>{
        fire.auth().signOut();
    }

    render(){
       return <div>
            <h1>You are logged in</h1>
            <button onClick={this. onLogout}>Logout</button>
        </div>
    }

}

export default Home