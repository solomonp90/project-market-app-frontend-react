import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Login extends Component {

    
    state = {
        logIn: true,
        username: "",
        password: "",
        first_name:"",
        last_name:"",
        kind:"",
        experience:"",
        skill:"",
        domain:"",
        image:"",
        errors: [],
        isClient:null
        
      }
    
      onChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
    
      logInSubmitted = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        }).then(res => res.json())      
          .then(data => {
            if (data.errors)
              this.setState({
                errors: data.errors
              })
            else            
              this.props.setToken(data.token, data.user_id, data.user)
          })

      }
    

      signUpSubmitted = (event) => {
        event.preventDefault()
        // console.log(event)
        // this.setState({ isClient: })
        if (this.state.kind === "Client") {
          
         return fetch("http://localhost:3000/clients", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            image: this.state.image,
            domain:this.state.domain,
            kind:this.state.kind

          })
        }).then(r => r.json())
        .then((data)=>{
          if (data.errors) {
            this.setState({
              errors:data.errors
            })
          } else {
            console.log(data)
            this.props.setToken(data.token, data.user_id, data.user)
          }
        })
        } else if ( this.state.kind === "Developer") {
          return fetch(`http://localhost:3000/developers`, {
            method:'POST',
           headers: { 
               'Content-type': 'application/json',
               "Accept": "application/json"
           },
           body: JSON.stringify({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            password: this.state.password,
            image: this.state.image,
            experience:this.state.experience,
            skill: this.state.skill,
            kind:this.state.kind
            })
          })
          .then(r => r.json())
          .then((data) => {
            
            if (data.errors){
                this.setState({
                  errors:data.errors
                })
            } else{
              console.log(data)
              this.props.setToken(data.token, data.user_id, data.user)
            }
          }
          )
        } else {
          // console.log("no good",this.state.kind,"you need to change whats in this function set token wont work for signup submitted because set token does something else")
        }

      }

    
      render(){
        return <section >
          <ul className="errors">
            {
              this.state.errors.map(error => <li>{ error }</li>)
            }
          </ul>
          {
            this.state.logIn 
            ? <>
              <h2>Log In</h2>
              <button onClick={ () => this.setState({ logIn: false }) }>I need to register!!!</button>
              <form onSubmit={ this.logInSubmitted }>
                <label  htmlFor="log_in_username">Username</label>
                <input  id="log_in_username" 
                        type="text" 
                        onChange={ this.onChange /* for controlled form input status */ } 
                        name="username" 
                        value={ this.state.username /* for controlled form input status */ } />
                <label  htmlFor="log_in_password">Password</label>
                <input  id="log_in_password" 
                        type="password" 
                        onChange={ this.onChange } 
                        name="password" 
                        value={ this.state.password } />
                <input type="submit" />
              </form>
            </>
            : <>
              <h2>Sign up</h2>
              <button onClick={ () => this.setState({ logIn: true }) }>I already signed up!!!</button>
          <button style={{display: this.state.isClient ? "none" : "block"}} onClick={ () => this.setState({ kind: "Client",isClient: true }) }>click here if your a client!</button>
          <button style={{display: this.state.isClient ? "block" : "none"}} onClick={ () => this.setState({ kind: "Developer",isClient: false }) }>click here if your a developer!</button>
              <form onSubmit={ this.signUpSubmitted }>
              <label  htmlFor="sign_up_first_name">first name</label>
                <input  id="sign_up_first_name" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="first_name" 
                        value={ this.state.first_name } />

                <label  htmlFor="sign_up_last_name">last name</label>
                <input  id="sign_up_last_name" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="last_name" 
                        value={ this.state.last_name } />

                <label  htmlFor="sign_up_username">Username</label>
                <input  id="sign_up_username" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="username" 
                        value={ this.state.username } />

                <label  htmlFor="sign_up_password">Password</label>
                <input  id="sign_up_password" 
                        type="password" 
                        onChange={ this.onChange } 
                        name="password" 
                        value={ this.state.password } />

                <label  htmlFor="sign_up_image">image url</label>
                <input  id="sign_up_image" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="image" 
                        value={ this.state.image } />

                <label  htmlFor="sign_up_kind">kind</label>
                <input  id="sign_up_kind" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="kind" 
                        value={ this.state.kind } />
                              <br/>
                        <div style={{display: !this.state.isClient ? 'none' : 'block'} }>    
                <label  htmlFor="sign_up_domain">domain</label>
                <input  id="sign_up_domain" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="domain" 
                        value={ this.state.domain } />
                  </div>

                <div style={{display: this.state.isClient ? 'none' : 'block'} } >

                <label  htmlFor="sign_up_skill">skill</label>
                <input  id="sign_up_skill" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="skill" 
                        value={ this.state.skill } />
                                <br/>
                <label  htmlFor="sign_up_experience">experience</label>
                <input  id="sign_up_experience" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="experience" 
                        value={ this.state.experience } />

                        </div>
                <br/>
                <input type="submit" />
              </form>
            </>
          }
        </section>
      }
    
}

export default Login



