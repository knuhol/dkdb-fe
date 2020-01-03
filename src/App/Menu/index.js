import React from 'react';

import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { ROUTE } from '../routes';

const Menu = () => (
  <Navbar bg="dark" variant="dark" expand="sm">
    <Navbar.Brand as={NavLink} to={ROUTE.HOME}>
      DKDB
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav>
        <Nav.Link as={NavLink} to={ROUTE.BOOKS}>
          Knihy
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Menu;
