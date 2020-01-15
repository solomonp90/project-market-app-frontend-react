import React, { Component } from 'react'
import  { Row, Container, Col }from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';

export class Dashboard extends Component {
    
    render() {
        // const { first_name, last_name, username, image, domain} = this.props.client
        // const { first_name, last_name, username, image, skill, experience} = this.props.developer
        // const { first_name, last_name, username, image } = this.props.user
        //  console.log(this.props.user)
        
        return (
            
            <div>
             Hello from dashboard   
             {/* < Card style={{ width: '18rem' }}>
                 < Card.img variant="top" src={image}/>
                 < Card.body>
                 <Card.Title>{`${first_name} ${last_name}`}</Card.Title>
                 <Card.text>
                            <label>
                                <b>

                                </b>
                            </label>
                            {kind}
                            <br/>

                            <label>
                                <b>
                                    Zip:
                                </b>
                            </label>
                            {zip}
                            <br/>

                            <label>
                                <b>
                                Details:
                                </b>  
                            </label>
                            {details}
                            <br/>
                 </Card.text>
                 </Card.body>
             </Card>    */}
             
            </div>
        )
    }
}

export default Dashboard
