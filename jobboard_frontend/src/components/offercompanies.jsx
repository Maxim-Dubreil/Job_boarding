import React from "react";
import axios from "axios";
import '../styles/advert.css';
import '../styles/companiesAdvert.css'


export default class Offer extends React.Component {
    
    
    constructor(props) {
   
        
        super(props);
        this.state = {
            data: []
        };
    }

    
 






    render() {
        

        return (
         
            <div className='advert-displayedC borderC' id="annonce">
                <div className="top-leftC">    
                    <h3 className="titreC">{this.props.num.titre}</h3>
                    <a className="nomC grosC" href={this.props.entrepriseLieOffre.site_web} target="_blank">{this.props.entrepriseLieOffre.nom_entreprise}</a>
                </div>
                
                <div className="top-right-grosC bouton-applyC">
                    
                   
                    
                    <h5 className="infoC bleuC">{this.props.num.salaire} € </h5>
                </div>
                <div className="midC">
                    <h5 className='infoC grisC lieuC'>{this.props.num.region} {this.props.num.lieu}</h5>
                    <h5 className='infoC grisC'>{this.props.num.type_emploi}</h5>
                    <h5 className='infoC grisC'>{this.props.num.heures_travail} </h5>
                </div>  
                <div className="descriptionC grosC">{this.props.num.description}                        
                </div>
            </div>
            

            
        );
    }
}