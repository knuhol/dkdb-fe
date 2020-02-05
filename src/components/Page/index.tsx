import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

import Loader from './Loader';
import Menu from './Menu';
import Footer from './Footer';

type PageProps = {
  id?: string;
  loading?: boolean;
  children?: ReactNode;
};

const Page = ({ id, loading, children }: PageProps) => (
  <>
    <header>
      <Menu />
    </header>
    <main role="main" className="flex-shrink-0 pt-3 pb-2 pt-md-4 pb-md-3">
      <Container id={id}>{loading ? <Loader /> : children}</Container>
    </main>
    <Footer />
  </>
);

Page.defaultProps = {
  id: undefined,
  loading: false,
};

export default Page;
