import React, { Component } from 'react'
import {Row, Col, Container, Button, ListGroup} from 'reactstrap'
import axios from 'axios'
// import {Button} from 'reactstrap'
// import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';

class Toggle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDetail: false,
      location: '',
      desc: '',
      comId: '',
    }
  }

  goToDetail = () => {
    this.setState( (state) => ({
      isDetail: !state.isDetail,
      location: this.state.location,
      desc: this.props.desc,
      comId: this.props.comId,
    }))
  }

  render() {
      return (
        <div>
        {this.state.isDetail&&(
        <React.Fragment>
        <CardSubtitle>Location: {this.state.location}</CardSubtitle>
        <CardSubtitle>ID: {this.state.comId}</CardSubtitle>
        <CardText>Description: {this.state.desc}</CardText>
        </React.Fragment>
        )}
        <Button onClick={this.goToDetail}>...</Button>
        </div>
      )
  }

}

export default class ReadCom extends Component {
  constructor(props){
    super(props)
    // this.submitFormHandler = this.submitFormHandler.bind(this);
    // this.sendSearch = false;
    this.state = {
      data: [],
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
    this.getData().then(data=>{
      this.setState({
        data: data.result,
        isLoading:false
      })
    })
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
    return (
      <Container>
      <Row className='justify-content-md-center'>
        <ListGroup>
          {this.state.isLoading&&(
            <Col>Loading...</Col>
          )}
          {!this.state.isLoading&&
            <React.Fragment>
            {this.state.data.map((v,i)=>(
              <div key={v.id}>
                <Card>
                  <CardImg top width="100%" src="" alt='' />
                  <CardBody>
                    <CardTitle>{v.name}</CardTitle>
                    <CardSubtitle>Location: {v.location}</CardSubtitle>
                    <CardSubtitle>ID: {v.id}</CardSubtitle>
                    <CardText>Description: {v.description}</CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
            </React.Fragment>
          }
        </ListGroup>
      </Row>
      <Row>
        <Col>
        
          {this.state.prevAble&&
          <React.Fragment>
          <Button color='primary' onClick={()=>this.buttonPress(this.state.prev)}>Prev</Button>
          </React.Fragment>
          }
          {this.state.nextAble&&
          <React.Fragment>
          <span>&nbsp;</span><Button color='primary' onClick={()=>this.buttonPress(this.state.next)}>Next</Button>
          </React.Fragment>
          }
        
        </Col>
      </Row>
      </Container>
    )
  }
}
