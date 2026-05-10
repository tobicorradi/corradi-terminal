import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AsciiOrb } from './AsciiOrb';

const createMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation(() => ({
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

describe('AsciiOrb', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    window.matchMedia = createMatchMedia(false);

    Object.defineProperty(document, 'hidden', {
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('updates the orb frame over time when motion is enabled', () => {
    render(<AsciiOrb />);

    const orb = screen.getByRole('img', { name: /animated ascii orb/i }).querySelector('pre');

    expect(orb).not.toBeNull();

    const initialFrame = orb?.textContent;

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(orb?.textContent).not.toBe(initialFrame);
  });

  it('keeps the orb static when reduced motion is preferred', () => {
    window.matchMedia = createMatchMedia(true);

    render(<AsciiOrb />);

    const orb = screen.getByRole('img', { name: /animated ascii orb/i }).querySelector('pre');

    expect(orb).not.toBeNull();

    const initialFrame = orb?.textContent;

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(orb?.textContent).toBe(initialFrame);
  });

  it('renders interior negative space inside the globe silhouette', () => {
    render(<AsciiOrb />);

    const orb = screen.getByRole('img', { name: /animated ascii orb/i }).querySelector('pre');
    const rows = orb?.textContent?.split('\n').map((row) => row.trim()) ?? [];
    const hasInteriorCutout = rows.some((row) => /[#:.]{3,}\s{3,}[#:.]{3,}/.test(row));

    expect(hasInteriorCutout).toBe(true);
  });
});
