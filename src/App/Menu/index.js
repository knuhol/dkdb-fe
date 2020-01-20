import React from 'react';

import { NavLink } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';

import { ROUTE } from '../routes';
import logo from '../../logos/dkdb.svg';

import './style.scss';

const Menu = () => (
  <Navbar bg="dark" variant="dark" expand="sm">
    <Navbar.Brand as={NavLink} to={ROUTE.HOME}>
      <Image src={logo} alt="DKDB logo" />
      <span className="name">DKDB</span>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link as={NavLink} to={ROUTE.BOOKS}>
          <span>Knihy</span>
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
