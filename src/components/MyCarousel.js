import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';

import {Card, CardHeader, CardBody, CardTitle, Label, CardSubtitle, CardFooter, Container, Row, Col} from 'reactstrap'

import { connect } from 'react-redux';
// import {getCompany} from '../redux/actions/company'

// function compare( a, b ) {
//   if ( a.last_nom < b.last_nom ){
//     return -1;
//   }
//   if ( a.last_nom > b.last_nom ){
//     return 1;
//   }
//   return 0;
// }

// objs.sort( compare );

const items = [
  {
    src: '',
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: '',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: '',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const mapStatetoProps = state => {
  return {
    company: state.company,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     getCompany: () => dispatch(getCompany())
//   }
// }

const MyCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const compare = ( a, b ) => {
    if ( a.njob < b.njob ){
      return 1;
    }
    if ( a.njob > b.njob ){
      return -1;
    }
    return 0;
  }

  const slides = props.company.data.sort(compare).slice(0,3).map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <Card>
          <CardBody className="text-center">
            <CardTitle>
              <b>{item.name}</b> { 'tersedia ' + item.njob + ' lowongan pekerjaan.' }
              <br />
              {item.description}
            </CardTitle>
          </CardBody>
        </Card>
      </CarouselItem>
    );
  });

  // const loadData = (props) => {
  //   props.getCompany()
  // }

  return (
    <Container>
    <Row>
    <Col md={0}></Col>
    <Col md={12}>
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </Col>
    <Col md={0}></Col>
    </Row>
    </Container>
  );
}

export default connect(mapStatetoProps)(MyCarousel);
