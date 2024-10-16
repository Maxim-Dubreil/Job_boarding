
import React from "react";
import axios from "axios";
import '../styles/advert.css';

export default class Offer extends React.Component {
    

    constructor(props) {
   
        
        super(props);
        this.state = {
            data: []
        };
    }




    render() {
        return (
            console.log("là ça return"),
            <div className='advert-displayed border' id="annonce">
            <h3>{this.props.num.titre}</h3>
            <p>{this.props.num.description}</p>
            </div>

            
        );
    }
}
