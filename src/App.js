import React, { Component } from 'react'
import './App.css';
import { Route, Switch, Redirect} from 'react-router-dom'
import { Nav, Navbar } from 'react-bootstrap'
import Dashboard from './components/Dashboard'
import MainContainer from './containers/MainContainer'
import ProjectsContainer from './containers/ProjectsContainer'
import DevShow from './components/DevShow'
import ProjectShow from './components/projectShow'
import Login from './components/Login'
// import { ProjectCreate } from '../Modals/ProjectCreate'
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
    show:null,
    loggedIn:false,
    loggedOut:true,
    accountDeleted:false

  }

  componentDidMount = () => {
    fetch('http://localhost:3000/developers')
    .then(r => r.json())
    .then((developers) => {
      
      this.setState({
        developers: developers,
        token:localStorage.token,
        loggedInUserId:localStorage.loggedInUserId
      })
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
  
    if ( token ) {
      
      localStorage.clear()
      localStorage.token = token
      localStorage.loggedInUserId = loggedInUserId
      localStorage.loggedIn = !this.state.loggedIn
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('developers', JSON.stringify(this.state.developers));
      localStorage.setItem('projects', JSON.stringify(this.state.projects));
      let user1 = JSON.parse(localStorage.getItem('user'));
      this.setLogin()
      this.setState({
        token: token,
        loggedInUserId: loggedInUserId,
        user:user1
        
        
        
        
      })
      console.log("fromset token:",this.state.user)
    } else {
      return "sorry must create an account"
    }   
  }
  
  
  addProject = (project) => {
    this.setState({
      projects:[ project,...this.state.projects ],   
    })
  }
  
 

  setLogin = () => {
    let logged = this.state.loggedIn
    let loggedOut = this.state.loggedOut
    this.setState({
      loggedIn:!logged,
      loggedOut:!loggedOut
    })
    console.log("from set login",this.state.loggedIn)
  }
  
  setLogout = () => {
    let log = this.state.loggedIn
    localStorage.removeItem("loggedInUserId")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("loggedIn")
    localStorage.removeItem("loggedOut")
    this.setState({
      loggedInUserId: null,
      token: null,
      user:null,
      loggedIn:!log
    })
  }

  loginWithProps = () => {
    return < Login 
    setToken={this.setToken} 
    user={this.state.user}
    loggedInUserId={this.state.loggedInUserId}
    token={this.state.token}
    loggedOut={ this.state.loggedOut }
    loggedIn={ this.state.loggedIn }
    />
  }
  
  mainWithProps = () => {
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
    return < ProjectsContainer
    projects={ this.state.projects }
    setPage={this.setPage}
    />
  }
  
  

  dashWithprops = () => {
    return < Dashboard 
    user={ this.state.user }
    token={ this.state.token }
    setPage={this.setPage}
    setToken={this.setToken}
    projectSubmitted={ this.projectSubmitted }
    addProject={ this.addProject }
    accountDelete={ this.accountDelete }
    setLogout={ this.setLogout }
    />
  }
  
  setPage = (resource) => {
    let pageNum = resource.id
    this.setState({
      page:pageNum,
      show:resource
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
    project={ this.state.show }
    user={ this.state.user }
    />
  }
  

  accountDelete = () => {
    let newState = this.state.accountDelete
    this.setState({
      accountDeleted:!newState
    })
  }
  
  
  
  
  

  render()  {
    return (
      <div className="App background" >     
        <Navbar bg="dark" variant="dark" >
    <Navbar.Brand href="/home">webmart</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/home">Home</Nav.Link>
      <Nav.Link href="/developers">Developers</Nav.Link>
      <Nav.Link href="/projects">Projects</Nav.Link>
      <Nav.Link style={{display: localStorage.loggedIn ? 'none' : 'block'} } href="/">Sign up or Login</Nav.Link>
      <Nav.Link style={{display: localStorage.loggedIn ? 'block' : 'none'} } href="/" onClick={ this.setLogout }>Logout</Nav.Link>
    </Nav>
  </Navbar>
        < Switch>
        <Route exact path="/">
          { localStorage.token ? <Redirect to="/home" /> : this.loginWithProps }
        </Route>
        <Route path="/home">
          {this.state.accountDeleted || !localStorage.user ? this.loginWithProps : this.dashWithprops }
        </Route>
        < Route exact path="/developers" component={ localStorage.token ? this.mainWithProps : this.loginWithProps }/>
        < Route exact path={`/developers/${this.state.page}`} component={ localStorage.token ? this.devShowWprops : this.loginWithProps }/>
        < Route exact path="/projects" component={ localStorage.token ? this.projectsWithProps : this.loginWithProps }/>
        < Route exact path={`/projects/${this.state.page}`} component={ localStorage.token ? this.projShowWprops : this.loginWithProps }/>
        </Switch>    
      </div>
      
    )
  }
}

export default App












