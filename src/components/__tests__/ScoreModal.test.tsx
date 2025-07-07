import { render, screen, fireEvent } from '@testing-library/react';
import { ScoreModal } from '../ScoreModal/ScoreModal';

describe('ScoreModal', () => {
  it('renders the correct score and 🎉 emoji when score is 50% or higher', () => {
    render(<ScoreModal correct={5} total={10} closeModal={jest.fn()} />);
    expect(screen.getByText(/🎉 Results/)).toBeInTheDocument();
    expect(screen.getByText(/You matched 5 of 10 correctly!/)).toBeInTheDocument();
    expect(screen.getByText(/Score: 50%/)).toBeInTheDocument();
  });

  it('renders the 😕 emoji when score is below 50%', () => {
    render(<ScoreModal correct={3} total={10} closeModal={jest.fn()} />);
    expect(screen.getByText(/😕 Results/)).toBeInTheDocument();
  });

  it('calls closeModal when "Play Again" button is clicked', () => {
    const closeModal = jest.fn();
    render(<ScoreModal correct={6} total={10} closeModal={closeModal} />);
    fireEvent.click(screen.getByText(/Play Again/i));
    expect(closeModal).toHaveBeenCalled();
  });
});
