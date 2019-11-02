import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'

//_Layout CSS
import '.././res/css/_layout.css'
import './login.css'
import { login } from "../../services/auth";


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post('/login', {
      email: email,
      password: password
    });

    localStorage.setItem('@id', response.data.data.id);
    localStorage.setItem('@email', response.data.data.email);
    localStorage.setItem('@nickname', response.data.data.nickname);
    login(response.data.token);
    
    console.log(response);
    console.log("Clicou");
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5">
            <div className="card-body">
              <h5 className="card-title text-center">Login</h5>
              <form className="form-signin" onSubmit={handleSubmit}>

                <div className="form-label-group">
                  <input type="email"
                    id="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                    autoFocus
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="form-label-group">
                  <input type="password"
                    id="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required />
                  <label htmlFor="password">Senha</label>
                </div>
                <button id="btnLogin" className="btn btn-lg btn-primary btn-block text-uppercase"
                  type="submit">Login</button>
                <hr />

                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <p className="link text-center">
                        Ainda não tem conta?
                                        </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 text-center">
                      <a className="" href="#paracadastro">Cadastre-se</a>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
