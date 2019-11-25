import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import axios from 'axios'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

class Delete extends Component {

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
        isFromRead: true,
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

    if (this.props.user.token === '') {
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
      this.getData(jobId, this.props.user.token)
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
    }
  }

  componentWillMount() {
    if (this.props.user.token === '') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Kamu harus masuk terlebih dahulu sebelum dapat menghapus lowongan pekerjaan, '
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
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

  goBack = () => {
    this.props.history.push('/')
  }

  render() {
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
	      <FormGroup>
  	      <Label for="jobIdLabel">ID Pekerjaan</Label>
    	    <Input
    	    	type="text"
    	    	name="jobId"
    	    	id="jobIdId"
    	    	value={this.state.jobId}
            onChange={this.handleChange}
    	    	placeholder="ID pekerjaan yang akan dihapus.."
    	    	required
    	    />
      	</FormGroup>
      	{this.state.isFromRead &&(
        <React.Fragment>
        <Button type="button" onClick={this.goBack}>Kembali</Button>
        <span>&nbsp;</span>
        </React.Fragment>
        )}
        <Button type="submit">Hapus</Button>
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
        Tidak dapat menghapus lowongan pekerjaan. Kamu harus masuk terlebih dahulu!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps)(Delete);
