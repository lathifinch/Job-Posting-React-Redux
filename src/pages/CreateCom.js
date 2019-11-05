import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

export default class CreateCom extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	name: '',
    	desc: '',
      logo: '',
    	loc: '',
    	isCreated: '',
    	createMessage: '',
      alreadyLogin: '',
      alreadyLoginMsg: '',
      isGoLogin: '',
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

    this.loadToken('username')
    .then( res0 => {
      if (res0 !== 'lathifalrasyid') {
        this.setState({
          isGoLogin: 'yes'
        })
      } else {

        const name = this.state.name;
        const desc = this.state.desc;
        const logo = this.state.logo;
        const loc = this.state.loc;
        const createData = {
        	'name': name,
        	'description': desc,
        	'logo': logo,
        	'location': loc,
        }
        // const loginData = event.target;
        console.log(createData)
        this.setState ({
        	name: '',
        	desc: '',
        	logo: '',
        	loc: '',
        })
        this.loadToken('token')
        .then(resToken=>{
        this.getData(createData, resToken)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isCreated: 'yes',
          	createMessage: res.message,
        	})
        	// setTimeout(() => this.props.history.push('/'), 3000)
        	// res.result.authorization
        	// res.result.message
        	// localStorage.setItem('token', res.result.authorization);
   	    	// localStorage.getItem('myData');
   	    	// console.log('token was saved to local')
        })
        .catch(err=>{
        	console.log('error')
        	console.log(err)
        	this.setState({
        		isCreated: 'no',
          	createMessage: err.response.data.status + ', '
        			+ err.response.data.message,
        	})
        })
        })
        .catch(errToken=>{
        	console.log('error')
        	console.log(errToken)
        })
      }
    })
    .catch( err0 => {
      console.log(err0)
    })
  }

  componentWillMount() {
    this.loadToken('username')
    .then( res => {
      if (res !== 'lathifalrasyid') {
        this.setState({
          alreadyLogin: 'no',
          alreadyLoginMsg: 'Only admin can create a company.'
        })  
      } else {
        this.setState({
          alreadyLogin: 'yes',
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

  getData = async (createData, resToken) => {
    const result = await axios({
  		method: 'post',
  		url: 'http://localhost:8080/company',
  		data: qs.stringify(createData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
    return result.data
   }

  render() {
    return (
    	<Container>
      {this.state.alreadyLogin==='no'&&
        (
        <Alert color="danger">
          {this.state.alreadyLoginMsg}
        </Alert>
        )
      }
      <Form onSubmit={this.handleSubmit}>
	      <FormGroup>
  	      <Label for="nameLabel">Company name</Label>
    	    <Input
    	    	type="text"
    	    	name="name"
    	    	id="nameId"
    	    	value={this.state.name}
            onChange={this.handleChange}
    	    	placeholder="Company's name.."
    	    	required
    	    />
      	</FormGroup>
        <FormGroup>
          <Label for="locLabel">Location</Label>
          <Input
            type="text"
            name="loc"
            id="locId"
            value={this.state.loc}
            onChange={this.handleChange}
            placeholder="Company's location.."
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="logoLabel">Logo</Label>
          <Input
            type="text"
            name="logo"
            id="logoId"
            value={this.state.logo}
            onChange={this.handleChange}
            placeholder="Insert the logo.."
            required
          />
        </FormGroup>
      	<FormGroup>
  	      <Label for="descLabel">Description</Label>
    	    <Input
    	    	type="text"
    	    	name="desc"
    	    	id="descId"
    	    	value={this.state.desc}
            onChange={this.handleChange}
    	    	placeholder="Description of the company.."
    	    	required
    	    />
      	</FormGroup>
      	<Button>Create</Button>
      </Form>
      {this.state.isCreated=='yes'&&(
      <Alert color="success">
        {this.state.createMessage}
      </Alert>
      )}
      {this.state.isCreated=='no'&&(
      <Alert color="danger">
        {this.state.createMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Cannot create a company. You are not an admin!
      </Alert>
      )}
      </Container>
    )
  }
}
