import { render } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';
import Footer from './Footer';

describe('Footer: ', () => {
  it('Mount:', () => {
    const { container } = render(<Footer />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <footer>
          Footer
        </footer>
      </div>
    `);
  });
});
