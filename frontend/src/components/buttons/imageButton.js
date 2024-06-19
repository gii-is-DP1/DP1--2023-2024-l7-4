import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const ImageButton = ({ to, imgSrc, altText, className, style }) => {
    return (
        <Button outline color="success" className={className} style={style}>
            <Link to={to} style={{ textDecoration: "none", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={imgSrc} alt={altText} style={{ width: "100%", height: "100%" }} />
            </Link>
        </Button>
    );
}

export default ImageButton;
