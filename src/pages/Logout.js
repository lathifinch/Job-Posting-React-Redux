import React, { Component } from 'react'
import { Alert } from 'reactstrap';

import { connect } from 'react-redux';
import {userLogout} from '../redux/actions/user'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout: () => dispatch(userLogout())
  }
}

class Logout extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isLogout: false,
		} 
	}

	componentDidMount() {
		if (this.props.user.token !== '') {
			this.setState({
				isLogout: true,
			})
			setTimeout(() => this.props.history.push('/'), 3000)
			this.props.userLogout()
		}
		
	}

  render() {
    return (
      <div>
        {this.state.isLogout && !this.props.user.isErrorOut &&(
        	<Alert color="success">Kamu berhasil keluar..</Alert>
        )}
        {this.state.isLogout && this.props.user.isErrorOut &&(
        	<Alert color="danger">Error, tidak dapat keluar..</Alert>
        )}
        {!this.state.isLogout&&(
        	<Alert color="danger">Saat ini kamu belum masuk..</Alert>
        )}
      </div>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Logout);