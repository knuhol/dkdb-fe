// @flow
import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import times from 'lodash/times';

import './style.scss';

const EllipsisPagination = ({
  total,
  active,
  maxWidth,
  onPageClick,
}: {
  total: number,
  active: number,
  maxWidth: number,
  onPageClick: number => () => void,
}) => {
  const ITEM_WIDTH = 40;
  const MIN_SUPPORTED_WIDTH = 290;

  const [areArrowsVisible, setAreArrowsVisible] = useState(false);
  const [visiblePages, setVisiblePages] = useState(0);
  const [prevPartLength, setPrevPartLength] = useState(0);
  const [nextPartLength, setNextPartLength] = useState(0);

  useEffect(() => {
    if (maxWidth && total) {
      if (active > total) {
        throw new Error('Active page cannot be higher than total number of pages');
      }

      const maxItems = Math.floor(maxWidth / ITEM_WIDTH);
      const minItems = Math.floor(MIN_SUPPORTED_WIDTH / ITEM_WIDTH);
      const pivot = Math.floor(visiblePages / 2);

      setAreArrowsVisible(maxItems >= minItems + 2);
      setVisiblePages(maxItems - (areArrowsVisible ? 4 : 2));
      setPrevPartLength(pivot);
      setNextPartLength(visiblePages % 2 === 1 ? pivot : pivot - 1);
    }
  }, [areArrowsVisible, maxWidth, total, active, visiblePages]);

  let ellipsisOnBeginning = true;
  let ellipsisOnEnd = true;
  let indexFrom = active - prevPartLength + 1;
  let totalPages = visiblePages;

  // no ellipsis, all pages are visible
  if (total - 2 <= visiblePages) {
    ellipsisOnBeginning = false;
    ellipsisOnEnd = false;
    totalPages = total - 2;
    indexFrom = 2;
  }

  // ellipsis just on the beginning
  if (total - active <= nextPartLength + 1) {
    ellipsisOnEnd = false;
    indexFrom = total - visiblePages + 1;
  }

  // ellipsis just on the end
  if (active <= prevPartLength + 2) {
    ellipsisOnBeginning = false;
    indexFrom = 2;
  }

  let pagination = indexFrom;

  if (!maxWidth || !total) {
    return null;
  }

  return (
    <Pagination className="ellipsis-pagination">
      {areArrowsVisible && <Pagination.Prev onClick={onPageClick(active === 1 ? 1 : active - 1)} />}
      <Pagination.Item active={active === 1} onClick={onPageClick(1)}>
        {1}
      </Pagination.Item>
      {times(totalPages, index => {
        if ((ellipsisOnBeginning && index === 0) || (ellipsisOnEnd && index === totalPages - 1)) {
          const pageIndex = ellipsisOnBeginning
            ? Math.ceil((1 + pagination) / 2)
            : Math.floor((pagination + total) / 2);
          return <Pagination.Ellipsis key={index} onClick={onPageClick(pageIndex)} />;
        }

        pagination += 1;
        return (
          <Pagination.Item key={index} active={active === pagination - 1} onClick={onPageClick(pagination - 1)}>
            {pagination - 1}
          </Pagination.Item>
        );
      })}
      <Pagination.Item active={active === total} onClick={onPageClick(total)}>
        {total}
      </Pagination.Item>
      {areArrowsVisible && <Pagination.Next onClick={onPageClick(active === total ? total : active + 1)} />}
    </Pagination>
  );
};

export default EllipsisPagination;
