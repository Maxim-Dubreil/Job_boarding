import '../styles/advert.css'
import axios from "axios"
import logoBanner from '../assets/image/logoBanner.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
// const boutons =document.querySelectorAll(".learnmore")


// boutons.forEach(bouton => {
//     console.log(bouton);
//     console.log("oui");
//     bouton.addEventListener('click', ()=>{
//         if(bouton.classList.contains('active')){
//             return;
//         } else {
//             bouton.classList.add('active')
//         }
//         const index = bouton.getAttribute('data-id')
//         console.log(index)
//     })
// })




{/*function showDetails (num){
    const elt=document.getElementById("annonce") ;
    const titre=elt.getElementById("titre") ;
    const description=elt.getElementById("description") ;        
    const titre_2 = <h2>titre de l'annonce num</h2>;
    const desc_2 = <p>plus grande description de l'annonce</p>;
    elt.replaceChild(titre_2,titre);
    elt.replaceChild(desc_2,description);

}*/}

export default class App extends React.Component {
    state = {};


    componentDidMount(num) {
        this.setState(axios.get("/api/offres/" + num));
    }

    render(num){
        const date = axios.get()
        return (
            <h1></h1>
        )
    }







}
const learnMore = (num) => {
    const elt = document.querySelector(".advert-displayed");
    elt.replaceChild("<h2>{num}</h2>");
    console.log(elt)
}


