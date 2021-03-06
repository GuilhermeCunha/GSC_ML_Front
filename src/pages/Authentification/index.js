import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'
import { EMAIL_KEY, TOKEN_KEY, ID_KEY } from "../../services/auth";

//import Alert from '@bit/react-bootstrap.react-bootstrap.alert'

//_Layout CSS
import '.././res/css/_layout.css'


function Authentication({ history }) {
useEffect(() => {
    async function getParams(){
      let search = window.location.search;
      let params = new URLSearchParams(search);
      var code = params.get('code');
      if(code != null){
        await api.post('/auth/mercadolivre/authenticate', {
          code,
          email: localStorage.getItem(EMAIL_KEY)
        },{
          headers:{
            'x-access-token':localStorage.getItem(TOKEN_KEY)
          }
        }).then(function(result){
          console.log("Sucesso!");
          history.push('/products')
        }).catch(e =>{
          console.log("Erro na chamada do authenticate")
          console.log(code + localStorage.getItem(EMAIL_KEY))
          console.log(e);
        })
      }
    }
    getParams();
}, []);


  async function getAuth (){
    await api.get('/auth/mercadolivre/code').then(function(result){
      console.log("Sucesso");
      console.log(result.data.redirect_url);
      window.location.href = result.data.redirect_url;
    }).catch(e=>{
      console.log(e);
    });
  }

  return (
    <>
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <span>Para seguir em frente, por favor clique no botão abaixo</span>
            </div>
          </div>
          <div className="row">
          <div className="col-12 text-center">
          <button onClick={getAuth}>Autentificar</button>
          </div>
          </div>
        </div>
    </>
  );
}

export default Authentication;
