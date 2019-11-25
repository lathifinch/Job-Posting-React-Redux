import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert, Container, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom'

import { connect } from 'react-redux';
import {userLogin} from '../redux/actions/user'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (username, password) => dispatch(userLogin(username, password))
  }
}

class Login extends Component {

	constructor(props) {
    super(props)
    this.state = {
    	username: '',
    	password: '',
      isSubmit: false,
      alreadyLogin: '',
      alreadyLoginMsg: '',
      isGoLogout: ''
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
    
    if (this.props.user.token !== '') {
      this.setState({
        isGoLogout: 'yes'
      })
    } else {
      this.setState({
        isSubmit: true,
      })
      // console.log('belum login')
      const username = this.state.username;
      const password = this.state.password;
      this.setState({
        username: '',
        password: '',
      })
      // setTimeout(() => this.props.history.push('/'), 3000)
      this.props.userLogin(username, password)
      // if ( !this.props.user.isLoading && !this.props.user.isError ) {
      //   this.setState({
      //     isLogin: 'yes',
      //     loginMessage: this.props.user.loginMessage,
      //   })
      // }
      // if ( !this.props.user.isLoading && this.props.user.isError ) {
      //   this.setState({
      //     isLogin: 'no',
      //     loginMessage: this.props.user.loginMessage,
      //   })
      // }

      // console.log(this.props.user.isError)
      // if ( !this.props.user.isLoading && !this.props.user.isError ) {
      //   this.setState({
      //   	isLogin: 'yes',
      //    	loginMessage: this.props.user.loginMessage,
      //   })
      // }
      // if ( !this.props.user.isLoading && this.props.user.isError ) {
      //   this.setState({
      //     isLogin: 'no',
      //     loginMessage: this.props.user.loginMessage,
      //   })
      // }
    }
  }

  // goToLogin = async (username, password) => {
  //   await this.props.userLogin(username, password)
  //   return []
  // }

  componentWillMount() {
    if (this.props.user.token === '') {
      this.setState({
        alreadyLogin: 'no'
      })
    } else {
      this.setState({
        alreadyLogin: 'yes',
        alreadyLoginMsg: 'Kamu sudah masuk sebagai ' + this.props.user.username
      })
    }
  }

  render() {
    // console.log(this.props.user.isError)
    let isLogin = ''
    let loginMessage = ''
    if ( this.state.isSubmit && !this.props.user.isLoadingIn && !this.props.user.isErrorIn ) {
      // this.setState({
      isLogin = 'yes'
      loginMessage = this.props.user.loginMessage
      setTimeout(() => this.props.history.push('/'), 3000)
      // })
    }
    if ( this.state.isSubmit && !this.props.user.isLoadingIn && this.props.user.isErrorIn ) {
      // this.setState({
      isLogin = 'no'
      loginMessage = this.props.user.loginMessage
      // })
    }
    return (
    	<Container>
      {this.state.alreadyLogin == 'yes'?
        (
        <Alert color="danger">
          {this.state.alreadyLoginMsg}
        </Alert>
        ):(
          <Alert color="info">
            Belum mendaftar? <Link to='/daftar'>daftar di sini</Link>!
          </Alert>
        )
      }
      <Form onSubmit={this.handleSubmit}>
	      <FormGroup>
  	      <Label for="usernameLabel">Username</Label>
    	    <Input
    	    	type="text"
    	    	name="username"
    	    	id="usernameId"
    	    	value={this.state.username}
            onChange={this.handleChange}
    	    	placeholder="masukkan username.."
            required
    	    />
      	</FormGroup>
      	<FormGroup>
        	<Label for="passwordLabel">Password</Label>
        	<Input
        		type="password"
        		name="password"
        		id="passwordId"
        		value={this.state.password}
            onChange={this.handleChange}
        		placeholder="masukkan password.."
            required
        	/>
      	</FormGroup>
      	<Button>Masuk</Button>
      </Form>
      {isLogin==='yes'&&(
      <React.Fragment>
      <Alert color="success">
        {loginMessage}
      </Alert>
      <div>
        <Spinner color="success" />
      </div>
      </React.Fragment>
      )}
      {isLogin==='no'&&(
      <Alert color="danger">
        {loginMessage}
      </Alert>
      )}
      {this.state.isGoLogout==='yes'&&(
      <Alert color="danger">
        Tidak dapat masuk. Kamu harus keluar terlebih dahulu!
      </Alert>
      )}
      </Container>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Login);
