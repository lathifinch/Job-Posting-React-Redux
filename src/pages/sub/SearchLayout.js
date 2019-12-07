import React from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Button, Alert} from 'reactstrap'
import {Card, CardHeader, CardBody, CardTitle, CardImg, Label, CardSubtitle, CardFooter} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { FaTrash, FaEdit, FaBuilding, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';
import { MdLabelOutline, MdUpdate } from 'react-icons/md';

const {host, port} = require('../../hostport')

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
			'Psikologi', 'Sosial', 'Otomotif', 'Kesehatan', 'Kedokteran', 'Pertanian', 'Peternakan',
			'Transportasi'
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
	fontSize: '0.8rem',
	marginBottom: '5px',
}
const titStyle = {
	fontSize: '1.2rem'
}
const cardStyle = {
	boxShadow: '4px 2px rgba(0,0,0,0.2)',
	// paddingBottom: '10px',
}
  
class JobCard extends React.Component {
	constructor(){
		super()
		this.state={
			isOpen:false
		}
	}
	toggle = () => {
		this.setState({
			isOpen:!this.state.isOpen
		})
	}
	render() {
		const jobsData = this.props.data;
		return (
			<Card style={cardStyle}>
			<CardHeader style={{margin:0, padding:0}} >
				<Navbar style={{margin:0, padding:0}} expand="md">
					<Link style={{marginLeft:'15px', fontSize:'1.2rem'}} to={{ pathname:'/pekerjaan/' + jobsData.id, state:jobsData }}>{jobsData.jobs}</Link>
					<NavbarToggler onClick={this.toggle} />
        		<Collapse isOpen={this.state.isOpen} navbar>
          		<Nav className="ml-auto" navbar>
		            <UncontrolledDropdown nav inNavbar>
		              <DropdownToggle style={{color:'#000'}} nav caret>
		                
		              </DropdownToggle>
		              <DropdownMenu right>
		                <DropdownItem>
		                  <Link style={{color:'#000', fontSize:'0.8rem'}} to={{ pathname:"/perbarui", state:jobsData }}><FaEdit/> Perbarui</Link>
		                </DropdownItem>
		                <DropdownItem>
		                  <Link style={{color:'#000', fontSize:'0.8rem'}} to={{ pathname:"/hapus", state:jobsData }}><FaTrash/> Hapus</Link>
		                </DropdownItem>
		              </DropdownMenu>
		            </UncontrolledDropdown>
            	</Nav>
            </Collapse>
				</Navbar>
			</CardHeader>
			<Container>
			<Row>
				<Col md={4}>
					<CardImg top width="100%" height="100%" src={jobsData.logo} alt={'logo perusahaan'} />
				</Col>
				<Col style={{marginTop:'10px'}} md={8}>
					<Row>
						<Col>
						<CardSubtitle style={subStyle}><FaBuilding/> Perusahaan: {jobsData.company}</CardSubtitle>
						</Col>
					</Row>
					<Row>
						<Col>
						<CardSubtitle style={subStyle}><FaMapMarkerAlt/> Lokasi Kerja: {jobsData.location}</CardSubtitle>
						</Col>
					</Row>
					<Row>
						<Col>
						<CardSubtitle style={subStyle}><MdLabelOutline/> Kategori: {jobsData.category}</CardSubtitle>
						</Col>
					</Row>
					<Row>
						<Col>
						<CardSubtitle style={subStyle}><FaMoneyBillWave/> Gaji: {jobsData.salary}</CardSubtitle>
						</Col>
					</Row>
					<Row>
						<Col>
						<CardSubtitle style={subStyle}><MdUpdate/> Diperbarui: {jobsData.date_updated.substring(0,10)}</CardSubtitle>
						</Col>
					</Row>
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
          {resultObj.pagination.totalData} lowongan pekerjaan ditemukan! 
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
  	let link = 'http://'+host+':'+port+'/jobs/?category='+kategori;
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
    let link = 'http://'+host+':'+port+'/jobs/';
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
		let link = 'http://'+host+':'+port+'/jobs/';
		// console.log(config.host)
		// console.log(config.port)
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
    const listJobs = await axios.get(page!==undefined?page:'http://'+host+':'+port+'/jobs')
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
