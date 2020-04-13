import React from 'react';
import { Badge } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import { Book, Tag } from '../../hooks/useBooks';
import { toBooksParams } from '../../utils/urlUtils';
import { trackTag } from '../../utils/analytics';

import './style.scss';

type TagsProps = {
  book: Book;
  clickable?: boolean;
};

const Tags = ({ book, clickable }: TagsProps) => {
  const history = useHistory();

  const onTagClick = (tag: Tag) => () => {
    if (clickable) {
      trackTag(tag.name);
      history.push(toBooksParams({ tags: [tag.slug] }));
    }
  };

  return (
    <div className="tags">
      {book.tags?.map(tag => (
        <Badge
          key={tag.slug}
          className={`${tag.color}${clickable ? ' clickable' : ''}`}
          variant="primary"
          onClick={onTagClick(tag)}
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
