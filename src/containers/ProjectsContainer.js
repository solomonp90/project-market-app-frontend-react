import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export class ProjectsContainer extends Component {
    render() {
        return (
            <div className="row">
                 {
                    this.props.projects.map((project)=>
                    < Link to={`/projects/${project.id}`} onClick={()=>this.props.setPage(project)} key={ project.id }>
                    <Card  style={{ width: '18rem' }}  >
                        <Card.Img src={project.image}/>
                        <Card.Title>
                            { project.title }
                        </Card.Title>
                          
                        <ListGroup variant="flush">
                            <ListGroup.Item >
                                
                                {/* < DevShow 
                                project={project}                               
                                key={project.id}                                
                                /> */}

                                
                            </ListGroup.Item>
                       </ListGroup>
                    </Card>
                    </Link> 

                        )                  
                }
            </div>
        )
    }
}

export default ProjectsContainer
