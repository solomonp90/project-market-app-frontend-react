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
