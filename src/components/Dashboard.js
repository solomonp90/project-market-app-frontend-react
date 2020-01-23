import React, { Component } from 'react'
import  { Row, Container, Col }from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Route, Switch, NavLink, Link, Redirect} from 'react-router-dom'

// import ListGroup from 'react-bootstrap/ListGroup';

export class Dashboard extends Component {
    


   
      

    state = {
        formDisplay:false,
        editForm:false,
        firstName:"",
        lastName:"",
        userName:"",
        experience:"",
        skill:"",
        title:"",
        image:"",
        description:"",
        stipulation:"",
        kind:"Project",
        errors:[]
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    projectSubmitted = (event) => {
        const user1 = JSON.parse(localStorage.getItem('user'));
        const projects = JSON.parse(localStorage.getItem('projects'));

        console.log(projects)
        event.preventDefault()
        fetch(`http://localhost:3000/projects`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             "Accept": "application/json"
         },
         body: JSON.stringify({
            title: this.state.title,
            image: this.state.image,
            description: this.state.description,
            stipulation: this.state.stipulation,
            client_id: user1.id
          })
        })
        .then(r => r.json())
        .then((project) => {
            if (project.errors) {
                this.setState({
                    errors: project.errors
                })
            } else {
                let formDis = this.state.formDisplay
                this.setState({
                    formDisplay:!formDis
                })
                this.props.addProject(project)
            }
        }
        )
        // create conditional to stop devs from posting projects
     }

     editFormSubmitted = (event) => {
         event.preventDefault()
         const user1 = JSON.parse(localStorage.getItem('user'));
         fetch(`http://localhost:3000/developers/${user1.id}`, {
           method:'PATCH',
          headers: { 
              'Content-type': 'application/json',
              "Accept": "application/json"
          },
          body: JSON.stringify({
              first_name:this.state.firstName,
              last_name:this.state.lastName,
              username:this.state.userName,
              image:this.state.image,
              experience:this.state.experience,
              skill:this.state.skill,
              kind:"Developer"
           })
         })
         .then(r => r.json())
         .then((data) => {
             this.props.setToken( data.token, data.user_id, data.user )
             this.setEditForm()
             console.log("from edit response")
         }
         )
     }

     deleteAccount = () => {

        const user1 = JSON.parse(localStorage.getItem('user'));
         fetch(`http://localhost:3000/developers/${user1.id}`, {
           method:'DELETE'
         })
         .then(r => r.json())
         .then((user) => {
             this.props.accountDelete()
             this.props.setLogout()
             this.props.accountDelete()

         }
         )
     }
    //  ()=><Redirect to="/"/>
     

    //  let formDis = this.state.formDisplay
    //  this.setState({
    //      formDisplay:!formDis
    //  })
    //  this.props.addProject(response)

    setEditForm = () => {
        let newState = this.state.editForm
        this.setState({
            editForm:!newState
        })
    }
    
    
    
    render() {

      const user1 = JSON.parse(localStorage.getItem('user'));
      const developers = JSON.parse(localStorage.getItem('developers'));
      const projects = JSON.parse(localStorage.getItem('projects'));
      const { first_name, last_name, username, image, kind } = user1
    //    console.log(this.props,user1)
        return (
            user1.kind === "Developer" ? 
            <div > 
                <Container>
                <div className="row">
                <div className="col">
                <img   alt={"avatar"} src={ image } className="profile-img"/>
                <h4>{`${first_name} ${last_name}`}</h4>
                <h6>{ username }</h6>
                <h6>{ kind }</h6>
                <button onClick={this.setEditForm}>edit profile</button>  
                <div style={{display: this.state.editForm ? "block":"none"}}>
                <form onSubmit={ this.editFormSubmitted }>
                    <label htmlFor={"first_name"}>First Name</label>
                    <br/>
                    <input
                    id="first_name"
                    type="text"
                    onChange={this.onChange}
                    name="firstName"
                    value={this.state.firstName }
                    />
                    <br/>

                    <label htmlFor={"last_name"}>Last Name</label>
                    <br/>
                    <input
                    id="last_name"
                    type="text"
                    onChange={this.onChange}
                    name="lastName"
                    value={this.state.lastName}
                    />
                    <br/>
                    
                    <label htmlFor={"username"}>User Name</label>
                    <br/>
                    <input 
                    id="username" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="userName" 
                    value={ this.state.userName }/><br/>

                    <label htmlFor={"image"}>Image</label>
                    <br/>
                    <input 
                    id="image" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="image" 
                    value={ this.state.image }/><br/>

                    <label htmlFor={"experience"}>Experience</label>
                    <br/>
                    <input 
                    id="experience" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="experience" 
                    value={ this.state.experience }/><br/>

                    <label htmlFor={"skill"}>Skill</label>
                    <br/>
                    <input 
                    id="skill" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="skill" 
                    value={ this.state.skill }/><br/>


                    <br/>
                    <input type="submit"/>
                </form>
                    <button onClick={ this.deleteAccount }>Delete Account</button>
                 </div>
                </div>
                    <div className="col card-img">
        <label>{ user1.kind === "Developer" ? `${projects[0].kind}s` :  `${developers[0].kind}s`}</label>
                    { projects.map((project) => {
                        return <Link to={`/projects/${project.id}`} onClick={()=> this.props.setPage(project)}>
                            < Card >
                        <Card.Title>
                        {project.first_name}
                        </Card.Title>
                        < Card.Img src={project.image}/>
                        </Card>
                        </Link>
                    }
                    )}
                    </div>
                </div>
                
                </Container>
            </div>
            :
            <div > 
                <Container>
                <div className="row">
                <div className="col">
                <img alt={"avatar"} src={ image } className="profile-img"/>
                <h4>{`${first_name} ${last_name}`}</h4>
                <h6>{ username }</h6>
                <h6>{ kind }</h6>
                <button onClick={ () => this.setState({ formDisplay: !this.state.formDisplay }) }>post project</button>
                <div style={{display: this.state.formDisplay ? "block" : "none"}}>
                <br/>
                    <form onSubmit={ this.projectSubmitted }>
                    <label htmlFor={"title"}>Title</label>
                    <br/>

                    <input 
                    id="title" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="title" 
                    value={ this.state.title }/>
                    <br/>

                    <label htmlFor={"image"}>Image</label>
                    <br/>
                    <input 
                    id="image" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="image" 
                    value={ this.state.image }/><br/>

                    <label htmlFor={"description"}>description</label>
                    <br/>
                    <input 
                    id="description" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="description" 
                    value={ this.state.description }/><br/>

                    <label htmlFor={"stipulation"}>stipulations</label>
                    <br/>
                    <input 
                    id="stipulation" 
                    type="text" 
                    onChange={ this.onChange } 
                    name="stipulation" 
                    value={ this.state.stipulation }/><br/>

                    <br/>
                    <input type="submit" />
                    </form>
                </div>
                </div>
                    <div className="col">
        <label>{ user1.kind === "Client" ?  `${developers[0].kind}s` : `${projects[0].kind}s`}</label>
                    { developers.map((developer) => {
                        return <Link to={`/developers/${developer.id}`} onClick={()=> this.props.setPage(developer)} key={ developer.id }>
                            < Card >
                        <Card.Title className="card-title-dev">
                        {`${developer.first_name} ${developer.last_name}`}
                        </Card.Title>
                        < Card.Img src={developer.image} className="dev-list-img " style={{ width: "150px",height:"150"}}/>
                        </Card>
                        {/* <div className="card">
                        <img src={ developer.image } alt="Avatar" style={{width:"100%"}} className="dev-list-img"/>
                        <div class="container">
                            <h4><b>{ `${developer.first_name} ${ developer.last_name }` }</b></h4>
                        </div>
                    </div> */}
                        </Link>
                    }
                    )}
                    </div>
                </div>
                
                </Container>
            </div>
        )
    }
}



export default Dashboard
