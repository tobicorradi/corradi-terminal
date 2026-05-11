import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
    document.head.innerHTML = '';
  });

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
    expect(screen.getAllByText(/rootstrap/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/worldwide|remote/i).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /open github profile/i }).length).toBeGreaterThan(0);
  });

  it('toggles and persists the selected theme', async () => {
    const user = userEvent.setup();
    document.head.innerHTML = '<meta name="theme-color" content="#080706" />';

    render(<App />);

    const [themeToggle] = screen.getAllByRole('button', { name: /toggle site theme/i });

    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');

    await user.click(themeToggle);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(window.localStorage.getItem('site-theme')).toBe('light');
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      'content',
      '#f4efe4',
    );
    expect(themeToggle).toHaveTextContent(/current theme:\s*light/i);
  });

  it('starts from a persisted theme preference', () => {
    window.localStorage.setItem('site-theme', 'light');

    render(<App />);

    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(screen.getAllByRole('button', { name: /toggle site theme/i })[0]).toHaveTextContent(
      /current theme:\s*light/i,
    );
  });
});
