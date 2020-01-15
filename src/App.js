import React, { Component } from 'react'
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import Dashboard from './components/Dashboard'
import MainContainer from './containers/MainContainer'
import Login from './components/Login'
// import SignUp from './components/SignUp'
// import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export class App extends Component {

  state = {
    developers:[],
    clients:[],
    projects:[],
    token:null,
    loggedInUserId:null,
    user:null,
    page:null
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/developers')
    .then(r => r.json())
    .then((developers) => {
      this.setState({
        developers: developers,
        token:localStorage.token,
        loggedInUserId:localStorage.loggedInUserId,
        
        
      })
      // console.log(this.state,localStorage)
    }
    )

    // fetch('http://localhost:3000/projects')
    // .then(r => r.json())
    // .then((projects) => {
    //   this.setState({
    //     projects:projects
    //   })
    // }
    // )

    
  }

  setToken = ( token, loggedInUserId, user) => {
    localStorage.token = token
    localStorage.loggedInUserId = loggedInUserId
    // localStorage.username = user.username
    // localStorage.keenan = user.first_name
    
    this.setState({
      token: token,
      loggedInUserId: loggedInUserId,
      user: user

    })
    // if user
    // console.log(this.state.user)
  }

  loginWithProps = () => {
    // console.log(this.state.user)
    return < Login 
    setToken={this.setToken} 
    user={this.state.user}
    loggedInUserId={this.state.loggedInUserId}
    token={this.state.token}
    />
    
  }
  
  mainWithProps = () => {
    // console.log(this.state.developers)
    return < MainContainer 
    clients={this.state.clients}
    developers={this.state.developers}
    projects={this.state.projects}
    user={ this.state.user }
    token={ this.state.token }
    
    />

  }
  

  dashWithprops = () => {
    // console.log(this.state.user)
    return < Dashboard 
    user={ this.state.user }
    token={ this.state.token }
    />

  }
  
  // setPage = () => {
    
  // }
  
  

  render() {
    return (
      <div className="App">
        < Layout>
        < Switch>
        < Route exact path="/" component={ this.loginWithProps }/>
        < Route path="/home" component={ this.dashWithprops }/>
        < Route path="/main" component={ this.mainWithProps }/>
        < Route path="/developers" component={ this.mainWithProps }/>
        {/* < Route path={`/developers/${this.state.page}`} component={ this.mainWithProps }/> */}
        </Switch>
        </Layout>
      </div>
    )
  }
}

export default App

