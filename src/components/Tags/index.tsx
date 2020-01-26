import React from 'react';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

import { Book } from '../../hooks/useBooks';

import './style.scss';

type TagsProps = {
  book: Book;
};

const Tags = ({ book }: TagsProps) => (
  <div className="tags">
    {book.tags?.map(tag => (
      <Badge key={tag.slug} className={tag.color?.toLowerCase()} variant="primary">
        <FontAwesomeIcon icon={faTag} /> {tag.name}
      </Badge>
    ))}
  </div>
);

export default Tags;
