import React from 'react';
// import { Link } from 'react-router-dom'
import { Jumbotron, Button, Container } from 'reactstrap';
import bgimage from '../images/myJum2.jpg'

const goMasuk = (props) => {
    let path = `/masuk`;
    props.history.push(path);
}

const MyJumbotron = (props) => {
  return (
    <div style={style.wrapper}>
    <Jumbotron style={style.jumbo}>
      <Container>
        <h1 className="display-3">Kerjarek!</h1>
        <p className="lead">Ini adalah website sederhana untuk mencari pekerjaan, untuk membuat lowongan pekerjaan, untuk kamu para pencari kerja atau pemilik perusahaan yang sedang membutuhkan karyawan.</p>
        <hr className="my-2" />
        <p>Untuk mencari pekerjaan kamu tidak perlu masuk, tapi jika kamu ingin membuat lowongan pekerjaan kamu perlu daftar dan kemudian masuk. Voila!!</p>
        <p className="lead">
          <Button onClick={()=>goMasuk(props)} color="primary">Masuk</Button>
        </p>
      </Container>
    </Jumbotron>
    </div>
  );
};

const style = {
  jumbo: {
    marginTop: -78,
    backgroundSize: 'cover',
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
  },
  wrapper: {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
  }
}

export default MyJumbotron;