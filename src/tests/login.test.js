import { screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';

const email = 'email-input';
const senha = 'password-input';
const button = 'login-submit-btn';

describe('Testes para a Tela de Login', () => {
  test('Testa se o input e-mail aparece na tela', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputEmail = screen.getByTestId(email);
    expect(inputEmail).toBeInTheDocument();
  });

  test('Testa se o input senha aparece na tela', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputSenha = screen.getByTestId(senha);
    expect(inputSenha).toBeInTheDocument();
  });

  test('Testa se o botão aparece na tela', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    );
    const inputbtn = screen.getByTestId(button);
    expect(inputbtn).toBeInTheDocument();
  });
});
