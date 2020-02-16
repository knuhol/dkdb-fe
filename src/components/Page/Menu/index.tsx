import React from 'react';

import { NavLink } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';

import { ROUTE } from '../../../App/routes';
import logo from '../../../images/dkdb_full.svg';

import './style.scss';

const Menu = () => (
  <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
    <Navbar.Brand as={NavLink} to={ROUTE.HOME}>
      <Image src={logo} alt="DKDB logo" />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link eventKey={1} as={NavLink} to={ROUTE.BOOKS}>
          <span>Knihy</span>
        </Nav.Link>
        <Nav.Link eventKey={2} as={NavLink} to={ROUTE.RANDOM_BOOK}>
          <span>Náhodná kniha</span>
        </Nav.Link>
        <Nav.Link eventKey={3} as={NavLink} to={ROUTE.ABOUT}>
          <span>O projektu</span>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
