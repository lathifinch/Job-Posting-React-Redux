import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'

export default class Signup extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	username: '',
    	password: '',
    	email: '',
    	isSignup: '',
    	signupMessage: '',
      isGoLogout: '',
    }
  }

  handleChange = (event) => {
    event.preventDefault()
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.loadToken('token')
    .then( res0 => {
      if (res0 !== null) {
        this.setState({
          isGoLogout: 'yes'
        })
      } else {

        const username = this.state.username;
        const password = this.state.password;
        const email = this.state.email;
        const signupData = {
        	'username': username,
        	'password': password,
        	'email': email,
        }
        // const loginData = event.target;
        console.log(signupData)
        this.setState({
          username: '',
          password: '',
          email: '',
        })
        this.getData(signupData)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isSignup: 'yes',
          	signupMessage: res.message,
        	})
        	setTimeout(() => this.props.history.push('/login'), 3000)
        	// res.result.authorization
        	// res.result.message
        	// localStorage.setItem('token', res.result.authorization);
   	    	// localStorage.getItem('myData');
   	    	// console.log('token was saved to local')
        })
        .catch(err=>{
        	console.log('error')
        	console.log(err.response.data)
        	this.setState({
        		isSignup: 'no',
          	signupMessage: err.response.data.status + ', '
        			+ err.response.data.message,
        	})
        })
      }
    })
    .catch( err0 => {
      console.log(err0)
    })
  }

  getData = async (signupData) => {
    const result = await axios({
  		method: 'post',
  		url: 'http://localhost:8080/signup',
  		data: qs.stringify(signupData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  		}
		})
    return result.data
   }

  loadToken = async (keyToken) => {
    const resultToken = await localStorage.getItem(keyToken);
    return resultToken
  }

  render() {
    return (
    	<Container>
      <Form onSubmit={this.handleSubmit}>
	      <FormGroup>
  	      <Label for="usernameLabel">Username</Label>
    	    <Input
    	    	type="text"
    	    	name="username"
    	    	id="usernameId"
    	    	value={this.state.username}
            onChange={this.handleChange}
    	    	placeholder="enter username.."
            required
    	    />
      	</FormGroup>
      	<FormGroup>
  	      <Label for="emailLabel">Email</Label>
    	    <Input
    	    	type="email"
    	    	name="email"
    	    	id="emailId"
    	    	value={this.state.email}
            onChange={this.handleChange}
    	    	placeholder="enter email.."
            required
    	    />
      	</FormGroup>
      	<FormGroup>
        	<Label for="passwordLabel">Password</Label>
        	<Input
        		type="password"
        		name="password"
        		id="passwordId"
        		value={this.state.password}
            onChange={this.handleChange}
        		placeholder="enter password.."
            required
        	/>
      	</FormGroup>
      	<Button>Register</Button>
      </Form>
      {this.state.isSignup=='yes'&&(
      <Alert color="success">
        {this.state.signupMessage}
      </Alert>
      )}
      {this.state.isSignup=='no'&&(
      <Alert color="danger">
        {this.state.signupMessage}
      </Alert>
      )}
      {this.state.isGoLogout=='yes'&&(
      <Alert color="danger">
        Cannot register. You must log out first!
      </Alert>
      )}
      </Container>
    )
  }
}
