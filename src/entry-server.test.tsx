import { describe, expect, it } from 'vitest';
import { render } from './entry-server';

describe('entry-server', () => {
  it('renders the application markup for prerendering', () => {
    const html = render();

    expect(html).toContain('Tobías Corradi');
    expect(html).toContain('Engineering Lead building clean and scalable frontend systems');
    expect(html).toContain('id="about"');
    expect(html).toContain('Open to meaningful challenges.');
  });
});
