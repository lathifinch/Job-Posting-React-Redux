import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Row, Col, Spinner } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

const {host, port} = require('../hostport')

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

class Update extends Component {

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
        isLoading: false,
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
        isFromRead: true,
        isLoading: false,
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

    if (this.props.user.token === '') {
      this.setState({
        isGoLogin: 'yes'
      })
    } else {

      const jobId = this.state.jobId;
      const updateData = {};
      for (var o in this.state) {
        if (Object.hasOwnProperty.call(this.state, o)) {
        	if (!['isUpdated', 'updateMessage', 'alreadyLogin',
            'alreadyLoginMsg', 'isGoLogin', 'jobId', 'isFromRead'].includes(o)
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
        isLoading: true,
      })

	    if (Object.keys(updateData).length !== 0) {

        this.getData(updateData, jobId, this.props.user.token)
        .then(res=>{
        	console.log('result')
        	console.log(res)
        	this.setState({
            isLoading: false,
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
            isLoading: false,
        		isUpdated: 'no',
          	updateMessage: err.response.data.status + ', '
        			+ err.response.data.message,
        	})
        })

	    } else {
	    	this.setState({
          isLoading: false,
      		isUpdated: 'yes',
        	updateMessage: 'Nothing updated!',
      	})
	    }
    }
  }

  componentWillMount() {
    if (this.props.user.token === '') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Kamu harus masuk terlebih dahulu sebelum dapat memperbarui lowongan pekerjaan, '
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
  }

	getData = async (updateData, jobId, resToken) => {
    const result = await axios({
  		method: 'patch',
  		url: 'https://'+host+'/jobs/' + jobId,
  		data: qs.stringify(updateData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
    return result.data
   }

  goBack = () => {
    this.props.history.push('/')
  }

  render() {
    const categoryArray = [
      'Pendidikan', 'Kuliner', 'Programmer', 'IT', 'Desain', 'Olah Raga', 'Kesenian',
      'Hukum', 'Administrasi', 'Lainnya', 'Manajemen', 'Matematika', 'Data', 'Ekonomi',
      'Psikologi', 'Sosial', 'Otomotif', 'Kesehatan', 'Kedokteran', 'Pertanian', 'Peternakan',
      'Transportasi'
    ];
    categoryArray.sort();
    return (
      <Container>
      {this.state.alreadyLogin==='no'&&
        (
        <Alert color="danger">
          {this.state.alreadyLoginMsg} <Link to='/masuk'>masuk di sini</Link>.
        </Alert>
        )
      }
      <Form onSubmit={this.handleSubmit}>
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="nameLabel">Nama Pekerjaan</Label>
          <Input
            type="text"
            name="name"
            id="nameId"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="nama pekerjaan yang baru.."
          />
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="locationLabel">Lokasi Pekerjaan</Label>
          <Input
            type="text"
            name="location"
            id="locationId"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="lokasi kerja yang baru.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="categoryLabel">Kategori</Label>
          <Input
            type="select"
            name="category"
            id="categoryId"
            value={this.state.category}
            onChange={this.handleChange}
            placeholder="kategori pekerjaan yang baru.."
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
          <Label for="salaryLabel">Gaji</Label>
          <Input
            type="number"
            name="salary"
            id="salaryId"
            value={this.state.salary}
            onChange={this.handleChange}
            placeholder="besar gaji yang baru.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormGroup>
          <Label for="descriptionLabel">Deskripsi</Label>
          <Input
            type="textarea"
            name="description"
            id="descriptionId"
            value={this.state.description}
            onChange={this.handleChange}
            placeholder="deskripsi pekerjaan yang baru.."
            
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="jobIdLabel">ID Pekerjaan</Label>
    	    <Input
    	    	type="text"
    	    	name="jobId"
    	    	id="jobIdId"
    	    	value={this.state.jobId}
            onChange={this.handleChange}
    	    	placeholder="ID pekerjaan yang diperbarui.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	{this.state.isFromRead &&(
        <React.Fragment>
        <Button type="button" onClick={this.goBack}>Kembali</Button>
        <span>&nbsp;</span>
        </React.Fragment>
        )}
        <Button type="submit">Perbarui</Button>
        </Col>
      </Row>
      </Form>
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
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
        Tidak dapat memperbarui lowongan pekerjaan. Kamu harus masuk terlebih dahulu!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps)(Update);
