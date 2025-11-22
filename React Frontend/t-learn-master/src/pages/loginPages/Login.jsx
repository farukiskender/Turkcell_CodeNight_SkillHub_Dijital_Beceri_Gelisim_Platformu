import React, { useState } from 'react';


import './login.scss';
import loginImage from "../../components/images/coding-924920_1280.jpg"

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    // Buraya giriş işlemini ekleyebilirsin
  };

  return (
    <div className='login'>
      <div className="login-images">
        <img src={loginImage} alt="giriş sayfası ekran resmi" />
      </div>
      <div className="login-container">
        <h2 className="login-container__title">Giriş Yap</h2>
      <form className="login-container__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-container__form-input"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-container__form-input"
          required
        />
        <button type="submit" className="login-container__form-button">
          Giriş Yap
        </button>
      </form>
      </div>
      
    </div>
  );
}

export default Login;