import React from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Button, Alert} from 'reactstrap'
import {Card, CardHeader, CardBody, CardTitle, Label, CardSubtitle, CardFooter} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

class CategoryList extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      kategori: ''
    };
  }

  handleChange = (event) => {
    event.preventDefault()
  	this.setState({
    	kategori: event.target.value
  	}, ()=>{
  		console.log(this.state)
  		this.props.parentCallback(this.state.kategori)
  	});
  	// this.props.parentCallback(this.state.kategori)
	}

	render() {
		const categoryArray = [
			'Pendidikan', 'Kuliner', 'Programmer', 'IT', 'Desain', 'Olah Raga', 'Kesenian',
			'Hukum', 'Administrasi', 'Lainnya', 'Manajemen', 'Matematika', 'Data', 'Ekonomi',
			'Psikologi', 'Sosial', 'Otomotif', 'Kesehatan', 'Kedokteran', 'Pertanian', 'Peternakan'
		];
		categoryArray.sort();
		return (
			<FormGroup>
				{categoryArray.map( (v,i) => (
        <FormGroup check key={v}>
          <Label style={subStyle} check>
            <Input
            	type="radio"
            	name={v}
            	value={v}
            	checked={this.state.kategori === v}
            	onChange={this.handleChange}
            />
            {' '}
            {v}
          </Label>
        </FormGroup>
        ))}
      </FormGroup>
		)
	}
}

class CategoryBox extends React.Component {

	callbackCategoryList = (kategori) => {
		this.props.parentCallback(kategori)
  }

	render () {
		return (
			<Container>
				<Card style={cardStyle}>
        	<CardHeader>Kategori</CardHeader>
        	<CardBody>
          	<CategoryList parentCallback = {this.callbackCategoryList}/>
        	</CardBody>
      	</Card>
			</Container>
		)
	}
}

class SearchBox extends React.Component {
	constructor(props){
    super(props)
    this.state = {
      name: '',
      company: '',
      order: '',
      wrap: {
        name: '',
        company: '',
        order: '',
      },
    }
  }

	setWrap = async () => {
    const newWrap = await Object.assign(this.state.wrap, {'name':this.state.name,
      'company':this.state.company, 'order':this.state.order});
    return newWrap
  }

	handleSubmit = (event) => {
    event.preventDefault()
    this.setWrap()
    .then(newWrap=>{
      this.setState({
        wrap: newWrap,
      })
    })
    .catch(errWrap=>{
      console.log(errWrap)
    })

    this.setState({
      name: '',
      company: '',
      order: '',
    })
    console.log(this.state.wrap)
    this.props.parentCallback(this.state.wrap)
  }

	handleChange = (event) => {
    event.preventDefault()
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value
    }, () => {
    	console.log(this.state)
    });
  }

	render() {
		return (
			<Container>
				<Form onSubmit={this.handleSubmit}>
					<Row form>
						<Col md={4}>
							<FormGroup>
								<Input
									type="text"
									name="name"
									id="jobNameId"
									value={this.state.name}
									onChange={this.handleChange}
								  placeholder="Nama Pekerjaan"
								/>
							</FormGroup>
						</Col>
						<Col md={4}>
							<FormGroup>
								<Input
									type="text"
									name="company"
									id="companyId"
									value={this.state.company}
									onChange={this.handleChange}
									placeholder="Perusahaan"
								/>
							</FormGroup>
						</Col>
						<Col md={2}>
							<FormGroup>
			          <Input
      			      type="select"
            			name="order"
            			id="orderId"
            			value={this.state.order}
            			onChange={this.handleChange}
          			>
            		<option value="">Urutkan</option>
            		<option value="name ASC">A-Z</option>
            		<option value="salary DESC">Gaji</option>
            		<option value="date_updated DESC">Terbaru</option>
          			</Input>
        			</FormGroup>
						</Col>
						<Col md={2}>
							<Button color="primary">Cari</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
}

const subStyle = {
	fontSize: '0.8rem'
}
const titStyle = {
	fontSize: '1.2rem'
}
const cardStyle = {
	boxShadow: '4px 2px rgba(0,0,0,0.2)'
}

class JobCard extends React.Component {
	render() {
		const jobsData = this.props.data;
		return (
			<Card style={cardStyle}>
			<Container>
			<Row>
				<Col>
				<CardTitle style={titStyle}><Link to={{ pathname:'/pekerjaan/' + jobsData.id, state:jobsData }}>{jobsData.jobs}</Link></CardTitle>
				</Col>
			</Row>
			<Row>
				<Col>
				<CardSubtitle style={subStyle}>Perusahaan: {jobsData.company}</CardSubtitle>
				</Col>
			</Row>
			<Row>
				<Col>
				<CardSubtitle style={subStyle}>Lokasi Kerja: {jobsData.location}</CardSubtitle>
				</Col>
				<Col>
				<CardSubtitle style={subStyle}>Kategori: {jobsData.category}</CardSubtitle>
				</Col>
			</Row>
			<Row>
				<Col>
				<CardSubtitle style={subStyle}>Gaji: {jobsData.salary}</CardSubtitle>
				</Col>
				<Col>
				<CardSubtitle style={subStyle}>Diperbarui: {jobsData.date_updated.substring(0,10)}</CardSubtitle>
				</Col>
			</Row>
			<Row>
				<Col>
				<p style={subStyle}><Link to={{ pathname:"/perbarui", state:jobsData }}>Perbarui</Link></p>
				</Col>
				<Col>
				<p style={subStyle}><Link to={{ pathname:"/hapus", state:jobsData }}>Hapus</Link></p>
				</Col>
			</Row>
			</Container>
			</Card>
		)
	}
}

class SearchResult extends React.Component {
	// constructor(props){
	// 	super(props)
	// }
	render() {
		let arrSub = [];
		const arrFull = [];
		const resultObj = this.props.searchResult
		const jobFound = resultObj.result
		// console.log(jobFound)
		if (jobFound !== undefined) {
			jobFound.forEach( (arr,i) => {
				arrSub.push(arr);
				if (arrSub.length===2) {
	    		arrFull.push(arrSub);
					arrSub = [];
				}
				if (jobFound.length%2===1 && jobFound.length===i+1) {
					arrFull.push(arrSub);
				}
			});
			console.log(resultObj)
		}
		// console.log(arrFull)
		return (
			<Container>
			{Object.keys(resultObj).length === 0
			?
				<p> Loading... </p>
    	:
    		<Alert color="success">
          {resultObj.pagination.totalData} jobs found! 
        </Alert>
    	}
			{arrFull.map( (v,i) => (
				<React.Fragment key={i}>
				<Row>
				{v.map( (vv) => (
					<React.Fragment key={vv.id}>
					<Col md={6}>
						<JobCard data={vv}/>
					</Col>
					</React.Fragment>
				))}
				</Row>
				<br />
				</React.Fragment>
			))}
			<Row>
        <Col>
          {(Object.keys(resultObj).length > 0) && resultObj.pageLink.prevAble && (
          <React.Fragment>
          <Button color='primary' onClick={()=>this.props.parentCallback(resultObj.pageLink.baseLink+resultObj.pageLink.prevPage)}>Prev</Button>
          </React.Fragment>
          )}
          {(Object.keys(resultObj).length > 0) && resultObj.pageLink.nextAble && (
          <React.Fragment>
          <span>&nbsp;</span><Button color='primary' onClick={()=>this.props.parentCallback(resultObj.pageLink.baseLink+resultObj.pageLink.nextPage)}>Next</Button>
          </React.Fragment>
          )}
        </Col>
      </Row>
      </Container>
		)
	}
}

export default class SearchLayout extends React.Component {
	constructor(props){
    super(props)
    this.state = {
      searchResult: {},
    }
  }

  callbackCategoryBox = (kategori) => {
  	let link = 'http://localhost:8080/jobs/?category='+kategori;
  	this.getData(link)
  	.then(res=>{
  		console.log(res)
  		this.setState({searchResult: res})
  	})
  	.catch(err=>{
  		console.log(err)
  	})
  }

  callbackSearchResult = (goToPage) => {
  	this.getData(goToPage)
    .then(res=>{
    	console.log(res)
    	this.setState({searchResult: res})
    })
    .catch(err=>{
    	console.log(err)
    })
  }

	callbackSearchBox = (searchData) => {
		const searchArray = [];
    for (let dat in searchData) {
      if (searchData[dat] !== '') {
        searchArray.push(dat);
      }
    }
    let link = 'http://localhost:8080/jobs/';
    if (searchArray.length > 0) {
      link = link.concat('?');
      searchArray.forEach(k => {
        if (k !== 'sendSearch') {
          link = link.concat(k);
          link = link.concat('=');
          link = link.concat(searchData[k]);
          link = link.concat('&');
        }
      })
      link = link.substring(0, link.length - 1);
    }
    this.getData(link)
    .then(res=>{
    	// console.log(res)
    	this.setState({searchResult: res})
    })
    .catch(err=>{
    	console.log(err)
    })
	}

	componentDidMount() {
		let link = 'http://localhost:8080/jobs/';
		// console.log(link)
		this.getData(link)
    .then(res=>{
    	// console.log(res)
    	this.setState({searchResult: res})
    	// console.log(this.state.searchResult)
    })
    .catch(err=>{
    	console.log(err)
    })
	}

	getData = async(page)=>{
    const listJobs = await axios.get(page!==undefined?page:'http://localhost:8080/jobs')
    return listJobs.data
  }

	render() {
		return (
			<Container>
				<Row>
					<Col md={3}>
						<CategoryBox parentCallback = {this.callbackCategoryBox}/>
					</Col>
					<Col md={9}>
						<SearchBox parentCallback = {this.callbackSearchBox}/>
						<SearchResult searchResult={this.state.searchResult} parentCallback = {this.callbackSearchResult}/>
					</Col>
				</Row>
			</Container>
		);
	}
}
