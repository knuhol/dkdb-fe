import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';

import Page from '../../components/Page';
import useBook from '../../hooks/useBook';
import useBooks from '../../hooks/useBooks';
import { ORDER } from '../../utils/fetchUtils';
import useTotalBooks from '../../hooks/useTotalBooks';

const Books = () => {
  const book = useBook(3);
  const books = useBooks({ order: ORDER.DESC }, []);
  const total = useTotalBooks(0);

  console.log(books[0]);
  console.log(total);

  return (
    <Page title="Knihy">
      {book && (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Page>
  );
};

export default Books;
