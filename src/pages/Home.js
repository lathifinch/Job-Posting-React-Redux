import React from 'react';
import {Container} from 'reactstrap'

import MyJumbotron from '../components/MyJumbotron'
import SearchLayout from './sub/SearchLayout'
import MyCarousel from '../components/MyCarousel'

import { connect } from 'react-redux';
import {getCompany} from '../redux/actions/company'

const mapDispatchToProps = dispatch => {
  return {
    getCompany: () => dispatch(getCompany())
  }
}

class Home extends React.Component {

	componentWillMount() {
		this.props.getCompany()
	}

	render() {
		return (
			<div>
				<MyJumbotron history={this.props.history}/>
				<SearchLayout />
				<div><p></p></div>
				<Container>
					<MyCarousel  />
				</Container>
				<div><p></p></div>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(Home);
