import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import EllipsisPagination from '../index';

const PREV_ARROW_CHAR = '‹';
const NEXT_ARROW_CHAR = '›';
const ELLIPSIS_CHAR = '…';
const MINIMAL_WIDTH = 290;
const MINIMAL_ARROW_WIDTH = 390;

let active = 1;
const onPageClick = pageNumber => () => {
  active = pageNumber;
};

describe('EllipsisPagination', () => {
  it('throws an error if active page is higher than total number of pages', () => {
    expect(() =>
      render(<EllipsisPagination total={10} maxWidth={MINIMAL_WIDTH} active={11} onPageClick={onPageClick} />)
    ).toThrow();
  });

  it('always contains first and last page', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={3} onPageClick={onPageClick} />
    );

    expect(queryByText(PREV_ARROW_CHAR)).toBeDefined();
    expect(queryByText('1')).toBeDefined();
    expect(queryByText('2')).toBeDefined();
    expect(queryByText('3')).toBeDefined();
    expect(queryByText('4')).toBeDefined();
    expect(queryByText('5')).toBeDefined();
    expect(queryByText(ELLIPSIS_CHAR)).toBeDefined();
    expect(queryByText('40')).toBeDefined();
    expect(queryByText(NEXT_ARROW_CHAR)).toBeDefined();
  });

  it('contains correctly all items', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_WIDTH} active={16} onPageClick={onPageClick} />
    );

    expect(queryByText('1')).toBeDefined();
    expect(queryByText('40')).toBeDefined();
  });

  it('should render without arrows on small screens for lot of items', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_WIDTH} active={1} onPageClick={onPageClick} />
    );

    expect(queryByText(PREV_ARROW_CHAR)).toBeNull();
    expect(queryByText(NEXT_ARROW_CHAR)).toBeNull();
  });

  it('should render with arrows on small screens for few items', () => {
    const { queryByText } = render(
      <EllipsisPagination total={3} maxWidth={MINIMAL_WIDTH} active={1} onPageClick={onPageClick} />
    );

    expect(queryByText(PREV_ARROW_CHAR)).toBeDefined();
    expect(queryByText(NEXT_ARROW_CHAR)).toBeDefined();
  });

  it('should render with arrows on bigger screens for lot of items', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={1} onPageClick={onPageClick} />
    );

    expect(queryByText(PREV_ARROW_CHAR)).toBeDefined();
    expect(queryByText(NEXT_ARROW_CHAR)).toBeDefined();
  });

  it('perform correctly click on item', () => {
    const { queryByText, queryAllByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={23} onPageClick={onPageClick} />
    );

    fireEvent.click(queryByText('1'));
    expect(active).toBe(1);

    fireEvent.click(queryByText(NEXT_ARROW_CHAR));
    expect(active).toBe(24);

    fireEvent.click(queryByText(PREV_ARROW_CHAR));
    expect(active).toBe(22);

    fireEvent.click(queryAllByText(ELLIPSIS_CHAR)[0]);
    expect(active).toBe(12);

    fireEvent.click(queryAllByText(ELLIPSIS_CHAR)[1]);
    expect(active).toBe(32);
  });

  it('handles prev click on first item correctly', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={1} onPageClick={onPageClick} />
    );

    fireEvent.click(queryByText(PREV_ARROW_CHAR));
    expect(active).toBe(1);
  });

  it('handles next click on last item correctly', () => {
    const { queryByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={40} onPageClick={onPageClick} />
    );

    fireEvent.click(queryByText(NEXT_ARROW_CHAR));
    expect(active).toBe(40);
  });

  it('has correctly ellipsis just on the end', () => {
    const { queryAllByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={2} onPageClick={onPageClick} />
    );

    expect(queryAllByText(ELLIPSIS_CHAR).length).toBe(1);
    fireEvent.click(queryAllByText(ELLIPSIS_CHAR)[0]);
    expect(active).toBe(23);
  });

  it('has correctly ellipsis just on the beginning', () => {
    const { queryAllByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={37} onPageClick={onPageClick} />
    );

    expect(queryAllByText(ELLIPSIS_CHAR).length).toBe(1);
    fireEvent.click(queryAllByText(ELLIPSIS_CHAR)[0]);
    expect(active).toBe(19);
  });

  it('has correctly two ellipsis', () => {
    const { queryAllByText } = render(
      <EllipsisPagination total={40} maxWidth={MINIMAL_ARROW_WIDTH} active={16} onPageClick={onPageClick} />
    );

    expect(queryAllByText(ELLIPSIS_CHAR).length).toBe(2);
  });
});
