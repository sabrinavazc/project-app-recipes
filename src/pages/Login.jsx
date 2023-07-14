import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logoLogin from '../assets/login.svg';
import './Login.css';

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
    <div className="login-container">
      <img className="logo-login" src={ logoLogin } alt="logo" />
      <form className="form-user" onSubmit={ handleSubmit }>
        <input
          className="input-login"
          type="email"
          value={ email }
          placeholder="Email"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          className="input-login"
          type="password"
          value={ password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handlePassword }
        />
        <button
          className="btn-login"
          type="submit"
          disabled={ !isConditionValid }
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
