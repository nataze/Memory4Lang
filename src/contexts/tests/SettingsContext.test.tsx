import { render, screen, act } from '@testing-library/react';
import { SettingsProvider, useSettings } from '../SettingsContext';

const TestComponent = () => {
  const { reverseDirection, isMuted, name, setConfig } = useSettings();

  return (
    <div>
      <p data-testid="reverseDirection">{String(reverseDirection)}</p>
      <p data-testid="isMuted">{String(isMuted)}</p>
      <p data-testid="name">{name}</p>
      <button onClick={() => setConfig({ reverseDirection: true })}>Set Direction</button>
      <button onClick={() => setConfig({ isMuted: true, name: 'Alex' })}>Set Audio + Name</button>
    </div>
  );
};

const renderWithProvider = () =>
  render(
    <SettingsProvider>
      <TestComponent />
    </SettingsProvider>
  );

describe('SettingsContext', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  afterAll(() => {
    sessionStorage.clear();
  });

  it('loads default values when no sessionStorage present', () => {
    renderWithProvider();
    expect(screen.getByTestId('reverseDirection').textContent).toBe('false');
    expect(screen.getByTestId('isMuted').textContent).toBe('false');
    expect(screen.getByTestId('name').textContent).toBe('');
  });

  it('updates reverseDirection when setConfig is called', () => {
    renderWithProvider();
    act(() => {
      screen.getByText('Set Direction').click();
    });
    expect(screen.getByTestId('reverseDirection').textContent).toBe('true');
  });

  it('updates multiple config values at once', () => {
    renderWithProvider();
    act(() => {
      screen.getByText('Set Audio + Name').click();
    });
    expect(screen.getByTestId('isMuted').textContent).toBe('true');
    expect(screen.getByTestId('name').textContent).toBe('Alex');
  });

  it('persists config to sessionStorage', () => {
    renderWithProvider();
    act(() => {
      screen.getByText('Set Audio + Name').click();
    });
    const stored = JSON.parse(sessionStorage.getItem('memory4lang-config')!);
    expect(stored.name).toBe('Alex');
    expect(stored.isMuted).toBe(true);
  });
});
