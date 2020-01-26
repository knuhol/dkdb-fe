import React from 'react';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-use-dimensions', () => (): React.ReactNode => [undefined, { width: 1280 }]);
jest.mock('react-image', () => ({ src, alt }: { src: string[]; alt: string }): React.ReactNode => (
  <img src={src[0]} alt={alt} />
));
