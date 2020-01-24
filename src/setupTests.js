import React from 'react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-use-dimensions', () => () => [undefined, { width: 1280 }]);
jest.mock('react-image', () => ({ src, alt }) => <img src={src[0]} alt={alt} />);
