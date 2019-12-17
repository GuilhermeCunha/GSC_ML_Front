import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import api from '../../services/api'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Navbar from '../Navbar'
import Footer from '../Footer'
import { EMAIL_KEY, TOKEN_KEY, ID_KEY } from "../../services/auth";

//_Layout CSS
import '.././res/css/_layout.css'
import './index.css'

function Login() {

    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [item_id, setItem_id] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleEditSubmit(event){
        event.preventDefault();
        console.log(title);
        console.log(item_id);
        console.log(message)

        await api.post('/products/edit', {
            email: localStorage.getItem(EMAIL_KEY),
            item_id,
            message,
            title,
        }, {
            headers: {
                'x-access-token': localStorage.getItem(TOKEN_KEY),
            }
        }).then(function (result) {
            console.log("Editado");
            console.log(result);
        }).catch(e => {
            console.log(e);
        })
        window.location.reload();

    }
    async function handleRemoveSubmit(event) {
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
            await api.post('/products', {
                token: localStorage.getItem("@token"),
            }, {}).then(function (result) {
                setProducts(result.data);
                //console.log(result);
            }).catch(e => {
                console.log(e);
            })
        }

        async function verifyOrRefreshMLToken() {
            var tokenIsValid = await api.post('/verify-or-refresh-ml-token', {
                email: localStorage.getItem("@email"),
            }, {
                headers: {
                    'x-access-token': localStorage.getItem("@token")
                }
            }).then(function (result) {
                return result.data.tokenIsValid;
            }).catch(e => {
                console.log(e);
            });
            if (tokenIsValid) {
                loadProducts();
            } else {
                console.log("Algum erro aconteceu na verificação ou refresh do token!");
            }

        }
        verifyOrRefreshMLToken();
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
            <Navbar />
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
                            <th>Titulo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} >
                                <td><img src={product.thumbnail} alt="Thumbnail do Anúncio"/></td>
                                <td>{product.title}</td>
                                <td>
                                    <i id="visualizar-icon" className="fa fa-search"
                                        aria-hidden="true"
                                        data-toggle="modal" data-target="#modal-visualizar"
                                        onClick={() => {
                                            console.log(product.message)
                                            setMessage(product.message)
                                        }
                                        }></i>
                                    <i id="edit-icon" className="fa fa-edit"
                                        aria-hidden="true"
                                        data-toggle="modal" data-target="#modal-editar"
                                        onClick={() => {
                                            setItem_id(product.item_id);
                                            setMessage(product.message);
                                            setTitle(product.title);
                                        }
                                        }></i>
                                
                                    <i id="remove-icon" className="fa fa-trash"
                                    aria-hidden="true"
                                    data-toggle="modal" data-target="#modal-remove"
                                    onClick={() => {
                                        console.log("Clicou")
                                        setItem_id(product.item_id)
                                        }}></i></td>
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
            <Footer/>
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
                                    placeholder="MLB1353694658"
                                    onChange={event => setItem_id(event.target.value)} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group text-center">
                                    <label htmlFor="message">Mensagem pós venda</label>
                                    <textarea id="message"
                                        className="form-control"
                                        rows="4"
                                        placeholder="<strong>Muito obrigado pela compra!</strong>"
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


            <div id="modal-visualizar" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="col-12 text-center">
                                <h4>Visualizar Mensagem</h4>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="row">
                                    {/* A JSX comment 
                                    <div className="col-12 text-center">
                                        <textarea defaultValue= {message} type="text" rows="20" cols = "100" readOnly></textarea>
                                    </div>
                                    */}
                                    <div  dangerouslySetInnerHTML={{__html: message}} />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="modal-editar" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="col-12 text-center">
                                <h4>Editar Produto Digital</h4>
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Fechar">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                            <form>
                            <div className="row text-center">
                                    <div className="col-12">
                                        <label htmlFor="Titulo">Titulo</label>
                                        <input type="text"
                                            className="form-control"
                                            defaultValue= {title}
                                            onChange={event => setTitle(event.target.value)} />
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-12">
                                        <label htmlFor="ID do Anúncio">ID do Anúncio</label>
                                        <input type="text"
                                            className="form-control"
                                            defaultValue= {item_id}
                                            onChange={event => setItem_id(event.target.value)} 
                                            readOnly/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group text-center">
                                            <label htmlFor="message">Mensagem pós venda</label>
                                            <textarea id="message"
                                                className="form-control"
                                                rows="4"
                                                defaultValue= {message}
                                                onChange={event => setMessage(event.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>

                            </form>
                               
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-success" onClick={handleEditSubmit}> Editar</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
}

export default Login;
