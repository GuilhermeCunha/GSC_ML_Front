import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'


//import Alert from '@bit/react-bootstrap.react-bootstrap.alert'

//_Layout CSS
import '.././res/css/_layout.css'
import './login.css'
import { login, isAuthenticated, logout } from "../../services/auth";



function Login({ history }) {

  if (isAuthenticated()) logout();


  /*
useEffect(() => {

}, []);
*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleSubmit(event) {
    event.preventDefault();

    await api.post('/login', {
      email: email,
      password: password
    }).then(function (result) {
      localStorage.setItem('@id', result.data.data.id);
      localStorage.setItem('@email', result.data.data.email);
      localStorage.setItem('@nickname', result.data.data.nickname);
      login(result.data.token);
      console.log(result);
      api.post('/auth/mercadolivre/isAuthenticated', {
        id: localStorage.getItem('@id'),
      }, {
        headers: {
          'x-access-token': localStorage.getItem('@token')
        }
      }).then(result => {
        console.log(result);
        if (result.data.message) {
          history.push('/products');
        } else {
          history.push('/mercadolivre/auth');
        }
      }).catch(e => {
        console.log(e);
      });

    }).catch(function (err) {
      console.log(err);
    });





  }
  return (
    <>
    <div className="container text-center">
      <br/>
      <h1>Envio de produtos digitais</h1>
    </div>
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
                        <a className="" href="/register">Cadastre-se</a>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
