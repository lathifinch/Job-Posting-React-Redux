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

import { connect } from 'react-redux';

const mapStatetoProps = state => {
  return {
    user: state.user,
  }
}

const MyNavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Container>
      <Navbar color="light" light expand="md">
        <Link to="/">Kerjarek</Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pekerjaan
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/tambah">Buat Lowongan</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/perbarui">Perbarui Lowongan</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/hapus">Hapus Lowongan</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Perusahaan
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/lihatcom">Lihat Perusahaan</Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <Link to="/tambahcom">Tambah Perusahaan (Admin)</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/perbaruicom">Perbarui Perusahaan (Admin)</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/hapuscom">Hapus Perusahaan (Admin)</Link>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.user.username === '' ? (
                  "..."
                ) : (
                  props.user.username
                )}
              </DropdownToggle>
              <DropdownMenu right>
                {props.user.token === '' ? (
                <React.Fragment>
                <DropdownItem>
                  <Link to="/masuk">Masuk</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/daftar">Daftar</Link>
                </DropdownItem>
                </React.Fragment>
                ) : (
                <DropdownItem>
                  <Link to="/keluar">Keluar</Link>
                </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
        </Collapse>
      </Navbar>
    </Container>
  );
}

export default connect(mapStatetoProps)(MyNavBar);
