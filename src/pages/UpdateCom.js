import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Spinner } from 'reactstrap';
import axios from 'axios'
import qs from 'qs'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {editCompany} from '../redux/actions/company'

const mapStatetoProps = state => {
  return {
    user: state.user,
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCompany: (updateData, comId, resToken) => dispatch(editCompany(updateData, comId, resToken))
  }
}

class UpdateCom extends Component {

	constructor(props) {
    super(props)
    const data = props.location.state
    if (data===undefined){
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
        isSubmit: false,
        isLoading: false,
      }
    } else {
      this.state = {
        comId: data.id,
        name: data.name,
        description: data.description,
        logo: data.logo,
        location: data.location,
        updateMessage: '',
        isUpdated: '',
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

      const fd = new FormData()
      const updateData = {};
      for (var o in this.state) {
        if (Object.hasOwnProperty.call(this.state, o)) {
        	if (!['isUpdated', 'updateMessage', 'alreadyLogin', 'alreadyLoginMsg',
            'isGoLogin', 'comId', 'isFromRead', 'isSubmit', 'isLoading', 'logo'].includes(o)
            && this.state[o] !== "") {
        		  updateData[o] = this.state[o];
              console.log('+++++++++++++++++++++++')
              console.log(event.target[o+'Id'].value)
              fd.append(o, event.target[o+'Id'].value)
          }
        }
      }
      // delete updateData['jobId']
      console.log(updateData)

      console.log('==================')
      console.log(event.target.logoId.files[0])
      if (event.target.logoId.files[0]!==undefined) {
        fd.append('logo', event.target.logoId.files[0])
      }

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

        await this.props.editCompany(fd, comId, this.props.user.token) //updateData

        this.setState({
          isLoading: false,
        })

        // this.getData(updateData, comId, this.props.user.token)
        // .then(res=>{
        // 	console.log('result')
        //  	console.log(res)
        //  	this.setState({
        //  		isUpdated: 'yes',
        //    	updateMessage: res.message,
        //  	})
        //  	// setTimeout(() => this.props.history.push('/'), 3000)
        //  	// res.result.authorization
        //  	// res.result.message
        //  	// localStorage.setItem('token', res.result.authorization);
   	    // 	// localStorage.getItem('myData');
   	    // 	// console.log('token was saved to local')
        // })
        // .catch(err=>{
        //  	console.log('error')
        //  	console.log(err.response.data)
        //  	this.setState({
        //  		isUpdated: 'no',
        //    	updateMessage: err.response.data.status + ', '
        //  			+ err.response.data.message,
        //  	})
        // })

	    } else {
	    	this.setState({
       		isUpdated: 'yes',
         	updateMessage: 'Nothing updated!',
          isLoading: false,
       	})
	    }
    }
  }

  componentWillMount() {
    if (this.props.user.username !== 'lathifalrasyid') {
      this.setState({
        alreadyLogin: 'no',
        alreadyLoginMsg: 'Hanya admin yang dapat memperbarui perusahaan.'
      })  
    } else {
      this.setState({
        alreadyLogin: 'yes',
      })
    }
  }

	// getData = async (updateData, comId, resToken) => {
 //    const result = await axios({
 //  		method: 'patch',
 //  		url: 'http://localhost:8080/company/' + comId,
 //  		data: qs.stringify(updateData),
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
    let isUpdated = ''
    let updateMessage = ''
    if ( this.state.isSubmit && !this.props.company.isLoading && !this.props.company.isError ) {
      // this.setState({
      isUpdated = 'yes'
      updateMessage = this.props.company.updateMessage
      // })
    }
    if ( this.state.isSubmit && !this.props.company.isLoading && this.props.company.isError ) {
      // this.setState({
      isUpdated = 'no'
      updateMessage = this.props.company.updateMessage
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
    	    	placeholder="ID perusahaan yang akan diperbarui.."
    	    	required
    	    />
      	</FormGroup>
	      <FormGroup>
  	      <Label for="nameLabel">Nama Perusahaan</Label>
    	    <Input
    	    	type="text"
    	    	name="name"
    	    	id="nameId"
    	    	value={this.state.name}
            onChange={this.handleChange}
    	    	placeholder="nama perusahaan yang baru.."
    	    />
      	</FormGroup>
        <FormGroup>
          <Label for="locationLabel">Lokasi Perusahaan</Label>
          <Input
            type="text"
            name="location"
            id="locationId"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="lokasi perusahaan yang baru.."
            
          />
        </FormGroup>
        <FormGroup>
          <Label for="logoLabel">Logo Perusahaan</Label>
          <Input
            type="file"
            name="logo"
            id="logoId"
            accept='image/*'
            // value={this.state.logo}
            onChange={this.handleChange}
            placeholder="logo perusahaan yang baru.."
            
          />
        </FormGroup>
      	<FormGroup>
  	      <Label for="descriptionLabel">Deskripsi</Label>
    	    <Input
    	    	type="textarea"
    	    	name="description"
    	    	id="descriptionId"
    	    	value={this.state.description}
            onChange={this.handleChange}
    	    	placeholder="deskripsi perusahaan yang baru.."
    	    	
    	    />
      	</FormGroup>
      	{this.state.isFromRead &&(
        <React.Fragment>
        <Button type="button" onClick={this.goBack}>Kembali</Button>
        <span>&nbsp;</span>
        </React.Fragment>
        )}
        <Button type="submit">Perbarui</Button>
      </Form>
      {this.state.isLoading&&(
        <div>
          <Spinner color="success" />
        </div>
      )}
      {isUpdated=='yes'&&(
      <Alert color="success">
        {updateMessage}
      </Alert>
      )}
      {isUpdated=='no'&&(
      <Alert color="danger">
        {updateMessage}
      </Alert>
      )}
      {this.state.isGoLogin=='yes'&&(
      <Alert color="danger">
        Tidak dapat memperbarui perusahaan. Kamu bukan admin!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(UpdateCom);
