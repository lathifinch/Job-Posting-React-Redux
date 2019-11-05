import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Row, Col } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

export default class Create extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	name: '',
    	desc: '',
    	cate: '',
    	salary: '',
    	loc: '',
    	comId: '',
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

    this.loadToken('token')
    .then( res0 => {
      if (res0 === null) {
        this.setState({
          isGoLogin: 'yes'
        })
      } else {

        const name = this.state.name;
        const desc = this.state.desc;
        const cate = this.state.cate;
        const salary = this.state.salary;
        const loc = this.state.loc;
        const comId = this.state.comId;
        const createData = {
        	'name': name,
        	'description': desc,
        	'category': cate,
        	'salary': Number(salary),
        	'location': loc,
        	'company_id': comId,
        }
        // const loginData = event.target;
        console.log(createData)
        this.setState ({
        	name: '',
        	desc: '',
        	cate: '',
        	salary: '',
        	loc: '',
        	comId: '',
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
    this.loadToken('token')
    .then( res => {
      if (res === null) {
        this.setState({
          alreadyLogin: 'no',
          alreadyLoginMsg: 'You have to login first before you can post a job, '
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
  		url: 'http://localhost:8080/jobs',
  		data: qs.stringify(createData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
        // 'Accept': 'application/json',
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
  	      <Label for="nameLabel">Job name</Label>
    	    <Input
    	    	type="text"
    	    	name="name"
    	    	id="nameId"
    	    	value={this.state.name}
            onChange={this.handleChange}
    	    	placeholder="enter job name.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="locLabel">Location</Label>
          <Input
            type="text"
            name="loc"
            id="locId"
            value={this.state.loc}
            onChange={this.handleChange}
            placeholder="enter job's location.."
            required
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="cateLabel">Category</Label>
          <Input
            type="select"
            name="cate"
            id="cateId"
            value={this.state.cate}
            onChange={this.handleChange}
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
          <Label for="salaryLabel">Salary</Label>
          <Input
            type="number"
            name="salary"
            id="salaryId"
            value={this.state.salary}
            onChange={this.handleChange}
            placeholder="enter salary to be offered.."
            required
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="descLabel">Description</Label>
    	    <Input
    	    	type="textarea"
    	    	name="desc"
    	    	id="descId"
    	    	value={this.state.desc}
            onChange={this.handleChange}
    	    	placeholder="enter description of the job.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="comIdLabel">Your Company ID</Label>
    	    <Input
    	    	type="text"
    	    	name="comId"
    	    	id="comIdId"
    	    	value={this.state.comId}
            onChange={this.handleChange}
    	    	placeholder="enter company ID.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<Button>Post</Button>
        </Col>
      </Row>
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
        Cannot post a job. You must log in first!
      </Alert>
      )}
      </Container>
    )
  }
}
