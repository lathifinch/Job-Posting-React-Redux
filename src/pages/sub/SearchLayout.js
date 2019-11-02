import React from 'react';
import {Container, Row, Col, Form, FormGroup, Input, Button} from 'reactstrap'
import {Card, CardHeader, CardBody, CardTitle, CardText, Label, CardImg, CardSubtitle} from 'reactstrap'

class CategoryList extends React.Component {
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
          <Label check>
            <Input type="radio" name="v" />{' '}
            {v}
          </Label>
        </FormGroup>
        ))}
      </FormGroup>
		)
	}
}

class CategoryBox extends React.Component {
	render () {
		return (
			<Container>
				<Card>
        	<CardHeader>Category</CardHeader>
        	<CardBody>
          	<CategoryList />
        	</CardBody>
      	</Card>
			</Container>
		)
	}
}

class SearchBox extends React.Component {
	render() {
		return (
			<Container>
				<Form>
					<Row form>
						<Col md={5}>
							<FormGroup>
								<Input type="text" name="jobName" id="jobNameId" placeholder="Job's Name" />
							</FormGroup>
						</Col>
						<Col md={5}>
							<FormGroup>
								<Input type="text" name="company" id="companyId" placeholder="Company" />
							</FormGroup>
						</Col>
						<Col md={2}>
							<Button color="primary">Search</Button>
						</Col>
					</Row>
				</Form>
			</Container>
		)
	}
}

class SearchResult extends React.Component {
	render() {
		const resultArray = [
			'Job1', 'Job2', 'Job3', 'Job4', 'Job5', 'Job6', 'Job7', 'Job8', 'Job9', 'Job10'
		];
	let arrSub = [];
	const arrFull = [];
	resultArray.forEach( (arr,i) => {
		if (i%2===1) {
    	arrSub.push(arr);
    	arrFull.push(arrSub);
			arrSub = [];
		} else {
  		arrSub.push(arr);
  	}
	});
		return (
			<Container>
			{arrFull.map( (v,i) => (
				<React.Fragment>
				<Row>
				{v.map( (vv,ii) => (
					<Col>
						<Card key={vv}>
        			<CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
        			<CardBody>
          			<CardTitle>{vv}</CardTitle>
          			<CardSubtitle>Card subtitle</CardSubtitle>
          			<CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          			<Button>Button</Button>
        			</CardBody>
      			</Card>
					</Col>
				))}
				</Row>
				<br />
				</React.Fragment>
			))}
      </Container>
		)
	}
}

export default class SearchLayout extends React.Component {

	render() {
		return (
			<Container>
				<Row>
					<Col md={3}>
						<CategoryBox />
					</Col>
					<Col md={9}>
						<SearchBox />
						<SearchResult />
					</Col>
				</Row>
			</Container>
		);
	}
}
