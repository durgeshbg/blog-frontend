import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Post from './Post';

describe('Post: ', () => {
  const mockPost = {
    _id: 'Test Sting',
    title: 'Test Sting',
    body: 'Test Sting',
    public: 'Test String',
    createdAt: 'Test Sting',
    updatedAt: 'Test Sting',
  };
  it('Mount: ', () => {
    const { container } = render(<Post post={mockPost} />);
    expect(container).toBeInTheDocument();
  });
});
