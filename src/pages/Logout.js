import React, { Component } from 'react'
import { Alert } from 'reactstrap';

export default class Logout extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isLogout: false,
		} 
	}

	componentDidMount() {
		const logInfo = localStorage.getItem('token');
		if (logInfo) {
			localStorage.removeItem('token');
			localStorage.removeItem('username');
			this.setState({
				isLogout: true,
			})
			setTimeout(() => this.props.history.push('/'), 3000)
		}
		
	}

  render() {
    return (
      <div>
        {this.state.isLogout&&(
        	<Alert color="success">You have been loged out..</Alert>
        )}
        {!this.state.isLogout&&(
        	<Alert color="danger">You have not been loged in yet..</Alert>
        )}
      </div>
    )
  }
}
