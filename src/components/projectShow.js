import React, { Component } from 'react'

export class ProjectShow extends Component {
    render() {
        const { title, image, description, stipulation} = this.props.project
        return (
            <div>
               
                <img alt={"project-img"} src={ image }/>
                <br/>
                <h4>{title}</h4>
        <p>{ description }</p>
        <br/>
        <p>{ stipulation }</p>

            </div>
        )
    }
}

export default ProjectShow
