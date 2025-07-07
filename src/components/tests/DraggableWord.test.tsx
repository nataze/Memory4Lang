import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DraggableWord } from '../DraggableWord';

jest.mock('@dnd-kit/core', () => ({
  useDraggable: () => ({
    attributes: { 'data-draggable': true },
    listeners: {},
    setNodeRef: jest.fn(),
    transform: null,
  }),
}));

describe('DraggableWord', () => {
  beforeAll(() => {
    Object.defineProperty(global.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      value: jest.fn(),
    });
  });

  it('renders the word', () => {
    const { getByText } = render(<DraggableWord word="forest" />);
    expect(getByText('forest')).toBeInTheDocument();
  });

  it('calls Audio.play() when clicked', () => {
    const { getByText } = render(<DraggableWord word="cereal" />);
    fireEvent.mouseDown(getByText('cereal'));
    expect(global.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});
