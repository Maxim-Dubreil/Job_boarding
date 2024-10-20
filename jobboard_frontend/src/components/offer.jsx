
import React from "react";
import axios from "axios";
import '../styles/advert.css';
import '../styles/advertright.css'
import { Button } from "@mui/material";

export default class Offer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render() {

        return (

            <div className='advert-displayed-border' id="annonce">
                <div className="bloc-name-button">
                    <div className="offer-titre">
                        <div className="top-left">
                            <h3 className="titre1">{this.props.num.titre}</h3>
                            <a className="nom-gros" href={this.props.entrepriseLieOffre.site_web} target="_blank">{this.props.entrepriseLieOffre.nom_entreprise}</a>
                        </div>
                    </div>

                    <div className="top-right-gros-bouton-apply">
                        <div className="offer-bouton">
                        <Button
                            variant="contained"
                            className='apply'
                            onClick={this.props.apply}
                            size="small"
                            sx={{
                                boxShadow: 'none',
                                fontSize: '20px',
                                fontFamily: 'Open_sans, sans-serif',
                                borderRadius: '15px',
                                textTransform: 'none',
                                backgroundColor: '#FC6EDA',
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: '#E056B3',
                                }
                            }}
                        >
                            Apply !
                        </Button>
                        </div>
                    </div>
                    </div>
                <div className="bloc-infos">
                    <div className="info-offer">
                        <h5 className="info-salaire">{this.props.num.salaire} € </h5>
                            <h5 className='info-gris'>{this.props.num.region} {this.props.num.lieu}</h5>
                            <h5 className='info-gris'>{this.props.num.type_emploi}</h5>
                            <h5 className='info-gris'>{this.props.num.heures_travail} </h5>
                        </div>
                </div>
                <div className="bloc-description">
                    <h2 className="titre-description">Description</h2>
                    <div className="description-gros">
                        {this.props.num.description}
                    </div>
                </div>
            </div>
        );
    }
}
