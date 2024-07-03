import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import Login from './Login';

vi.mock('react-router-dom');
describe('Login: ', () => {
  const token = 'token';
  const setToken = vi.fn();
  it('Mount:', () => {
    const { container } = render(<Login token={token} setToken={setToken} />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<Login token={token} setToken={setToken} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
});
