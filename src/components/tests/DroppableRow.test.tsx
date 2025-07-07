import React from 'react';
import { render } from '@testing-library/react';
import { DroppableRow } from '../DroppableRow';

jest.mock('@dnd-kit/core', () => ({
  useDroppable: () => ({
    isOver: false,
    setNodeRef: jest.fn(),
  }),
}));

describe('DroppableRow', () => {
  it('renders the French label and children', () => {
    const { getByText } = render(
      <DroppableRow fr="forêt">
        <span>Forest</span>
      </DroppableRow>
    );

    expect(getByText('forêt')).toBeInTheDocument();
    expect(getByText('Forest')).toBeInTheDocument();
  });

  it('uses the default droppable class when not hovered', () => {
    const { container } = render(<DroppableRow fr="bureau">Desk</DroppableRow>);
    expect(container.firstChild).toHaveClass('droppable');
  });
});
