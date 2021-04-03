import React,{Component} from 'react'
import { v4 as uuidv4 } from 'uuid';

import  SpotifyWebApi from 'spotify-web-api-node'

import './App.css';
import fire from './config/fire';
import Login from './Login'
import Home from './Home'



class App extends Component{

  constructor(props){
    super(props)
    this.state={
      user:{}
    }
  }


  componentDidMount=async()=>{
    // this.authListner()
    this.createUser()
  }


  doValidation=()=>{
      const userName = " RajaPamulapati "
      var regexp = /^\S*$/;
      const matches = userName.match(regexp)
      console.log(matches,"matches")
      if(matches === null ){
        console.log("Username Marchara Jaffff")
      }
      else{
        console.log("Hey This Username is ok")
      }
  }

  createUser=()=>{

    //977d07fc-fb83-4b55-94bb-86d31afac117
    const data={username:"tester1",password:"passaaa"}
    fetch("https://r6u3wcyhr0.execute-api.ap-south-1.amazonaws.com/dev/signin", {
      method: "POST", 
      body: JSON.stringify(data),
      mode:"no-cors"
    }).then(res => {
      return res
    }).then(res => {
      console.log("Request complete response:", res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

  getMoviesData= async ()=>{ 

    // const data={fullname:"solodeveloper",email:"solodeveloper@gmail.com",experince:"5years"}

    // fetch("https://r6u3wcyhr0.execute-api.ap-south-1.amazonaws.com/dev/dbitems", {
    //   method: "POST", 
    //   body: JSON.stringify(data)
    // }).then(res => {
    //   return res
    // }).then(res => {
    //   console.log("Request complete response:", res)
    // })
    // .catch(err=>{
    //   console.log(err)
    // })



    let storiesType = "topstories"
    let limit = 10;
    let offset = 0;
    let hackerNewsCloneStatusCode = 100;
    let hackerNewsCloneStatusText = "OK";
    let storiesList = []
    let totalResults=0
    let finalResponse=[]
  
    // if(event.pathParameters && event.pathParameters !== null){
    //     if(event.pathParameters.storiesType && event.pathParameters.storiesType !== null){
    //         storiesType = event.pathParameters.storiesType;
    //     }
    //   }  

    // if(event.queryStringParameters && event.queryStringParameters !== null){
    //     if(event.queryStringParameters.limit && event.queryStringParameters.limit !== null){
    //       limit = parseInt(event.queryStringParameters.limit);
    //     }
    //     if(event.queryStringParameters.offset && event.queryStringParameters.offset !== null){
    //         offset = parseInt(event.queryStringParameters.offset);
    //     }
    // }
    
    if(storiesType !=="topstories" && storiesType !=="newstories"){
        finalResponse={message:"Please Enter Valid hacker news Story type"}
    }
    else{
        let url =`https://hacker-news.firebaseio.com/v0/${storiesType}.json?print=pretty`
        const response = await fetch(url);
        if (!response.ok) {
            hackerNewsCloneStatusCode = response.status;
            hackerNewsCloneStatusText = response.statusText;
            throw new Error(response.statusText);
        }
        else {
            hackerNewsCloneStatusCode = response.status;
        }
        let hackerNewsCloneRespone = await response.json();
        if (hackerNewsCloneStatusCode === 200) {
            if(hackerNewsCloneRespone){
                totalResults = hackerNewsCloneRespone.length;
                let slicedStoriesArray=[]
                if((limit+offset)<totalResults){
                    slicedStoriesArray=hackerNewsCloneRespone.slice(offset,offset+limit)
                }
                else{
                    slicedStoriesArray=hackerNewsCloneRespone.slice(offset,totalResults-offset)
                }
                console.log(slicedStoriesArray,"slicedStoriesArray")
                slicedStoriesArray.forEach(async (storyId)=>{
                    const storyDetailsUrl = `https://hacker-news.firebaseio.com/v0/item/${storyId}.json?print=pretty`
                    let storyDetailsStatusCode=100;
                    let storyDetailsStatusText="";
                    const response = await fetch(storyDetailsUrl);
                    let storyObject={
                        author:"",
                        id:0,
                        score:0,
                        title:"",
                        type:"",
                        news_url:""
                    }
                    if (!response.ok) {
                        storyDetailsStatusCode = response.status;
                        storyDetailsStatusText = response.statusText;
                        storiesList.push(storyObject)
                    }
                    else {
                        storyDetailsStatusCode = response.status;
                        storyDetailsStatusText="Something Went Wrong"
                        let storyDetailsResponse = await response.json();
                        if (storyDetailsStatusCode === 200) {
                            if(storyDetailsResponse){
                                const {by,id,score,title,type,url} = storyDetailsResponse
                                storyObject.author=by
                                storyObject.id=id
                                storyObject.score=score
                                storyObject.title=title
                                storyObject.type=type
                                storyObject.news_url=url
                                storiesList.push(storyObject)
                            }
                            else{
                                storiesList.push(storyObject)
                            }
                        }
                    }
                })
            }
        }
        else{
            storiesList=[]
        }
        
        finalResponse={
            news_list:storiesList,
            total_news_count:totalResults
        }
    }
    return storiesList
   
  }


  authListner=()=>{
    fire.auth().onAuthStateChanged((user)=>{
      if(user){ 
        this.setState({user})
      }
      else{
        this.setState({user:null})
      }
    })
  }

  render(){
    return (
      <div className="App">
       {
         this.state.user?(<Home/>):(<Login/>)
       }
      </div>
    );
  }
}


export default App;





// const connectToDatabase = require('./db/db');
// require('dotenv').config({ path: './variables.env' });
// const Note = require('./models/Note');
// const fetch = require("node-fetch");

// 'use strict';

// module.exports.create = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       Note.create(JSON.parse(event.body))
//         .then(note => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(note),
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not create the note.',
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }));
//     });
// };

// module.exports.getOne = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       Note.findById(event.pathParameters.id)
//         .then(note => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(note),
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the note.',
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }));
//     });
// };

// module.exports.getAll = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       Note.find()
//         .then(notes => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(notes),
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the notes.',
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//     });
// };

// module.exports.update = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
//         .then(note => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(note),
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the notes.',
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }));
//     });
// };

// module.exports.delete = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase()
//     .then(() => {
//       Note.findByIdAndRemove(event.pathParameters.id)
//         .then(note => callback(null, {
//           statusCode: 200,
//           body: JSON.stringify({ message: 'Removed note with id: ' + note._id, note: note }),
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           }
//         }))
//         .catch(err => callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the notes.',
//           headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Access-Control-Allow-Credentials": true,
//           },
//         }));
//     });
// };