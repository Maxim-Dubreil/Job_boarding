import React from "react";
import axios from "axios";
import '../styles/advert.css';
import '../styles/companiesAdvert.css'




export default class Candidature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      detail: false,
    };
  }

  componentDidMount() {

    axios.get(`http://localhost:5000/api/candidatures/offre/${this.props.id}`)
      .then((res) => {
        this.setState({ data: res.data }); 
      })
      .catch((err) => console.log(err));
  }

    
 






    render() {
        const {data} = this.state; 


        return (
            
                data.map((advert, index) => (
                    
                    <div
                    className={`advert border `}
                    key={advert.id}
                    
                    >
                    <h3>{advert.message_candidature}</h3>
                    
                    </div>
                ))
            

            
        );
    }
}