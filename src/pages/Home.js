import React from 'react';

import MyJumbotron from '../components/MyJumbotron'
import SearchLayout from './sub/SearchLayout'

export default class Home extends React.Component {

	render() {
		return (
			<div>
				<MyJumbotron history={this.props.history}/>
				<SearchLayout />
			</div>
		);
	}
}