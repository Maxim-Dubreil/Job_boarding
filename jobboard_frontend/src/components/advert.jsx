import '../styles/advert.css'
import logoBanner from '../assets/image/logoBanner.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


function showDetails (num){
    const elt=document.getElementById("annonce") ;
    const titre=elt.getElementById("titre") ;
    const description=elt.getElementById("description") ;        
    const titre_2 = <h2>titre de l'annonce num</h2>;
    const desc_2 = <p>plus grande description de l'annonce</p>;
    elt.replaceChild(titre_2,titre);
    elt.replaceChild(desc_2,description);

}

export default showDetails