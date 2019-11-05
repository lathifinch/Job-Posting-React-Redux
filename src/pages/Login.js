import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

// import NavBar from './NavBar'

export default class Login extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	username: '',
    	password: '',
    	isLogin: '',
    	loginMessage: '',
      alreadyLogin: '',
      alreadyLoginMsg: '',
      isGoLogout: ''
    }
  }

	someFn = () => {
		const isLogedin = true;
    this.props.callbackFromParent(isLogedin);
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
        const loginData = {
        	'username': username,
        	'password': password,
        }
        // const loginData = event.target;
        console.log(loginData)
        this.setState({
          username: '',
          password: '',
        })
        this.getData(loginData)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isLogin: 'yes',
          	loginMessage: res.message,
        	})
        	// res.result.authorization
        	// res.result.message
        	localStorage.setItem('token', res.result.authorization);
          localStorage.setItem('username', res.message.substring(9, res.message.length));
   	    	// localStorage.getItem('myData');
   	    	console.log('token was saved to local')
   	    	// this.someFn()
   	    	setTimeout(() => this.props.history.push('/'), 3000)
   	    	// return <NavBar isLogedin={true}/>
        })
        .catch(err=>{
        	console.log('error')
        	console.log(err.response.data)
        	this.setState({
        		isLogin: 'no',
          	loginMessage: err.response.data.status + ', '
        			+ err.response.data.message,
        	})
        })
      }
    })
    .catch( err0 => {
      console.log(err0)
    })
  }

  getData = async (loginData) => {
    const result = await axios({
  		method: 'post',
  		url: 'http://localhost:8080/login',
  		data: qs.stringify(loginData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  		}
		})
    return result.data
   }

  componentWillMount() {
    this.loadToken('token')
    .then( res => {
      if (res === null) {
        this.setState({
          alreadyLogin: 'no'
        })  
      } else {
        this.loadToken('username')
        .then( res2 => {
          this.setState({
            alreadyLogin: 'yes',
            alreadyLoginMsg: 'You were already loged in as ' + res2
          })
        })
        .catch( err2 => {
          console.log(err2)
        })
      }
    })
    .catch( err => {
      console.log(err)
    })
  }

  loadToken = async (keyToken) => {
    const resultToken = await localStorage.getItem(keyToken);
    return resultToken
  }

  render() {
    return (
    	<Container>
      {this.state.alreadyLogin==='yes'?
        (
        <Alert color="danger">
          {this.state.alreadyLoginMsg}
        </Alert>
        ):(
          <Alert color="info">
            Haven't registered yet? <Link to='/daftar'>sign up here</Link>!
          </Alert>
        )
      }
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
      	<Button>Log in</Button>
      </Form>
      {this.state.isLogin=='yes'&&(
      <Alert color="success">
        {this.state.loginMessage}
      </Alert>
      )}
      {this.state.isLogin=='no'&&(
      <Alert color="danger">
        {this.state.loginMessage}
      </Alert>
      )}
      {this.state.isGoLogout=='yes'&&(
      <Alert color="danger">
        Cannot log in. You must log out first!
      </Alert>
      )}
      </Container>
    )
  }
}
