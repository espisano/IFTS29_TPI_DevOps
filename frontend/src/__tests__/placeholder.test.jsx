import React from 'react';
import { render, screen } from '@testing-library/react';

function Hello() {
  return <div>Hola desde el test</div>;
}

test('renders placeholder text', () => {
  render(<Hello />);
  expect(screen.getByText(/Hola desde el test/i)).toBeInTheDocument();
});
