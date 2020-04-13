import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import times from 'lodash/times';

import { PAGINATION_ACTION, trackPagination } from '../../utils/analytics';

import './style.scss';

type EllipsisPaginationProps = {
  total: number;
  active: number;
  maxWidth: number;
  onPageClick: (page: number) => void;
};

const EllipsisPagination = ({ total, active, maxWidth, onPageClick }: EllipsisPaginationProps) => {
  const ITEM_WIDTH = 40;
  const MIN_SUPPORTED_WIDTH = 290;

  const [areArrowsVisible, setAreArrowsVisible] = useState(false);
  const [visiblePages, setVisiblePages] = useState(0);
  const [prevPartLength, setPrevPartLength] = useState(0);
  const [nextPartLength, setNextPartLength] = useState(0);
  const [pageItemWidth, setPageItemWidth] = useState(`${ITEM_WIDTH}px`);

  const onPaginationClick = (page: number, action: PAGINATION_ACTION) => () => {
    trackPagination(action, page);
    onPageClick(page);
  };

  useEffect(() => {
    if (maxWidth && total) {
      if (active > total) {
        throw new Error('Active page cannot be higher than total number of pages');
      }

      // how many items can be displayed in pagination?
      const maxItems = Math.floor(maxWidth / ITEM_WIDTH);
      // how many items has to be minimally displayed in pagination?
      const minItems = Math.floor(MIN_SUPPORTED_WIDTH / ITEM_WIDTH);
      const areArrowsVisibleLocal = maxItems >= (total < minItems ? total : minItems) + 2;
      const visiblePagesLocal = maxItems - (areArrowsVisibleLocal ? 4 : 2);
      const pivot = Math.floor(visiblePagesLocal / 2);

      setAreArrowsVisible(areArrowsVisibleLocal);
      setVisiblePages(visiblePagesLocal);
      setPrevPartLength(pivot);
      setNextPartLength(visiblePagesLocal % 2 === 1 ? pivot : pivot - 1);
      setPageItemWidth(total >= visiblePagesLocal + 2 ? `${maxWidth / maxItems}px` : `${ITEM_WIDTH}px`);
    }
  }, [maxWidth, total, active]);

  let ellipsisOnBeginning = true;
  let ellipsisOnEnd = true;
  let pagination = active - prevPartLength + 1;
  let totalPages = visiblePages;

  if (total - 2 <= visiblePages) {
    // no ellipsis, all pages are visible
    ellipsisOnBeginning = false;
    ellipsisOnEnd = false;
    totalPages = total - 2;
    pagination = 2;
  } else if (total - active <= nextPartLength + 1) {
    // ellipsis just on the beginning
    ellipsisOnEnd = false;
    pagination = total - visiblePages + 1;
  } else if (active <= prevPartLength + 2) {
    // ellipsis just on the end
    ellipsisOnBeginning = false;
    pagination = 2;
  }

  if (!maxWidth || !total) {
    return null;
  }

  return (
    <Pagination className="ellipsis-pagination justify-content-center">
      {areArrowsVisible && (
        <Pagination.Prev
          style={{ width: pageItemWidth }}
          onClick={onPaginationClick(active === 1 ? 1 : active - 1, PAGINATION_ACTION.PREVIOUS)}
        />
      )}
      <Pagination.Item
        style={{ width: pageItemWidth }}
        active={active === 1}
        onClick={onPaginationClick(1, PAGINATION_ACTION.PAGE)}
      >
        {1}
      </Pagination.Item>
      {times(totalPages, index => {
        if ((ellipsisOnBeginning && index === 0) || (ellipsisOnEnd && index === totalPages - 1)) {
          const pageIndex =
            ellipsisOnBeginning && index === 0 ? Math.ceil((1 + pagination) / 2) : Math.floor((pagination + total) / 2);
          return (
            <Pagination.Ellipsis
              style={{ width: pageItemWidth }}
              key={index}
              onClick={onPaginationClick(pageIndex, PAGINATION_ACTION.MORE)}
            />
          );
        }

        const item = (
          <Pagination.Item
            style={{ width: pageItemWidth }}
            key={index}
            active={active === pagination}
            onClick={onPaginationClick(pagination, PAGINATION_ACTION.PAGE)}
          >
            {pagination}
          </Pagination.Item>
        );

        pagination += 1;
        return item;
      })}
      {total > 1 && (
        <Pagination.Item
          style={{ width: pageItemWidth }}
          active={active === total}
          onClick={onPaginationClick(total, PAGINATION_ACTION.PAGE)}
        >
          {total}
        </Pagination.Item>
      )}
      {areArrowsVisible && (
        <Pagination.Next
          style={{ width: pageItemWidth }}
          onClick={onPaginationClick(active === total ? total : active + 1, PAGINATION_ACTION.NEXT)}
        />
      )}
    </Pagination>
  );
};

export default EllipsisPagination;
