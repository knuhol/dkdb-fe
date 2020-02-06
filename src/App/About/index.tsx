import React from 'react';
import { Col, Row, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

import Page from '../../components/Page';
import terka from '../../images/terka.jpg';
import knut from '../../images/knut.jpg';

import './style.scss';

const About = () => (
  <Page id="about">
    <Row>
      <Col>
        <h1>O projektu</h1>
      </Col>
    </Row>
    <Row>
      <Col className="mt-2">
        <p>
          Za tímto projektem stojí LGBT pár Tereza a Knut Holm. Přišlo nám, že na českém internetu chybí místo, kde by
          mohl člověk přijít a vyhledat knihy v českém jazyce na základě LGBT subžánrů, protože klasické knižní databáze
          takto pokročilé možnosti vyhledávání nenabízejí a LGBT knihy mezi ostatními snadno zapadnou.
          <br /> Zároveň jsme si chtěli společně zaprogramovat, protože ač jsme oba programátoři, pracujeme v jiných
          firmách a ke spolupráci na stejném projektu se tak nedostaneme. Spojili jsme tedy příjemné s užitečným a
          zrodila se tato databáze.
        </p>
        <p>
          Účelem tohoto projektu není v žádném případě snaha nahradit klasické knižní databáze jako{' '}
          <a href="https://goodreads.com">Goodreads</a>, <a href="https://www.cbdb.cz">ČBDB</a> nebo{' '}
          <a href="https://databazeknih.cz">Databáze knih</a>. Naopak, tento projekt má sloužit jako doplněk k výše
          uvedeným pro snadnější vyhledávání LGBT literatury v českém jazyce. Detail každé knihy na tomto webu obsahuje
          odkazy na uvedené datábaze, kde naleznete o knihách daleko více informací a které nabízí rovněž spoustu další
          funkcionality. Vřele doporučujeme si na jedné z těchto databází vytvořit uživatelský účet a tento web používat
          pouze jako rychlou referenční příručku pro LGBT knihy v českém jazyce.
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>K čemu lze použít tento web</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <ul>
          <li>K vyhledání další LGBT knihy v češtině, kterou si chcete přečíst, na základě vybraných parametrů</li>
          <li>K rychlému ověření subžánrů knihy, o které již víte, že je tématicky zaměřená na LGBT</li>
          <li>Ke sledování knižních LGBT novinek v češtině</li>
        </ul>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Chybí tady kniha?</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>
          Chybí tu nějaká kniha, která by podle vás v databázi určitě být měla? Našli jste nějakou chybu? Budeme moc
          rádi, když nám o tom <a href="mailto:info@dkdb.cz?subject=Připomínka k webu DKDB">dáte vědět</a>.
        </p>
      </Col>
    </Row>
    <Row>
      <Col>
        <h2>Technicky</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <p>
          Celý projekt je open source pod licencí MIT a jeho zdrojové kódy můžete najít na GitHubu. Hlavním autorem{' '}
          <a href="https://github.com/terhol/dkdb-be">backendu</a> je Tereza Holm a je napsaný v Javě. Hlavním autorem{' '}
          <a href="https://github.com/knuhol/dkdb-fe">frontendu</a> je Knut Holm a je napsaný v TypeScriptu.
          <br />
          Projekt jsme napsali ve svém volném čase a jeho provoz zatím financujeme z vlastních prostředků. Pokud se jeho
          uživatelská základna rozroste a provoz bude více nákladný, zvážíme formu jeho financování na základě
          dobrovolných příspěvků. Na webu není žádná reklama a ani do budoucna nezvažujeme formu financování tímto
          způsobem.
          <br />
          Pokud jste vývojáři a chcete se do projektu zapojit, budeme více než rádi. Všechny pull requesty, report bugů
          i nápady na vylepšení jsou vítány. Za tímto účelem, prosím, využijte primárně GitHub.
        </p>
      </Col>
    </Row>
    <Row className="authors">
      <Col xs={12} md={6} className="text-center">
        <div>
          <h3>Tereza Holm</h3>
        </div>
        <Image src={terka} roundedCircle thumbnail />
        <Button variant="primary" href="https://www.linkedin.com/in/tereza-holm">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </Button>
      </Col>
      <Col xs={12} md={6} className="text-center">
        <div>
          <h3>Knut Holm</h3>
        </div>
        <Image src={knut} roundedCircle thumbnail />
        <Button variant="primary" href="https://www.linkedin.com/in/knuhol">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </Button>
      </Col>
    </Row>
  </Page>
);

export default About;
