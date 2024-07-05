import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from './Home';

vi.mock('react-router-dom');
describe('Home', () => {
  it('Mount:', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
  it('Snapshot:', () => {
    const { container } = render(<Home />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          Posts
        </h2>
        <div
          class="posts"
        >
           
        </div>
      </div>
    `);
  });
});
