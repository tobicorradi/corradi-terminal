import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NavBar } from './NavBar';

const items = [
  { id: 'about', index: '_01.', label: 'About' },
  { id: 'work', index: '_02.', label: 'Work' },
];

const githubLink = {
  href: 'https://github.com/tobicorradi',
  label: 'Open GitHub profile',
};

describe('NavBar', () => {
  it('toggles the mobile menu from the hamburger button', async () => {
    const user = userEvent.setup();

    render(<NavBar githubLink={githubLink} isPinned={false} items={items} name="Tobías Corradi" />);

    const toggleButton = screen.getByRole('button', { name: /open navigation menu/i });
    const navigation = screen.getByRole('navigation', { name: /primary/i });

    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(navigation).toHaveAttribute('data-open', 'false');

    await user.click(toggleButton);

    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    expect(navigation).toHaveAttribute('data-open', 'true');

    await user.click(screen.getByRole('link', { name: /work/i }));

    expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });
});
