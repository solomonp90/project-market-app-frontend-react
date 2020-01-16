import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch, NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



export class mainContainer extends Component {

    
render() {
   
        return (
            
            <div className="row">
                
                {
                    this.props.developers.map((developer)=>
                    < Link to={`/developers/${developer.id}`} onClick={()=>this.props.setPage(developer)} key={ developer.id }>
                    <Card  style={{ width: '18rem' }}  >
                        <Card.Img src={developer.image}/>
                        <Card.Title>
                            {`${developer.first_name} ${developer.last_name}`}
                        </Card.Title>
                          { <h6>{developer.experience} experience with {developer.skill}</h6>}
                        <ListGroup variant="flush">
                            <ListGroup.Item >
                                
                               

                                
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

export default mainContainer
