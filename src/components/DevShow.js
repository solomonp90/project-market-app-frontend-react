import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

export class DevShow extends Component {
    render() {
        // const { first_name, last_name, image, skill, experience} = this.props.developer
        return (
            <div>
                {/* <h4>
                    { `${first_name} ${last_name}` }
                </h4>
                <br/>
                <img src={image} alt={"dev-img"}/>
                <br/>
                <h6>
                    { `${experience} of ${skill}`}
                </h6> */}


                {/* < Card style={{ width: '18rem' }}>
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
                </Card> */}
            </div>
        )
    }
}

export default DevShow
