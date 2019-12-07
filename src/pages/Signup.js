import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Spinner } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'

const {host, port} = require('../hostport')

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
      isLoading: false,
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
          isLoading: true,
        })
        this.getData(signupData)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isSignup: 'yes',
          	signupMessage: res.message,
            isLoading: false,
        	})
        	setTimeout(() => this.props.history.push('/masuk'), 3000) // kalau /login page not found
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
            isLoading: false,
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
  		url: 'http://'+host+':'+port+'/signup',
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
    	    	placeholder="masukkan username.."
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
    	    	placeholder="masukkan email.."
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
        		placeholder="masukkan password.."
            required
        	/>
      	</FormGroup>
      	<Button>Daftar</Button>
      </Form>
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
      {this.state.isSignup=='yes'&&(
      <React.Fragment>
      <Alert color="success">
        {this.state.signupMessage}
      </Alert>
      </React.Fragment>
      )}
      {this.state.isSignup=='no'&&(
      <Alert color="danger">
        {this.state.signupMessage}
      </Alert>
      )}
      {this.state.isGoLogout=='yes'&&(
      <Alert color="danger">
        Tidak dapat mendaftar. Kamu harus keluar terlebih dahulu!
      </Alert>
      )}
      </Container>
    )
  }
}
