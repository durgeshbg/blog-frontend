import { render } from '@testing-library/react';
import { describe, expect, it, test } from 'vitest';
import Error from './Error';

describe('Error: ', () => {
  it('Mount:', () => {
    const { container } = render(<Error />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<Error />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="error"
        >
          <h1
            class="head"
          >
            404
          </h1>
          <h2
            class="message"
          >
            Page not found
          </h2>
          <img
            alt="logo"
            class="loading"
            src="/icon.svg"
          />
        </div>
      </div>
    `);
  });
});
