import React from 'react';
import '../App.css';
import '../static/css/home/home.css'; 
import logo from '../static/images/desembarco_del_rey.jpg';

export default function Home(){
    return(
        <div className="home-page-container">
            <div className="hero-div">
                <h1>LosMapasDelReino</h1>
                <h3>---</h3>
                <img src={logo}/>
                <h3>BIENVENIDO CONSTRUCTOR</h3>                
            </div>
        </div>
    );
}