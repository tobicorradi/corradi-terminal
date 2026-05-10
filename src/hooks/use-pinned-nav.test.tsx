import { act, render, screen } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePinnedNav } from './use-pinned-nav';

const createRect = (bottom: number): DOMRect =>
  ({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: bottom,
    right: 0,
    bottom,
    left: 0,
    toJSON: () => ({}),
  }) as DOMRect;

const TestHarness = ({ heroBottom, offset }: { heroBottom: number; offset?: number }) => {
  const heroRef = useRef<HTMLElement>(null);
  const isPinned = usePinnedNav(heroRef, offset);

  return (
    <>
      <section ref={heroRef} data-testid="hero" />
      <output data-testid="is-pinned">{String(isPinned)}</output>
      <span data-testid="bottom">{heroBottom}</span>
    </>
  );
};

describe('usePinnedNav', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('pins the nav after the hero bottom crosses the offset', () => {
    let heroBottom = 420;

    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: HTMLElement,
    ) {
      if (this.dataset.testid === 'hero') {
        return createRect(heroBottom);
      }

      return createRect(0);
    });

    render(<TestHarness heroBottom={heroBottom} offset={104} />);

    expect(screen.getByTestId('is-pinned')).toHaveTextContent('false');

    heroBottom = 80;

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(screen.getByTestId('is-pinned')).toHaveTextContent('true');
  });
});
