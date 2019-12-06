/* eslint-disable jsx-a11y/anchor-is-valid */

import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


class Footer extends Component {
  render() {
  return (
    <div style={{marginTop:'100px'}}>
    <Styled  className="footerNav">
      <div className="footer-middle">
        <div className="container">
          <div className="row">
            {/* Column 1 */}
            <div className="col-md-3 col-sm-6">
              <h4>Tentang Kerjarek</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Perusahaan</Link>
                </li>
                <li>
                  <Link to='#'>Bekerja Bersama Kami</Link>
                </li>
                <li>
                  <Link to='#'>Hubungi Kami</Link>
                </li>
              </ul>
            </div>
            {/* Column 2 */}
            <div className="col-md-3 col-sm-6">
              <h4>Pencari Kerja</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Panduan Mencari Kerja</Link>
                </li>
                <li>
                  <Link to='#'>Testimoni</Link>
                </li>
                <li>
                  <Link to='#'>Bantuan</Link>
                </li>
              </ul>
            </div>
            {/* Column 3 */}
            <div className="col-md-3 col-sm-6">
              <h4>Perusahaan</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Panduan Membuat Lowongan</Link>
                </li>
                <li>
                  <Link to='#'>Mendapatkan Pelamar</Link>
                </li>
                <li>
                  <Link to='#'>Tahap Rekrutmen</Link>
                </li>
              </ul>
            </div>
            {/* Column 4 */}
            <div className="col-md-3 col-sm-6">
              <h4>Media Sosial</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to='#'>Facebook</Link>
                </li>
                <li>
                  <Link to='#'>Twitter</Link>
                </li>
                <li>
                  <Link to='#'>Instagram</Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="footer-bottom">
            <p className="text-xs-center">
              &copy;{new Date().getFullYear()} Kerjarek - All Rights
              Reserved
            </p>
          </div>
        </div>
      </div>
    </Styled>
    </div>
  );
}
}
export default Footer;

const Styled = styled.footer`
  .footer-middle {
    background-color: rgba(0,0,0,0.9);
    padding-top: 3rem;
  }
  .footerNav {
    margin-left: 0px;
  }
  .footer-bottom {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
  h4 {
    color: rgba(255,255,255,0.8);
  }
  p {
    color: rgba(255,255,255,0.8);
  }
  ul li a {
    color: rgba(255,255,255,0.8);
  }
  ul li a:hover {
    color: #428bca;
  }
`;