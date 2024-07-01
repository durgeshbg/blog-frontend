import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './Home';

describe('Home', () => {
  it('mount:', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
