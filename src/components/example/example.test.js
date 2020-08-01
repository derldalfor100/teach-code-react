import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import example from './example';

describe('<example />', () => {
  test('it should mount', () => {
    render(<example />);
    
    const example = screen.getByTestId('example');

    expect(example).toBeInTheDocument();
  });
});