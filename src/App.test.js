/**
 * App Component Tests
 */

import { render, screen } from '@testing-library/react';
import App from './App';

// Mock fetch for API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, data: [] }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('renders company name in header', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/HG/i);
  expect(brandElements.length).toBeGreaterThan(0);
});

test('renders hero section with tagline', () => {
  render(<App />);
  const heroTitle = screen.getByText(/Smart Automation/i);
  expect(heroTitle).toBeInTheDocument();
});

test('renders services section', () => {
  render(<App />);
  const servicesTitle = screen.getByText(/Our Services/i);
  expect(servicesTitle).toBeInTheDocument();
});

test('renders contact section', () => {
  render(<App />);
  const contactTitle = screen.getByText(/Get In Touch/i);
  expect(contactTitle).toBeInTheDocument();
});
