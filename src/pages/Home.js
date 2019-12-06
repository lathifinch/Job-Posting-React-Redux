import React from 'react';
import {Container} from 'reactstrap'

import MyJumbotron from '../components/MyJumbotron'
import SearchLayout from './sub/SearchLayout'
import MyCarousel from '../components/MyCarousel'

import { connect } from 'react-redux';
import {getCompany} from '../redux/actions/company'

import bgimage from '../images/Grandeur.jpg'

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
				<div style={{marginBottom:'-100px', display:'flex', flexDirection:'column', backgroundSize: 'cover', backgroundImage: `url(${bgimage})`, flex:1, marginTop:'100px', paddingBottom:'50px', paddingTop:'50px'}}>
				<h4 style={{textAlign:'center', color:'white', fontWeight:'bold'}}>Perusahaan Terpopuler</h4>
				<Container>

					<MyCarousel  />
				</Container>
				</div>
				{/*<div><p></p></div>*/}
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps)(Home);
