import React, { Component } from 'react'
import {Row, Col, Container, Button, ListGroup, Alert} from 'reactstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'
// import {Button} from 'reactstrap'
// import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

import { connect } from 'react-redux';
import {getCompany} from '../redux/actions/company'

const mapStatetoProps = state => {
  return {
    company: state.company,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCompany: () => dispatch(getCompany())
  }
}

const subStyle = {
  fontSize: '0.9rem'
}
const titStyle = {
  fontSize: '1.2rem'
}
const cardStyle = {
  boxShadow: '4px 2px rgba(0,0,0,0.2)'
}

class ReadCom extends Component {
  constructor(props){
    super(props)
    // this.submitFormHandler = this.submitFormHandler.bind(this);
    // this.sendSearch = false;
    this.state = {
      // data: [],
      isLoading: true,
    }
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  backToDefault = () => {
    this.setState({sendSearch:false})
  }

  getData = async(page)=>{
    const listJobs = await axios.get(page!==undefined?page:'http://localhost:8080/company')
    return listJobs.data
  }

  componentDidMount(){
    this.props.getCompany()
    this.setState({
        isLoading:false
    })
    // if (this.props.company.data.length === 0) {
    //   this.props.getCompany()
    //   // console.log('tes')
    //   // this.getData().then(data=>{
    //   this.setState({
    //     // data: data.result,
    //     isLoading:false
    //   })
    //   // })
    // } else {
    //   this.setState({
    //     // data: data.result,
    //     isLoading:false
    //   })
    // }
  }

  // componentDidMount(){
    // this.setState({sendSearch:false})
    // this.setState({
    //   sendSearch: false,
    //   name: '',
    //   company: '',
    //   order: '',
    // })
  // }

  render() {
    let arrSub = [];
    let arrFull = [];
    let resultArr = [];
    let comFound = [];
    if (this.props.company !== undefined) {
      resultArr = this.props.company.data //this.props.searchResult
      comFound = [...resultArr]
      console.log('AAAAAAAAAAAAAAA')
    }
    // console.log(jobFound)
    if (this.props.company !== undefined) {
      comFound.forEach( (arr,i) => {
        arrSub.push(arr);
        if (arrSub.length===2) {
          arrFull.push(arrSub);
          arrSub = [];
        }
        if (comFound.length%2===1 && comFound.length===i+1) {
          arrFull.push(arrSub);
        }
      });
      console.log(resultArr)
    }
    return (
      <Container>
      {this.state.isLoading === true
      ?
        <p> Loading... </p>
      :
        <Alert color="success">
          {resultArr.length} perusahaan ditemukan! 
        </Alert>
      }
      {arrFull.map( (v,i) => (
        <React.Fragment key={i}>
        <Row>
        {v.map( (vv) => (
          <React.Fragment key={vv.id}>
          <Col md={6}>
            <Card style={cardStyle}>
              <CardImg top width="100%" src="" alt={vv.logo} />
              <CardBody>
                <Row>
                  <Col>
                  <CardTitle style={titStyle}><b>{vv.name}</b></CardTitle>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <CardSubtitle style={subStyle}>Location: {vv.location}</CardSubtitle>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <CardSubtitle style={subStyle}>Lowongan: {vv.njob } pekerjaan</CardSubtitle>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <CardText style={subStyle}>Description: {vv.description}</CardText>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={3}>
                  <div style={subStyle}><Link to={{ pathname:"/perbaruicom", state:vv }}>Perbarui</Link></div>
                  </Col>
                  <Col md={3}>
                  <div style={subStyle}><Link to={{ pathname:"/hapuscom", state:vv }}>Hapus</Link></div>
                  </Col>
                  <Col md={6}>
                  <div style={subStyle}><Link to={{ pathname:"/tambah", state:vv }}>Tambah Lowongan</Link></div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          </React.Fragment>
        ))}
        </Row>
        <br />
        </React.Fragment>
      ))}
      </Container>
    )
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ReadCom);
