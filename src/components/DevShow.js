import React, { Component } from 'react'
// import Card from 'react-bootstrap/Card';
// import ListGroup from 'react-bootstrap/ListGroup';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';

export class DevShow extends Component {
    render() {
        const { first_name, last_name, image, skill, experience} = this.props.developer
        return (
            <div>
                <h4>
                    { `${first_name} ${last_name}` }
                </h4>
                <br/>
                <img src={image} alt={"dev-img"}/>
                <br/>
                <h6>
                    { `${experience} experience with ${skill}`}
                </h6>
            </div>
        )
    }
}

export default DevShow
