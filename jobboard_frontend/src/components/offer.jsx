
import React from "react";
import axios from "axios";
import '../styles/advert.css';
import '../styles/advertright.css'

export default class Offer extends React.Component {
    

    constructor(props) {
   
        
        super(props);
        this.state = {
            data: []
        };
    }




    render() {
        console.log(this.props.num.description)
        return (
            console.log("là ça return"),
            <div className='advert-displayed border' id="annonce">
                <div className="top-left">    
                    <h3 className="titre">{this.props.num.titre}</h3>
                    <a className="nom gros" href={this.props.entrepriseLieOffre.site_web} target="_blank">{this.props.entrepriseLieOffre.nom_entreprise}</a>
                </div>
                
                <div className="top-right-gros bouton-apply">
                    <button variant="contained"  className='apply' > Apply !</button>
                    <h5 className="info bleu">{this.props.num.salaire} € </h5>
                </div>
                <div className="mid">
                    <h5 className='info gris lieu'>{this.props.num.region} {this.props.num.lieu}</h5>
                    <h5 className='info gris'>{this.props.num.type_emploi}</h5>
                    <h5 className='info gris'>{this.props.num.heures_travail} </h5>
                </div>  
                <div className="description gros">{this.props.num.description}                        
                </div>
            </div>
            

            
        );
    }
}
