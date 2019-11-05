import React from 'react';
import {Container} from 'reactstrap'

const DetailJob = (props) => {
	// match.params.jobId
	const data = props.location.state
  return (
  	<Container>
    <div className="card">
    	<div className="card-body">
    		<h3><b>{data.jobs}</b></h3>
    		<p>Deskripsi Pekerjaan:<br/>{data.description}</p>
    	</div>
    </div>
    </Container>
  )
}

export default DetailJob;
