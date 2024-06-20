import React from 'react';
import { Button } from 'reactstrap';
import '../../static/css/westernTheme.css'; // Asegúrate de tener tus estilos CSS de western theme importados aquí
import { Link, Navigate } from 'react-router-dom';


const CardButton = ({ className ,imgSrc}) => {
    return (
        <Button
            className= {className}
            style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: 'none',
                borderRadius: 0,
            }}
        />
    );
}

export default CardButton;