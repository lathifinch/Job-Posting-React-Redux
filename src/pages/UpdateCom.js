import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

export default class Update extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	comId: '',
    	name: '',
    	description: '',
    	logo: '',
    	location: '',
    	updateMessage: '',
    	isUpdated: '',
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

        const comId = this.state.comId;

        const updateData = {};
        for (var o in this.state) {
          if (Object.hasOwnProperty.call(this.state, o)) {
          	if (!['isUpdated', 'updateMessage', 'alreadyLogin',
              'alreadyLoginMsg', 'isGoLogin', 'comId'].includes(o)
              && this.state[o] !== "") {
          		  updateData[o] = this.state[o];
            }
          }
        }
        // delete updateData['jobId']
        console.log(updateData)

        this.setState({
        	comId: '',
        	name: '',
        	description: '',
        	logo: '',
        	location: '',
        	updateMessage: '',
        	isUpdated: '',
        })

		    if (Object.keys(updateData).length !== 0) {

        this.loadToken('token')
        .then(resToken=>{
        this.getData(updateData, comId, resToken)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isUpdated: 'yes',
          	updateMessage: res.message,
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
        	console.log(err.response.data)
        	this.setState({
        		isUpdated: 'no',
          	updateMessage: err.response.data.status + ', '
        			+ err.response.data.message,
        	})
        })
        })
        .catch(errToken=>{
        	console.log('error')
        	console.log(errToken)
        })

 		    } else {
 		    	this.setState({
        		isUpdated: 'yes',
          	updateMessage: 'Nothing updated!',
        	})
 		    }
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

	getData = async (updateData, comId, resToken) => {
    const result = await axios({
  		method: 'patch',
  		url: 'http://localhost:8080/company/' + comId,
  		data: qs.stringify(updateData),
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
  	      <Label for="comIdLabel">Company's ID</Label>
    	    <Input
    	    	type="text"
    	    	name="comId"
    	    	id="comIdId"
    	    	value={this.state.comId}
            onChange={this.handleChange}
    	    	placeholder="ID of the company you want to update.."
    	    	required
    	    />
      	</FormGroup>
	      <FormGroup>
  	      <Label for="nameLabel">Company's name</Label>
    	    <Input
    	    	type="text"
    	    	name="name"
    	    	id="nameId"
    	    	value={this.state.name}
            onChange={this.handleChange}
    	    	placeholder="New company's name.."
    	    />
      	</FormGroup>
        <FormGroup>
          <Label for="locationLabel">Company's location</Label>
          <Input
            type="text"
            name="location"
            id="locationId"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="New company's location.."
            
          />
        </FormGroup>
        <FormGroup>
          <Label for="logoLabel">Company's logo</Label>
          <Input
            type="text"
            name="logo"
            id="logoId"
            value={this.state.logo}
            onChange={this.handleChange}
            placeholder="New company's logo.."
            
          />
        </FormGroup>
      	<FormGroup>
  	      <Label for="descriptionLabel">Company's description</Label>
    	    <Input
    	    	type="text"
    	    	name="description"
    	    	id="descriptionId"
    	    	value={this.state.description}
            onChange={this.handleChange}
    	    	placeholder="New company's description.."
    	    	
    	    />
      	</FormGroup>
      	<Button>Update</Button>
      </Form>
      {this.state.isUpdated=='yes'&&(
      <Alert color="success">
        {this.state.updateMessage}
      </Alert>
      )}
      {this.state.isUpdated=='no'&&(
      <Alert color="danger">
        {this.state.updateMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Cannot update a company. You are not an admin!
      </Alert>
      )}
      </Container>
    )
  }
}
