import React from 'react';
import { Image } from 'react-bootstrap';

import logo from '../../logos/dkdb.svg';

import './style.scss';

const Loader = () => (
  <div id="loader">
    <Image src={logo} alt="Nahrávám..." />
  </div>
);

export default Loader;
