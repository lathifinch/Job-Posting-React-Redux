import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Spinner } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {addCompany} from '../redux/actions/company'

const mapStatetoProps = state => {
  return {
    user: state.user,
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCompany: (createData, resToken) => dispatch(addCompany(createData, resToken))
  }
}

class CreateCom extends Component {

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
      isSubmit: false,
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

	handleSubmit = async (event) => {
    event.preventDefault();

    if (this.props.user.username !== 'lathifalrasyid') {
      this.setState({
        isGoLogin: 'yes'
      })
    } else {
      this.setState({
        isSubmit: true,
        isLoading: true,
      })

      const fd = new FormData()
      fd.append('name', event.target.name.value)
      fd.append('location', event.target.loc.value)
      fd.append('description', event.target.desc.value)
      fd.append('logo',event.target.logo.files[0])

      // const name = this.state.name;
      // const desc = this.state.desc;
      // const logo = this.state.logo;
      // const loc = this.state.loc;
      // const createData = {
      // 	'name': name,
      // 	'description': desc,
      // 	'logo': logo,
      // 	'location': loc,
      // }
      // const loginData = event.target;
      console.log('+++++++++++++++++++++++')
      console.log(event.target.logo.files[0])
      console.log(fd) //createData
      this.setState ({
      	name: '',
      	desc: '',
      	logo: '',
      	loc: '',
      })
      console.log('===== addCompany =====')
      await this.props.addCompany(fd, this.props.user.token) //createData
      console.log('===== addCompany =====')
      setTimeout(() =>
        this.setState({
          isLoading: false,
        })
      )
      // .then(res=>{
      // 	console.log('result')
      //  	console.log(res)
      //  	this.setState({
      // 		isCreated: 'yes',
      //    	createMessage: res.message,
      //  	})
       	// setTimeout(() => this.props.history.push('/'), 3000)
       	// res.result.authorization
       	// res.result.message
       	// localStorage.setItem('token', res.result.authorization);
 	    	// localStorage.getItem('myData');
 	    	// console.log('token was saved to local')
      // })
      // .catch(err=>{
      // 	console.log('error')
      //  	console.log(err)
      //  	this.setState({
      //  		isCreated: 'no',
      //    	createMessage: err.response.data.status + ', '
      // 			+ err.response.data.message,
      //  	})
      // })
    }
  }

  componentWillMount() {
    if (this.props.user.username !== 'lathifalrasyid') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Hanya admin yang dapat menambah perusahaan.'
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
  }

  // getData = async (createData, resToken) => {
  //   const result = await axios({
  // 		method: 'post',
  // 		url: 'http://localhost:8080/company',
  // 		data: qs.stringify(createData),
  // 		headers: {
  //   		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   		'authorization': resToken,
  // 		}
		// })
  //   return result.data
  //  }

  render() {
    let isCreated = ''
    let createMessage = ''
    if ( this.state.isSubmit && !this.props.company.isLoading && !this.props.company.isError ) {
      // this.setState({
      isCreated = 'yes'
      createMessage = this.props.company.createMessage
      // })
    }
    if ( this.state.isSubmit && !this.props.company.isLoading && this.props.company.isError ) {
      // this.setState({
      isCreated = 'no'
      createMessage = this.props.company.createMessage
      // })
    }
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
  	      <Label for="name">Nama Perusahaan</Label>
    	    <Input
    	    	type="text"
    	    	name="name"
    	    	id="name"
    	    	value={this.state.name}
            onChange={this.handleChange}
    	    	placeholder="nama perusahaan.."
    	    	required
    	    />
      	</FormGroup>
        <FormGroup>
          <Label for="loc">Lokasi</Label>
          <Input
            type="text"
            name="loc"
            id="loc"
            value={this.state.loc}
            onChange={this.handleChange}
            placeholder="lokasi perusahaan.."
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="logo">Logo</Label>
          <Input
            type="file"
            name="logo"
            id="logo"
            accept='image/*'
            value={this.state.logo}
            onChange={this.handleChange}
            placeholder="logo perusahaan.."
            required
          />
          {/*<FormText color="primary">
            Upload an Image of the company logo. (file must be in Image format)
          </FormText>*/}
        </FormGroup>
        {/*<FormGroup>
          <Label for="logoLabel">Logo</Label>
          <Input
            type="text"
            name="logo"
            id="logoId"
            value={this.state.logo}
            onChange={this.handleChange}
            placeholder="logo perusahaan.."
            required
          />
        </FormGroup>*/}
      	<FormGroup>
  	      <Label for="desc">Deskripsi</Label>
    	    <Input
    	    	type="textarea"
    	    	name="desc"
    	    	id="desc"
    	    	value={this.state.desc}
            onChange={this.handleChange}
    	    	placeholder="deskripsi perusahaan.."
    	    	required
    	    />
      	</FormGroup>
      	<Button>Create</Button>
      </Form>
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
      {isCreated=='yes'&&(
      <Alert color="success">
        {createMessage}
      </Alert>
      )}
      {isCreated=='no'&&(
      <Alert color="danger">
        {createMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Tidak dapat menambah perusahaan. Kamu bukan admin!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateCom);
