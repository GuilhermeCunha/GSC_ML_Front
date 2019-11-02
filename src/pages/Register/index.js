import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'

//_Layout CSS
import '.././res/css/_layout.css'
import './register.css'


function Register({ history }) {
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    
  
  
    async function handleSubmit(event) {
      event.preventDefault();
        
      await api.post('/register-user', {
          email,
          nickname,
          password,
      }).then(function(result){
          console.log('Criado');
          history.push('/login');
      }).catch(e => {
          console.log(e);
      });

    }
  return (
    <div id="container_geral" className="container">
    <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
                <div className="card-body">
                    <h5 className="card-title text-center">Registro</h5>
                    <form className="form-signin" onSubmit={handleSubmit}>

                        <div className="form-label-group">
                            <input type="email" id="email" 
                            className="form-control" 
                            placeholder="Email" 
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required 
                            autoFocus/>
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-label-group">
                            <input type="text" 
                            id="nickname" 
                            name="nickname" 
                            className="form-control" 
                            placeholder="Nickname" 
                            value={nickname}
                            onChange={event => setNickname(event.target.value)}
                            required 
                            autoFocus />
                            <label htmlFor="nickname">Apelido</label>
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
                        <button id="btnLogin" className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Registrar</button>
                        <hr/>

                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <p className="link text-center">
                                        Já tem uma conta?
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 text-center">
                                    <a className="" href="#paralogin">Login</a>
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

export default Register;
