import React from 'react';
import { Button } from 'reactstrap';
import '../../static/css/westernTheme.css'; // Asegúrate de tener tus estilos CSS de western theme importados aquí
import { Link, Navigate } from 'react-router-dom';


const ImageButton = ({ imgSrc, altText }) => {
    return (
        <Button
            className="button-container"
            style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '50px',
                height: '50px',
                border: 'none', // Ajusta o elimina el borde si es necesario
                padding: 0, // Ajusta el padding según sea necesario
                transition: 'transform 0.2s ease-in-out' // Transición suave para el efecto de agrandamiento
            }}
        >
            <Link to="/match/create" style={{ textDecoration: 'none', width: '100%', height: '100%', display: 'block' }}>
                <span className="sr-only">{altText}</span>
            </Link>
        </Button>
    );
}

export default ImageButton;