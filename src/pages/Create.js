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

class Create extends Component {

	constructor(props) {
    super(props)
    const data = props.location.state
    if (data===undefined){
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
        isLoading: false,
      }
    } else {
      this.state = {
        name: '',
        desc: '',
        cate: '',
        salary: '',
        loc: '',
        comId: data.id,
        isCreated: '',
        createMessage: '',
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
        isLoading: true,
      })
      this.getData(createData, this.props.user.token)
      .then(res=>{
    	  console.log('result')
    	  console.log(res)
    	  this.setState({
     		  isCreated: 'yes',
       	  createMessage: res.message,
          isLoading: false,
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
          isLoading: false,
     		  isCreated: 'no',
       	  createMessage: err.response.data.status + ', '
     			+ err.response.data.message,
     	  })
      })
    }
  }

  componentWillMount() {

    if (this.props.user.token === '') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Kamu harus masuk terlebih dahulu sebelum dapat membuat lowongan pekerjaan, '
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
  }

  getData = async (createData, resToken) => {
    const result = await axios({
  		method: 'post',
  		url: 'https://'+host+'/jobs',
  		data: qs.stringify(createData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
        // 'Accept': 'application/json',
  		}
		})
    return result.data
  }

  goBack = () => {
    this.props.history.push('/lihatcom')
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
    	    	placeholder="nama pekerjaan.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="locLabel">Lokasi</Label>
          <Input
            type="text"
            name="loc"
            id="locId"
            value={this.state.loc}
            onChange={this.handleChange}
            placeholder="lokasi kerja.."
            required
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
        <FormGroup>
          <Label for="cateLabel">Kategori</Label>
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
          <Label for="salaryLabel">Gaji</Label>
          <Input
            type="number"
            name="salary"
            id="salaryId"
            value={this.state.salary}
            onChange={this.handleChange}
            placeholder="gaji yang ditawarkan.."
            required
          />
        </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="descLabel">Deskripsi</Label>
    	    <Input
    	    	type="textarea"
    	    	name="desc"
    	    	id="descId"
    	    	value={this.state.desc}
            onChange={this.handleChange}
    	    	placeholder="deskripsi pekerjaan.."
    	    	required
    	    />
      	</FormGroup>
        </Col>
      </Row>
      <Row>
        <Col>
      	<FormGroup>
  	      <Label for="comIdLabel">ID Perusahaan</Label>
    	    <Input
    	    	type="text"
    	    	name="comId"
    	    	id="comIdId"
    	    	value={this.state.comId}
            onChange={this.handleChange}
    	    	placeholder="ID perusahaan.."
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
        <Button type="submit">Tambah</Button>
        </Col>
      </Row>
      </Form>
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
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
        Tidak dapat membuat lowongan pekerjaan. Kamu harus masuk terlebih dahulu!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps)(Create);
