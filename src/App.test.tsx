import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('renders the hero with core navigation', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: /tobías corradi/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /work/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
  });

  it('renders the animated terminal details', () => {
    render(<App />);

    expect(screen.getAllByRole('img', { name: /animated ascii orb/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/open to meaningful challenges/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/the farmer's dog/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /open github profile/i }).length).toBeGreaterThan(0);
  });
});
