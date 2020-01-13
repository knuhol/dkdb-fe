// @flow
import React from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import type { Book } from '../../hooks/useBooks';

import './style.scss';

const Tags = ({ book }: { book: Book }) => {
  const tagColors = ['red', 'orange', 'yellow', 'green', 'blue', 'violet'];

  return (
    <div className="tags">
      {book.tags.map(tag => (
        <Badge key={tag.id} className={tagColors[tag.id % tagColors.length]} variant="primary">
          <FontAwesomeIcon icon={faTag} /> {tag.name}
        </Badge>
      ))}
    </div>
  );
};

export default Tags;
