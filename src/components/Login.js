import React, { Component } from 'react'


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
              console.log(this.props)
          })

      }
    

      signUpSubmitted = (event) => {
        event.preventDefault()
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

        }

      }

    
      render(){

        return (
          this.state.logIn ? 
        <div>
          <ul className="errors">
            {
              this.state.errors.map(error => <li>{ error }</li>)
            }
          </ul>
          
              <h2>Log In</h2>
              <button className="button" onClick={ () => this.setState({ logIn: false }) }>click to register</button>
              <form onSubmit={ this.logInSubmitted }>
              <br/>
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
                        <br/>
                <input className="button" type="submit" />
              </form>

              <div>
              <br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/><br/><br/><br/>
                <br/><br/><br/>
              </div>
            </div>
            : 
            <div>
              <h2>Sign up</h2>
              <button className="button" onClick={ () => this.setState({ logIn: true }) }>I already signed up!!!</button>
          <button className="button" style={{display: this.state.isClient ? "none" : "block"}} onClick={ () => this.setState({ kind: "Client",isClient: true }) }>click here if your a client!</button>
          <button className="button" style={{display: this.state.isClient ? "block" : "none"}} onClick={ () => this.setState({ kind: "Developer",isClient: false }) }>click here if your a developer!</button>
              <form onSubmit={ this.signUpSubmitted }>
              <label  htmlFor="sign_up_first_name">first name</label><br/>
                <input  id="sign_up_first_name" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="first_name" 
                        value={ this.state.first_name } /><br/>

                <label  htmlFor="sign_up_last_name">last name</label><br/>
                <input  id="sign_up_last_name" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="last_name" 
                        value={ this.state.last_name } /><br/>

                <label  htmlFor="sign_up_username">Username</label><br/>
                <input  id="sign_up_username" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="username" 
                        value={ this.state.username } /><br/>

                <label  htmlFor="sign_up_password">Password</label><br/>
                <input  id="sign_up_password" 
                        type="password" 
                        onChange={ this.onChange } 
                        name="password" 
                        value={ this.state.password } /><br/>

                <label  htmlFor="sign_up_image">image url</label><br/>
                <input  id="sign_up_image" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="image" 
                        value={ this.state.image } /><br/>

                <label  htmlFor="sign_up_kind">kind</label><br/>
                <input  id="sign_up_kind" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="kind" 
                        value={ this.state.kind } /><br/>
                              <br/>
                        <div style={{display: !this.state.isClient ? 'none' : 'block'} }>    
                <label  htmlFor="sign_up_domain">domain</label><br/>
                <input  id="sign_up_domain" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="domain" 
                        value={ this.state.domain } /><br/>
                  </div>

                <div style={{display: this.state.isClient ? 'none' : 'block'} } >

                <label  htmlFor="sign_up_skill">skill</label><br/>
                <input  id="sign_up_skill" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="skill" 
                        value={ this.state.skill } /><br/>
                                <br/>
                <label  htmlFor="sign_up_experience">experience</label><br/>
                <input  id="sign_up_experience" 
                        type="text" 
                        onChange={ this.onChange } 
                        name="experience" 
                        value={ this.state.experience } /><br/>

                        </div>
                <br/>
                <input className="button" type="submit" />
              </form>
            </div>
          
         
        )
        
        
      }
      
    }

export default Login



