import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container } from 'reactstrap';
import { FaHome, FaUser } from 'react-icons/fa';
import { connect } from 'react-redux';
import bgimage from '../images/myJum2.jpg'

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const MyNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
        <div style={style.wrapper}>
      <Navbar style={{hover:{color:'#000'}}} expand="md">
    <Container>
        <Link style={{color: '#fff'}} to="/"><FaHome size={24} /></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{color: '#fff', dropdownItem:{hover:{color:'pink'}} }} nav caret>
                Pekerjaan
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/tambah">Buat Lowongan</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/perbarui">Perbarui Lowongan</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/hapus">Hapus Lowongan</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{color: '#fff'}} nav caret>
                Perusahaan
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/lihatcom">Lihat Perusahaan</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/tambahcom">Tambah Perusahaan (Admin)</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/perbaruicom">Perbarui Perusahaan (Admin)</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/hapuscom">Hapus Perusahaan (Admin)</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle style={{color: '#fff'}} nav caret>
                {props.user.username === '' ? (
                  <FaUser size={14} />
                ) : (
                  props.user.username
                )}
              </DropdownToggle>
              <DropdownMenu right>
                {props.user.token === '' ? (
                <React.Fragment>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/masuk">Masuk</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/daftar">Daftar</Link>
                </DropdownItem>
                </React.Fragment>
                ) : (
                <DropdownItem>
                  <Link style={{color: '#000'}} to="/keluar">Keluar</Link>
                </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
    </Container>
      </Navbar>
      </div>
  );
}

const style = {
  wrapper: {
    backgroundImage: `url(${bgimage})`,
    backgroundSize: 'cover',
    marginBottom: '20px'
  }
}

export default connect(mapStatetoProps)(MyNavBar);
