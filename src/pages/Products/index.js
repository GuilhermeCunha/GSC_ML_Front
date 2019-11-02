import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import api from '../../services/api'
import Editable from 'react-x-editable';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


//_Layout CSS
import '.././res/css/_layout.css'
import './index.css'

function Login() {
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [item_id, setItem_id] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function handleRemoveSubmit(event){
        console.log(item_id);
        
        await api.post('/products/remove', {
            email: localStorage.getItem('@email'),
            item_id,
        }, {
            headers: {
                'x-access-token': localStorage.getItem('@token'),
            }
        }).then(function (result) {
            console.log("Removido");
            console.log(result);
        }).catch(e => {
            console.log(e);
        })
        window.location.reload();
    }

    async function handleRegisterSubmit(event) {
        await api.post('/products/register', {
            email: localStorage.getItem('@email'),
            item_id,
            message,
        }, {
            headers: {
                'x-access-token': localStorage.getItem('@token'),
            }
        }).then(function (result) {
            console.log("Cadastrado");
            console.log(result);
        }).catch(e => {
            console.log(e);
        })
        console.log("submit");
        console.log(item_id);
        console.log(message);
        handleClose();
        window.location.reload();
    }

    useEffect(() => {
        async function loadProducts() {
            const response = await api.post('/products', {
                token: localStorage.getItem("@token"),
            }, {}).then(function (result) {
                setProducts(result.data);
                console.log(result);
            }).catch(e => {
                console.log(e);
            })
        }
        loadProducts();
    }, []);
    /*
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function handleRegisterSubmit(event) {
    event.preventDefault();

    const response = await api.post('/login', {
      email: email,
      password: password
    });
    console.log(response);
    console.log("Clicou");
  }*/

    return (
        <>

            <div className="container">
                <div className="row">
                    <h1>Produtos Digitais</h1>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-10">

                    </div>
                    <div id="add-icon" className="col-2">
                        <i onClick={handleShow} className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                    </div>
                </div>
            </div>


            <div className="container">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ID do Anúncio</th>
                            <th>messagem</th>
                            <th>Opções</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} >
                                <td>{product._id}</td>
                                <td>{product.item_id}</td>
                                <td>{product.message}</td>
                                <td>b</td>
                                <td><i id ="remove-icon" class="fa fa-trash" 
                                aria-hidden="true"
                                data-toggle="modal" data-target="#modal-remove"
                                onClick={() => setItem_id(product.item_id)}></i></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

<div className="modal fade" id="modal-remove" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <div className="col-12 text-center">
            <h4>Remover Produto Digital</h4>
        </div>
        <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          <div className="container">
              <div className="row">
                  <div className="col-12 text-center">
                      <span>Você tem certeza que gostaria de removê-lo?</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={handleRemoveSubmit}> Remover</button>
      </div>
    </div>
  </div>
</div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <div className="col-12 text-center">
                        <h4>Registrar Produto Digital</h4>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="row text-center">
                            <div className="col-12">
                                <label htmlFor="ID do Anúncio">ID do Anúncio</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="MB12345678"
                                    value={item_id}
                                    onChange={event => setItem_id(event.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group text-center">
                                    <label htmlFor="message">message pós venda</label>
                                    <textarea id="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="<strong>Muito obrigado pela compra!</strong>"
                                        value={message}
                                        onChange={event => setMessage(event.target.value)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <button type="submit" className="btn btn-success" onClick={handleRegisterSubmit} >Registrar</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Login;
