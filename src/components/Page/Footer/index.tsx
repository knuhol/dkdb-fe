import React from 'react';
import { Container, Image } from 'react-bootstrap';

import github from '../../../images/github.svg';
import { EXTERNAL_LINK, trackExternalLink } from '../../../utils/analytics';

import './style.scss';

const Footer = () => {
  const FIRST_COPYRIGHT_YEAR = 2020;
  const currentYear = new Date().getFullYear();
  const date =
    currentYear > FIRST_COPYRIGHT_YEAR ? `${FIRST_COPYRIGHT_YEAR}-${currentYear}` : `${FIRST_COPYRIGHT_YEAR}`;

  return (
    <footer className="footer mt-auto py-2 py-md-3 text-center">
      <Container>
        <span className="copyright">© {date} Knut Holm & Tereza Holm</span>
        <span className="separator separator--md-up">|</span>
        <a
          className="text-dark github-link"
          href="https://github.com/knuhol/dkdb-fe"
          onClick={trackExternalLink(EXTERNAL_LINK.DKDB_FE)}
        >
          <Image src={github} alt="GitHub logo" />
          <span>dkdb-fe</span>
        </a>
        <span className="separator">|</span>
        <a
          className="text-dark github-link"
          href="https://github.com/terhol/dkdb-be"
          onClick={trackExternalLink(EXTERNAL_LINK.DKDB_BE)}
        >
          <Image src={github} alt="GitHub logo" />
          <span>dkdb-be</span>
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
