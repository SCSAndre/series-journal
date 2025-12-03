import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('should render loading container', () => {
    const { container } = render(<Loading />);
    const loadingContainer = container.querySelector('[class*="loadingContainer"]');
    expect(loadingContainer).toBeInTheDocument();
  });

  it('should display loading text', () => {
    render(<Loading />);
    const text = screen.getByText(/loading/i);
    expect(text).toBeInTheDocument();
  });

  it('should display custom message when provided', () => {
    render(<Loading message="Please wait..." />);
    const text = screen.getByText('Please wait...');
    expect(text).toBeInTheDocument();
  });
});
