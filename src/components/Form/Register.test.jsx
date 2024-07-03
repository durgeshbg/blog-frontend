import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import Register from './Register';

vi.mock('react-router-dom');
describe('Register: ', () => {
  const token = 'token';
  const setToken = vi.fn();
  it('Mount:', () => {
    const { container } = render(<Register token={token} setToken={setToken} />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<Register token={token} setToken={setToken} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
