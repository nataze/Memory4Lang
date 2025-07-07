import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('canvas-confetti', () => jest.fn());
window.HTMLMediaElement.prototype.play = jest.fn();

jest.mock('./assets/sounds/drop.mp3', () => 'drop.mp3');
jest.mock('./assets/sounds/fail.mp3', () => 'fail.mp3');
jest.mock('./assets/sounds/victory.mp3', () => 'victory.mp3');

jest.mock('@dnd-kit/core', () => {
  const original = jest.requireActual('@dnd-kit/core');
  return {
    ...original,
    DndContext: ({ children }: any) => <div>{children}</div>,
  };
});

jest.mock('./helpers', () => ({
  shuffle: (arr: any[]) => arr,
}));

jest.mock('./data', () => ({
  languageTranslations: [
    { en: 'forest', fr: 'forêt' },
    { en: 'desk', fr: 'bureau' },
  ],
}));

describe('App', () => {
  it('shows splash screen initially', () => {
    render(<App />);
    expect(screen.getByText('Memory4Lang 🎯')).toBeInTheDocument();
    expect(screen.getByText(/GO!/)).toBeInTheDocument();
  });

  it('starts game and displays columns after clicking GO', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/GO!/));
    expect(screen.getByText(/English Words/)).toBeInTheDocument();
    expect(screen.getByText(/French Words/)).toBeInTheDocument();
    expect(screen.getByText('forest')).toBeInTheDocument();
    expect(screen.getByText('forêt')).toBeInTheDocument();
  });

  it('shows score modal after grading', () => {
    render(<App />);
    fireEvent.click(screen.getByText(/GO!/));
    fireEvent.click(screen.getByText(/GRADE/));
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
    expect(screen.getByText(/Play Again/)).toBeInTheDocument();
  });
});
