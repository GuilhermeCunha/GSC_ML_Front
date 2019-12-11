import React from 'react';


function Footer(){
    return (
        <footer className="footer py-2">
    <div className="container">
        <div className="row text-center">
            <div className="col-6">
                <span className="iconify" data-icon="fa-whatsapp" data-inline="false" style={{color: "white"}}></span>
                <span className="text-muted">(71) 9 9271-1726</span>
            </div>
            <div className="col-6">
                <i id="footer-email-icon" className="fa fa-envelope" aria-hidden="true"></i>
                <span className="text-muted">gscdevelops@gmail.com</span>
            </div>
        </div>
        <div className="row  text-center">
            <div className="col-12">
                <span className="text-muted">@ 2019- GSC Develops</span>
            </div>
        </div>
    </div>
</footer>


    );
}
export default Footer;