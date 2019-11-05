import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

export default class Update extends Component {

	constructor(props) {
    super(props)
    const data = props.location.state
    if (data===undefined){
      this.state = {
      	jobId: '',
      	name: '',
      	description: '',
      	category: '',
      	salary: 0,
      	location: '',
      	updateMessage: '',
      	isUpdated: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
      }
    } else {
      this.state = {
        jobId: data.id,
        name: data.jobs,
        description: data.description,
        category: data.category,
        salary: data.salary,
        location: data.location,
        updateMessage: '',
        isUpdated: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
      }
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
      if (res0 === null) {
        this.setState({
          isGoLogin: 'yes'
        })
      } else {

        const jobId = this.state.jobId;

        const updateData = {};
        for (var o in this.state) {
          if (Object.hasOwnProperty.call(this.state, o)) {
          	if (!['isUpdated', 'updateMessage', 'alreadyLogin',
              'alreadyLoginMsg', 'isGoLogin', 'jobId'].includes(o)
              && this.state[o] !== "") {
          		  if (o !== 'salary') {
          			  updateData[o] = this.state[o];
          		  } else {
          			  updateData[o] = Number(this.state[o]);
          		  }
            	
            }
          }
        }
        // delete updateData['jobId']
        console.log(updateData)

        this.setState({
        	jobId: '',
        	name: '',
        	description: '',
        	category: '',
        	salary: 0,
        	location: '',
        	updateMessage: '',
        	isUpdated: '',
        })

		    if (Object.keys(updateData).length !== 0) {

        this.loadToken('token')
        .then(resToken=>{
        this.getData(updateData, jobId, resToken)
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
    this.loadToken('token')
    .then( res => {
      if (res === null) {
        this.setState({
          alreadyLogin: 'no',
          alreadyLoginMsg: 'You have to login first before you can update a job, '
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

	getData = async (updateData, jobId, resToken) => {
    const result = await axios({
  		method: 'patch',
  		url: 'http://localhost:8080/jobs/' + jobId,
  		data: qs.stringify(updateData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
    return result.data
   }

  render() {
    const categoryArray = [
      'Pendidikan', 'Kuliner', 'Programmer', 'IT', 'Desain', 'Olah Raga', 'Kesenian',
      'Hukum', 'Administrasi', 'Lainnya', 'Manajemen', 'Matematika', 'Data', 'Ekonomi',
      'Psikologi', 'Sosial', 'Otomotif', 'Kesehatan', 'Kedokteran', 'Pertanian', 'Peternakan'
    ];
    categoryArray.sort();
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
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="nameLabel">Job's name</Label>
          <Input
            type="text"
            name="name"
            id="nameId"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="New job's name.."
          />
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="locationLabel">Job's location</Label>
          <Input
            type="text"
            name="location"
            id="locationId"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="New job's location.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="categoryLabel">Job's category</Label>
          <Input
            type="select"
            name="category"
            id="categoryId"
            value={this.state.category}
            onChange={this.handleChange}
            placeholder="New job's category.."
          >
          <option value=''>...</option>
          {categoryArray.map( (v) => (
            <option keys={v} value={v}>{v}</option>
          ))}
          </Input>
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="salaryLabel">Job's salary</Label>
          <Input
            type="number"
            name="salary"
            id="salaryId"
            value={this.state.salary}
            onChange={this.handleChange}
            placeholder="New job's salary.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
          <Label for="descriptionLabel">Job's description</Label>
          <Input
            type="textarea"
            name="description"
            id="descriptionId"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="New job's description.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="jobIdLabel">Job's ID</Label>
    	    <Input
    	    	type="text"
    	    	name="jobId"
    	    	id="jobIdId"
    	    	value={this.state.jobId}
            onChange={this.handleChange}
    	    	placeholder="ID of the job you want to update.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<Button>Update</Button>
        </Col>
      </Row>
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
        Cannot update a job. You must log in first!
      </Alert>
      )}
      </Container>
    )
  }
}
