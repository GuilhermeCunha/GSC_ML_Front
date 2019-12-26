import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'
import Navbar from '../Navbar'
import Footer from '../Footer'
//_Layout CSS
import '.././res/css/_layout.css'
import './register.css'


function Register({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [paidDays, setPaidDays] = useState(0);
  
    async function calcEndDate(days){
        // Create new Date instance
        var date = new Date()

        // Add a day
        date.setDate(date.getDate() + parseInt(days))
        return date.getTime();
    }
    async function handleSubmit(event) {
      event.preventDefault();
        let endDate = await calcEndDate(paidDays);
        console.log("endDate: " + endDate);
        
        await api.post('/user', {
            email,
            password,
            access_expires_at: endDate,
        }).then(function(result){
            console.log('Criado');
            history.push('/login');
        }).catch(e => {
            console.log(e);
        });

    }
  return (
    <>
    <Navbar/>
     
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
                            onChange={event => setEmail(event.target.value)}
                            required 
                            autoFocus/>
                            <label htmlFor="email">Email</label>
                        </div>


                        <div className="form-label-group">
                            <input type="password" 
                            id="password" 
                            className="form-control" 
                            placeholder="Senha" 
                            onChange={event => setPassword(event.target.value)}
                            required />
                            <label htmlFor="password">Senha</label>
                        </div>
                        <div className="form-group">
                            <input type="number" 
                            id="paidDays" 
                            className="form-control" 
                            placeholder="Número de dias" 
                            min="1"
                            onChange={event => setPaidDays(event.target.value)}
                            required />
                        </div>
                        <button id="btnRegistrar" className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Registrar</button>
                        
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<Footer/>
</> 
  );
}

export default Register;
