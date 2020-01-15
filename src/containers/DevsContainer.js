import React, { Component } from 'react'
// import devsContainer from './DevsContainer'
// import projectsContainer from './ProjectsContainer'
// import Dashboard from '../components/Dashboard'
// import { Route, Switch, NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import DevShow from '../components/DevShow'



export class DevsContainer extends Component {

    
render() {
    // console.log(this.props.developers)
    // let devsArr = this.props.developers
    const { first_name, last_name, image, skill, experience} = this.props.developer

        return (
            
            <div className="row">

                {/* < devsContainer developers={this.props.developers}/>
                
                < projectsContainer projects={this.props.projects}/> */}
                {/* <NavLink to= "/projects">projects</NavLink> */}
                {/* <NavLink to= "/developers">developers</NavLink> */}

                {/* < Dashboard developers={this.props.developers}/> */}
                {/* < Dashboard developers={this.props.developers}/> */}

                {/* < Dashboard 
                clients={ this.props.clients }
                developers={ this.props.developers }
                projects={ this.props.projects }
                user={ this.props.user }
                /> */}

                {/* {
                    this.props.developers.map((dev) => < Dashboard developer={dev} user={ this.props.user }/>)
                } */}

                {/* {
                    this.props.clients.map((client) => < Dashboard client={client} user={ this.props.user }/>)
                }

                {
                    this.props.projects.map((project) => < Dashboard project={project}/>)
                } */}
                
                




                {/* {
                    this.props.developers.map((developer)=> 
                    <Card  style={{ width: '18rem' }} onClick={(evt)=> console.log(developer,developer.id)}>
                        <Card.Img src={developer.image}/>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                
                                < DevShow 
                                developer={developer} 
                                
                                key={developer.id} 
                                
                                />
                            </ListGroup.Item>
                       </ListGroup>
                    </Card>

                        )      
                } */}



   < Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.body>
            <Card.title>{`${first_name} ${last_name}`}</Card.title>
               <Card.text>
               <label>
                    <b>
                     skill:
                    </b>
               </label>
                    {skill}
                    <br/>

               <label>
                    <b>
                     experience:
                    </b>
               </label>
                    {experience}
                    <br/>
               </Card.text>
                </Card.body>
                </Card>
                 
            </div>
        )
    }
}

export default DevsContainer
