import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Delete extends Component {

	constructor(props) {
    super(props)
    const data = props.location.state
    if (data===undefined){
      this.state = {
      	jobId: '',
      	deleteMessage: '',
        isDeleted: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
      }
    } else {
      this.state = {
        jobId: data.id,
        deleteMessage: '',
        isDeleted: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
      }
    }
  }

  // const data = props.location.state

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
      if (res0 === null) {
        this.setState({
          isGoLogin: 'yes'
        })
      } else {

        const jobId = this.state.jobId;
        // const deleteData = {
        // 	'jobId': jobId,
        // }
        // const deleteData = jobId;
        // const loginData = event.target;
        // console.log(deleteData)
        this.setState({
          jobId: '',
        })
        this.loadToken('token')
        .then(resToken=>{
        this.getData(jobId, resToken)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
        		isDeleted: 'yes',
          	deleteMessage: res.message,
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
        		isDeleted: 'no',
          	deleteMessage: err.response.data.status + ', '
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
    this.loadToken('token')
    .then( res => {
      if (res === null) {
        this.setState({
          alreadyLogin: 'no',
          alreadyLoginMsg: 'You have to login first before you can delete a job, '
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

	getData = async (jobId, resToken) => {
    const result = await axios({
  		method: 'delete',
  		url: 'http://localhost:8080/jobs/' + jobId,
  		// data: qs.stringify(loginData),
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
          {this.state.alreadyLoginMsg} <Link to='/masuk'>log in here</Link>.
        </Alert>
        )
      }
      <Form onSubmit={this.handleSubmit}>
	      <FormGroup>
  	      <Label for="jobIdLabel">Job ID</Label>
    	    <Input
    	    	type="text"
    	    	name="jobId"
    	    	id="jobIdId"
    	    	value={this.state.jobId}
            onChange={this.handleChange}
    	    	placeholder="Job ID you want to delete.."
    	    	required
    	    />
      	</FormGroup>
      	<Button>Delete</Button>
      </Form>
      {this.state.isDeleted=='yes'&&(
      <Alert color="success">
        {this.state.deleteMessage}
      </Alert>
      )}
      {this.state.isDeleted=='no'&&(
      <Alert color="danger">
        {this.state.deleteMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Cannot delete a job. You must log in first!
      </Alert>
      )}
      </Container>
    )
  }
}
