/* eslint-disable no-unused-vars */
import { render } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import App from './App';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

vi.mock('../Header/Header', () => {
  return {
    default: ({ token, setToken }) => <div>Header</div>,
  };
});
vi.mock('../Main/Main', () => {
  return {
    default: ({ token, setToken }) => <div>Main</div>,
  };
});
vi.mock('../Footer/Footer', () => {
  return {
    default: () => <div>Footer</div>,
  };
});

describe('App: ', () => {
  it('Mount:', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
  test('Snapshot:', () => {
    const { container } = render(<App />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          Header
        </div>
        <div>
          Main
        </div>
        <div>
          Footer
        </div>
      </div>
    `);
  });
});
