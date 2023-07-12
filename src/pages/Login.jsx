import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();

    const salvar = { email };
    localStorage.setItem('user', JSON.stringify(salvar));

    history.push('/meals');
  };

  const validationEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
  const validationPassword = /.{7,}/.test(password);

  const isConditionValid = validationEmail && validationPassword;

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input
          type="email"
          value={ email }
          placeholder="Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          value={ password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handlePassword }
        />
        <button
          type="submit"
          disabled={ !isConditionValid }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
      <Footer />
    </>
  );
}

export default Login;
