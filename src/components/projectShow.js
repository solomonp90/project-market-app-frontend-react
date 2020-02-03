import React, { Component } from 'react'

export class ProjectShow extends Component {

    state = {
        contractDisp:false,
        signature:"",
        formDisplay:false
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    
    setFormDisplay = () => {
        let newState = this.state.formDisplay
        this.setState({
            formDisplay:!newState
        })
    }
    

    contractSubmitted = (event) => {
        event.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'));
        console.log("from ct submitted!!!")
        console.log(user)
        fetch(`http://localhost:3000/contracts`, {
          method:'POST',
         headers: { 
             'Content-type': 'application/json',
             "Accept": "application/json"
         },
         body: JSON.stringify({
             signature: this.state.signature,
             project_id:this.props.project.id,
             developer_id:user.id,
             kind:"Contract"
          })
        })
        .then(r => r.json())
        .then((contract) => {
            this.setState({
                formDisplay:false
            })
            // Reminder:make a function to change state and redirect user to another page
        }
        )
    }
    
    

    render() {
        const { title, image, description, stipulation} = this.props.project
        const user = JSON.parse(localStorage.getItem('user'));
        const { kind } = user
        return (
            <div>
               
                <img alt={"project-img"} src={ image }/>
                <br/>
                <h4>{title}</h4>
        <p>{ description }</p>
        <br/>
        <p>{ stipulation }</p>
            <button 
            style={{display: kind === "Developer" ? "block":"none"}}
            onClick={this.setFormDisplay}
             >sign contract</button>
             <div style={{display: this.state.formDisplay ? "block":"none"}}>
                 <br/>
            <form onSubmit={ this.contractSubmitted }>
            <label htmlFor={"signature"}>signature:</label>
            <input
            id={"signature"}
            type="text"
            onChange={ this.onChange }
            name="signature"
            value={ this.state.signature}
            />
            <br/>
            <input
            type="submit" 
            />
            </form>
             </div>
            </div>
        )
    }
}

export default ProjectShow
