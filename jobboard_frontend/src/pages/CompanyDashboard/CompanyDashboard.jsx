import { useState, useEffect } from 'react';
import axios from 'axios';
import BannerCompany from '../../components/BannerCompany';
import FooterCompany from '../../components/FooterCompany';
import Offer from "../../components/offer";
import '../../styles/companiesAdvert.css';
import Footer from '../../components/FooterCompany';

export function CompanyDashboard(){

  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});
  const [entreprise, setEntreprise] = useState([]);
  const id = 1;






  useEffect(() => {
    axios.get(`http://localhost:5000/api/offres/entreprise/${id}`)
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  // Handle "Learn More" click
  const learnMore = (index) => {
    setSelectedOffer(offers[index]);
    setEntrepriseOffer(getEntrepriseById(offers[index].id_entreprise));
  };

  // Get the company name from the company ID
  const NomEntrepriseId = (IdEntre) => {
    const entrepriseData = entreprise.find((entre) => entre.id === IdEntre);
    return entrepriseData ? entrepriseData.nom_entreprise : "Nom non trouvé";
  };

  // Get full company data by ID
  const getEntrepriseById = (IdEntre) => {
    return entreprise.find((entre) => entre.id === IdEntre) || {};
  };




  return (
    <div>
      <BannerCompany />


      <div className="annonces">
        <div className="adverts">
          {offers.map((advert, index) => (
            <div
              className={`advert ${selectedOffer?.id === advert.id ? "rose" : "border"}`}
              key={advert.id}
              onClick={() => learnMore(index)}
            >
              <div className='top left'>
                <h3>{advert.titre}</h3>
                <h4>{NomEntrepriseId(advert.id_entreprise)}</h4>
              </div>
              <div className='top-right'>
                <h5 className='info gris lieu'>{advert.region} {advert.lieu}</h5>
                <h5 className='info gris'>{advert.type_emploi}</h5>
                <h5 className='info bleu'>{advert.salaire} €</h5>
                <h5 className='info gris'>{advert.heures_travail}</h5>
              </div>
              <p className='mid'>{advert.description_p}</p>
              <div className="bottom">
                <div className='bouton'>
                  <button variant="contained" className='learnmore'> View More</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='container-displayed' id="annonce">
          {selectedOffer && (
            <Offer 
              num={selectedOffer}
              entrepriseLieOffre={entrepriseOffer}
            />
          )}
        </div>
      </div>

      {/* DIV en attendant qu'il est du contenu pour voir le rendu Footer Header*/}
      <div
        style={{
        height: '1000px',
        margin: '0 auto',             // Centre le bloc horizontalement
        backgroundColor: '#FFFFFF', // Couleur de fond pour le bloc
        padding: '20px',              // Espacement intérieur
        border: '1px solid #ccc'      // Bordure légère
        }}>
      </div>
      <FooterCompany/>
    </div>

  )
  }
