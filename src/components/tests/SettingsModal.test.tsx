import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsModal } from '../SettingsModal/SettingsModal';
import { SettingsProvider } from '../../contexts/SettingsContext';

const renderWithProvider = (props: { onClose: () => void; onSave: () => void }) =>
  render(
    <SettingsProvider>
      <SettingsModal {...props} />
    </SettingsProvider>
  );

describe('SettingsModal', () => {
  it('renders initial values from context', () => {
    renderWithProvider({ onClose: jest.fn(), onSave: jest.fn() });
    expect(screen.getByLabelText(/Play French/i)).not.toBeChecked();
    expect(screen.getByLabelText(/Mute Sound/i)).not.toBeChecked();
    expect(screen.getByPlaceholderText(/Enter your name/i)).toHaveValue('');
  });

  it('updates form state when inputs change', () => {
    renderWithProvider({ onClose: jest.fn(), onSave: jest.fn() });

    const reverseCheckbox = screen.getByLabelText(/Play French/i);
    const muteCheckbox = screen.getByLabelText(/Mute Sound/i);
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);

    fireEvent.click(reverseCheckbox);
    fireEvent.click(muteCheckbox);
    fireEvent.change(nameInput, { target: { value: 'Luna' } });

    expect(reverseCheckbox).toBeChecked();
    expect(muteCheckbox).toBeChecked();
    expect(nameInput).toHaveValue('Luna');
  });

  it('calls setConfig, onClose, and onSave on submit', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();

    renderWithProvider({ onClose, onSave });

    fireEvent.click(screen.getByLabelText(/Play French/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
      target: { value: 'Zoe' },
    });

    fireEvent.click(screen.getByText('Save'));

    expect(onClose).toHaveBeenCalled();
    expect(onSave).toHaveBeenCalled();

    const stored = JSON.parse(sessionStorage.getItem('memory4lang-config')!);
    expect(stored.reverseDirection).toBe(true);
    expect(stored.name).toBe('Zoe');
  });

  it('calls only onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    const onSave = jest.fn();

    renderWithProvider({ onClose, onSave });

    fireEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
    expect(onSave).not.toHaveBeenCalled();
  });
});
