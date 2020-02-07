import React, { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

import Loader from './Loader';
import Menu from './Menu';
import Footer from './Footer';

type PageProps = {
  id?: string;
  loading?: boolean;
  title?: string;
  description?: string;
  children?: ReactNode;
};

const Page = ({ id, loading, title, description, children }: PageProps) => (
  <>
    <Helmet>
      <title>{title} | DKDB</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | DKDB`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="cs_CZ" />
      <meta property="og:site_name" content="DKDB" />
      <meta property="og:image" content={`${process.env.PUBLIC_URL}/images/dkdb-og.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
    </Helmet>
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
  title: 'Česká databáze duhových knih',
  description: 'Všechny LGBT knihy v češtině přehledně na jednom místě.',
};

export default Page;
