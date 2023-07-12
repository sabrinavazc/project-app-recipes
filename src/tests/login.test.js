import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../pages/Login';

describe('Testando a pagina de <Login />', () => {
  const email = 'email-input';
  const password = 'password-input';
  const btnLogin = 'login-submit-btn';

  test('1 - Testa se renderiza os campos de email e senha', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('2 - Testa se o botao esta desabilitado quando email e senha sao inválidos', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(btnLogin);

    fireEvent.change(emailInput, { target: { value: 'notvalid_email' } });
    fireEvent.change(passwordInput, { target: { value: 'ABC' } });

    expect(submitButton).toBeDisabled();
  });

  test('3 - Testa se o botao é habilitado quando email e senha válidos', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(btnLogin);

    fireEvent.change(emailInput, { target: { value: 'valid_email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(submitButton).toBeEnabled();
  });

  test('4 - Testa se o formulário é "submetido" quando email e senha válido e ocorre clique no botao de enviar', () => {
    const { getByTestId } = render(
      <Router>
        <Login />
      </Router>,
    );

    const emailInput = getByTestId(email);
    const passwordInput = getByTestId(password);
    const submitButton = getByTestId(btnLogin);

    fireEvent.change(emailInput, { target: { value: 'valid_email@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
  });
});
