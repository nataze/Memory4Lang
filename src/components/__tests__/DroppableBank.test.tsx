import React from 'react';
import { render } from '@testing-library/react';
import { DroppableBank } from '../DroppableBank';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    isOver: false,
    setNodeRef: jest.fn(),
  }),
}));

describe('DroppableBank', () => {
  it('renders children inside matchRow', () => {
    const { getByText } = render(
      <DroppableBank>
        <span>Test Word</span>
      </DroppableBank>
    );

    expect(getByText('Test Word')).toBeInTheDocument();
  });

  it('applies the correct class when isOver is false', () => {
    const { container } = render(<DroppableBank>Test</DroppableBank>);
    expect(container.firstChild).toHaveClass('droppable');
  });
});
