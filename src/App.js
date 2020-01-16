import React, { Component } from 'react'
import './App.css';
import { Route, Switch, NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Layout } from './components/Layout'
import Dashboard from './components/Dashboard'
import MainContainer from './containers/MainContainer'
import ProjectsContainer from './containers/ProjectsContainer'
import DevShow from './components/DevShow'
import ProjectShow from './components/ProjectShow'
import Login from './components/Login'
import {Col} from 'react-bootstrap'
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
    page:null,
    show:null
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
      console.log(this.state,localStorage)
    }
    )

    fetch('http://localhost:3000/projects')
    .then(r => r.json())
    .then((projects) => {
      this.setState({
        projects:projects
      })
    }
    )

    
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
    setPage={this.setPage}
    />

  }

  projectsWithProps = () => {
    console.log(this.state.projects)
    return < ProjectsContainer
    projects={ this.state.projects }
    setPage={this.setPage}
    />
  }
  
  

  dashWithprops = () => {
    // console.log(this.state.user)
    return < Dashboard 
    user={ this.state.user }
    token={ this.state.token }
    />

  }
  
  setPage = (user) => {
    console.log("hey from set user",user)
    let pageNum = user.id
    this.setState({
      page:pageNum,
      show:user
    })
  }
  
  devShowWprops = () => {
    return < DevShow 
    user={this.state.show}
    developer={this.state.show}

    />
  }
  
  projShowWprops = () => {
    return < ProjectShow 
    project={this.state.show}
    

    />
  }
  

  render() {
    return (
      <div className="App">
        < Layout>
        < div className="nav">
        < NavLink to="/main">
        <Link to= "/home">Home </Link>
        
        <Link to= "/developers">developers </Link>
        <Link to= "/projects">projects </Link>
        <Link to= "/">Signup or Login</Link>
</NavLink>
        </div>
        < Switch>
        < Route exact path="/" component={ this.loginWithProps }/>
        < Route path="/home" component={ this.dashWithprops }/>
        < Route path="/main" component={ this.mainWithProps }/>
        < Route exact path="/developers" component={ this.mainWithProps }/>
        < Route exact path={`/developers/${this.state.page}`} component={ this.devShowWprops }/>
        < Route exact path="/projects" component={ this.projectsWithProps }/>
        < Route exact path={`/projects/${this.state.page}`} component={ this.projShowWprops }/>
        </Switch>
        </Layout>
      </div>
    )
  }
}

export default App

