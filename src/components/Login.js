// initial commit
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from './Header';
import Footer from './Footer';

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

  /*   const re = /\S+@\S+\.\S+/;
 return re.test(email);
  const six = 6;
  const condition = re.test(email) && password.length >= six; */

  const validationEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(loginData.email);
  const validationPassword = /.{7,}/.test(password.password);
  const condition = !(validationEmail && validationPassword);

  return (
    <>
      <form
        onSubmit={ handleSubmit }
      >
        <Header />
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
      <Footer />

    </>
  );
}

export default Login;
