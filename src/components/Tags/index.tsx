import React from 'react';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import { Book } from '../../hooks/useBooks';

import './style.scss';
import { toBooksParams } from '../../utils/urlUtils';

type TagsProps = {
  book: Book;
  clickable?: boolean;
};

const Tags = ({ book, clickable }: TagsProps) => {
  const history = useHistory();

  const onTagClick = (tag: string) => () => {
    if (clickable) {
      history.push(toBooksParams({ tags: [tag] }));
    }
  };

  return (
    <div className="tags">
      {book.tags?.map(tag => (
        <Badge
          key={tag.slug}
          className={`${tag.color}${clickable ? ' clickable' : ''}`}
          variant="primary"
          onClick={onTagClick(tag.slug)}
        >
          <FontAwesomeIcon icon={faTag} /> {tag.name}
        </Badge>
      ))}
    </div>
  );
};

Tags.defaultProps = {
  clickable: false,
};

export default Tags;
