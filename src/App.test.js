import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders textbox', () => {
  render(<App />);
  const linkElement = screen.getByRole('textbox');
  expect(linkElement).toBeInTheDocument();
});
