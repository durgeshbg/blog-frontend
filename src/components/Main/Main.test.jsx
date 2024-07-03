/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, test, vi } from 'vitest';
import Main from './Main';
import Login from '../Form/Login';
import Register from '../Form/Register';
import Home from '../Home/Home';
import Error from '../Error/Error';

vi.mock('../Login/Login', () => {
  return {
    default: ({ token, setToken }) => <div>Login Form</div>,
  };
});
vi.mock('../Register/Register', () => {
  return {
    default: ({ token, setToken }) => <div>Register Form</div>,
  };
});
vi.mock('../Home/Home', () => {
  return {
    default: ({ token }) => <div>Home</div>,
  };
});
vi.mock('../Error/Error', () => {
  return {
    default: () => <div>Error</div>,
  };
});

describe('Main: ', () => {
  const token = 'token';
  const setToken = vi.fn();
  it('Mount:', () => {
    const { container } = render(<Main token={token} setToken={setToken} />);
    expect(container).toBeInTheDocument();
  });
});
