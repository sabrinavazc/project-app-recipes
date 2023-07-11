// initial commit
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePassword = ({ target }) => {
    const { value } = target;
    setPassword(value);
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    useHistory.push('/meals');
  };

  const re = /\S+@\S+\.\S+/;
  /* return re.test(email); */
  const six = 6;
  const condition = re.test(email) && password.length >= six;

  return (
    <form
      onSubmit={ handleSubmit }
    >
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
        disabled={ !condition }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </form>
  );
}

export default Login;
