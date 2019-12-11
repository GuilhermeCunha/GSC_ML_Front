import React from 'react';

function Navbar() {
    var botaoRegistrar;
    var botaoGerenciar;
    if(localStorage.getItem("@email") === "gscdevelops@gmail.com"){
        botaoRegistrar = (
            <li className="nav-item active">
                <a className="nav-link" href="/register">Registrar <span className="sr-only">(Página atual)</span></a>
            </li>
            
        );
        botaoGerenciar = (
            <li className="nav-item active">
                <a className="nav-link" href="/users">Gerenciar <span className="sr-only">(Página atual)</span></a>
            </li>
        );
    }else{
        botaoRegistrar = "";
        botaoGerenciar = "";
    }
    
    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
            <a id="navbar-home" href="#"><i className="fa fa-home" aria-hidden="true"></i></a>
    
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Alterna navegação">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul id="navbar-buttons" className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/products">Home <span className="sr-only">(Página atual)</span></a>
                    </li>
                    
                   {botaoRegistrar}
                   {botaoGerenciar}
                    
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="fa fa-user" aria-hidden="true"></i></a>
                    </li>
                    <div className="dropdown">
                        <a id="dropdownMenuButton" className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false"><i className="fas fa-cog"></i></a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="/login">Logout</a>
                        </div>
                    </div>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;