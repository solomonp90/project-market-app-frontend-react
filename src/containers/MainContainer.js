import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route, Switch, NavLink } from 'react-router-dom'
import Card from 'react-bootstrap/Card';



export class mainContainer extends Component {

    
render() {
   
        return (
            
            <div className="row">
                
                {
                    this.props.developers.map((developer)=>
                    < Link to={`/developers/${developer.id}`} onClick={()=>this.props.setPage(developer)} key={ developer.id }>
                     < Card >
                        <Card.Title >
                        {`${developer.first_name} ${developer.last_name}`}
                        </Card.Title>
                        < Card.Img src={developer.image} className="devIdx" style={{ width: "300px",height:"300"}}/>
                        </Card>
                    </Link> 

                        )                      
                }     
            </div>
        )
    }
}

export default mainContainer
