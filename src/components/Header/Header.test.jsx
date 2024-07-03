import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import Header from './Header';

vi.mock('react-router-dom');
describe('Header: ', () => {
  const token = 'token';
  const setToken = vi.fn();
  it('Mount:', () => {
    const { container } = render(<Header token={token} setToken={setToken} />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<Header token={token} setToken={setToken} />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1>
          Blog
        </h1>
        <nav>
          <ul>
            <li />
            <li />
          </ul>
        </nav>
      </div>
    `);
  });
});
