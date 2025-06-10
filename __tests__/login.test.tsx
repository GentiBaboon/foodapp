import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../pages/login';

const push = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({ push }),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear();
    push.mockClear();
  });

  it('stores username and navigates on button click', () => {
    render(<LoginPage />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Alice' } });

    fireEvent.click(screen.getByRole('button', { name: /continue to dashboard/i }));

    expect(localStorage.getItem('username')).toBe('Alice');
    expect(push).toHaveBeenCalledWith('/dashboard');
  });
});
