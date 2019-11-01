import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import './services/api';
import api from './services/api'


//_Layout CSS
import './pages/res/css/_layout.css'
import './pages/Login/login.css'
require('dotenv/config');

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  async function handleSubmit(event){
    event.preventDefault();

    const response = await api.post('/login', {
      email: email,
      password: password
    });
    console.log(response);
    console.log("Clicou");
  }
  return (
    <div className="container">
      <h1>{process.env.REACT_API_BASE_UR}</h1>
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
                            <hr/>

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

export default App;
