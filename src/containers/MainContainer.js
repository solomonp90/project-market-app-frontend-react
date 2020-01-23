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
                    
                    <div class="card">
                        <img src={ developer.image } alt="Avatar" style={{width:"100%"}}/>
                        <div class="container">
                            <h4><b>{ `${developer.first_name} ${ developer.last_name }` }</b></h4>
                        </div>
                    </div>
                    
                    </Link> 

                        )                      
                }     
            </div>
        )
    }
}

export default mainContainer
