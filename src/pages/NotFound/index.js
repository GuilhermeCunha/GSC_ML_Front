import React from 'react';
import { isAuthenticated } from "../../services/auth";


function NotFound({history}) {
    function startTimer(duration, display) {
        var timer = duration, minutes, seconds;
        var end =setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                if(isAuthenticated()){
                    history.push('/products');
                }else{
                    history.push('/login');
                }
                
                clearInterval(end);
            }
        }, 1000);
    }
    
    window.onload = function () {
        var fiveMinutes = 5,
        display = document.querySelector('#time');
        startTimer(fiveMinutes, display);
    };
    return (
        <>
        <div className="container text-center">
            <h1>Página não encontrada</h1>
            <br/>
            <br/>
            <br/>
            <h2>Redirecionando em <span id="time">00:05</span></h2>
            <form id="form1" runat="server"></form>
        </div>
        
        
        </>
    );
}
export default NotFound;