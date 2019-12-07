import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Spinner } from 'reactstrap';
import axios from 'axios'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {delCompany} from '../redux/actions/company'

const mapStatetoProps = state => {
  return {
    user: state.user,
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delCompany: (comId, resToken) => dispatch(delCompany(comId, resToken))
  }
}

class DeleteCom extends Component {

	constructor(props) {
    super(props)
    const data = props.location.state
    if (data===undefined){
      this.state = {
      	comId: '',
      	deleteMessage: '',
      	isDeleted: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
        isSubmit: false,
        isLoading: false,
      }
    } else {
      this.state = {
        comId: data.id,
        deleteMessage: '',
        isDeleted: '',
        alreadyLogin: '',
        alreadyLoginMsg: '',
        isGoLogin: '',
        isFromRead: true,
        isSubmit: false,
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

      const comId = this.state.comId;
      // const deleteData = {
      // 	'jobId': jobId,
      // }
      // const deleteData = jobId;
      // const loginData = event.target;
      // console.log(deleteData)
      this.setState({
        comId: '',
      })
      await this.props.delCompany(comId, this.props.user.token)
      this.setState({
        isLoading: false,
      })
      // this.getData(comId, this.props.user.token)
      // .then(res=>{
      // 	console.log('result')
      // 	console.log(res)
      // 	this.setState({
      // 		isDeleted: 'yes',
      //   	deleteMessage: res.message,
      // 	})
      //  	// setTimeout(() => this.props.history.push('/'), 3000)
      //  	// res.result.authorization
      //  	// res.result.message
      //  	// localStorage.setItem('token', res.result.authorization);
 	    // 	// localStorage.getItem('myData');
 	    // 	// console.log('token was saved to local')
      // })
      // .catch(err=>{
      // 	console.log('error')
      //  	console.log(err.response.data)
      //  	this.setState({
      //  		isDeleted: 'no',
      //    	deleteMessage: err.response.data.status + ', '
      //  			+ err.response.data.message,
      //  	})
      // })
    }
  }

  componentWillMount() {
    if (this.props.user.username !== 'lathifalrasyid') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Hanya admin yang dapat menghapus perusahaan.'
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
  }

	// getData = async (comId, resToken) => {
 //    const result = await axios({
 //  		method: 'delete',
 //  		url: 'http://localhost:8080/company/' + comId,
 //  		// data: qs.stringify(loginData),
 //  		headers: {
 //    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
 //    		'authorization': resToken,
 //  		}
	// 	})
 //    return result.data
 //   }

  goBack = () => {
    this.props.history.push('/lihatcom')
  }

  render() {
    let isDeleted = ''
    let deleteMessage = ''
    if ( this.state.isSubmit && !this.props.company.isLoading && !this.props.company.isError ) {
      // this.setState({
      isDeleted = 'yes'
      deleteMessage = this.props.company.deleteMessage
      // })
    }
    if ( this.state.isSubmit && !this.props.company.isLoading && this.props.company.isError ) {
      // this.setState({
      isDeleted = 'no'
      deleteMessage = this.props.company.deleteMessage
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
  	      <Label for="comIdLabel">ID Perusahaan</Label>
    	    <Input
    	    	type="text"
    	    	name="comId"
    	    	id="comIdId"
    	    	value={this.state.comId}
            onChange={this.handleChange}
    	    	placeholder="ID perusahaan yang akan dihapus.."
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
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
      {isDeleted=='yes'&&(
      <Alert color="success">
        {deleteMessage}
      </Alert>
      )}
      {isDeleted=='no'&&(
      <Alert color="danger">
        {deleteMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Tidak dapat menghapus perusahaan. Kamu bukan admin!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(DeleteCom);
