
import "../styles/loader.css"
import "../styles/animation.css"
import Container from 'react-bootstrap/Container';
import { useState, useEffect, useRef } from 'react';
import LoaderLogo from '../img/brandLogo.png';
import LoaderDescriptions from '../img/logoExt.png';

function Loader() { 
    return(
        <Container fluid className="loaderPage">
            <div className="loader">
                <img src={LoaderLogo} className="loaderLogo1" alt="Loader" />
                <img src={LoaderDescriptions} className="loaderLogo2" alt="Loader" />
            </div>
        </Container>            
    )
}


export default Loader;