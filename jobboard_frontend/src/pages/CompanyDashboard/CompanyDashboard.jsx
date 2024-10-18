import { useState, useEffect } from 'react';
import axios from 'axios';
import BannerCompany from '../../components/BannerCompany';
import FooterCompany from '../../components/FooterCompany';
import Candidature from '../../components/Candidature';
import Offer from "../../components/offercompanies";
import '../../styles/companiesAdvert.css';
import Footer from '../../components/FooterCompany';

export function CompanyDashboard(){

  const [offers, setOffers] = useState([]);
  const [shown, setShown] = useState(true);
  const [detail, setDetail] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState(null);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});
  const [entreprise, setEntreprise] = useState([]);



  const id = 1; // récupérer l'id de l'entreprise de l'utilisateur en cours 





  // récupère les annonces de l'entreprise 
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
    setDetail(true)
    setEntrepriseOffer(getEntrepriseById(offers[index].id_entreprise));
  };

  // choisi quelle partie du site est montré entre le détail de l'offre et les réponses à l'offre
  const showDetail = ()=>{
    setDetail(false)
  }

  // Get the company name from the company ID
  const NomEntrepriseId = (IdEntre) => {
    const entrepriseData = entreprise.find((entre) => entre.id === IdEntre);
    return entrepriseData ? entrepriseData.nom_entreprise : "Nom non trouvé";
  };

  // Get full company data by ID
  const getEntrepriseById = (IdEntre) => {
    return entreprise.find((entre) => entre.id === IdEntre) || {};
  };



  // Hide or not the offers
  const hide = () => {
    shown === true? setShown(false):setShown(true)
  }





  return (
    <div>
      <BannerCompany />

      <div className='bouton cacher flex'>
        <button onClick={hide} className='learnmore'>Hide all offers</button>
      </div>
      <div className={`annonces ${shown===true ? "flex": "hide"}`}
      >
        <div className="adverts">
          {offers.map((advert, index) => (
            <div
              className={`advert ${selectedOffer?.id === advert.id ? "rose" : "border"} `}
              key={advert.id}
              
            >
              <div className='top'>
                <h3>{advert.titre}</h3>
                
              </div>
              <div className='mid'>
                <h5 className='info gris lieu'>{advert.region} {advert.lieu}</h5>
                <h5 className='info gris'>{advert.type_emploi}</h5>
              </div>
              <div className='mid'>
                <h5 className='info bleu'>{advert.salaire} €</h5>
                <h5 className='info gris'>{advert.heures_travail}</h5>
              </div>
              <p className='mid'>{advert.description_p}</p>
              <div className="bottom">
                <div className='bouton'>
                  <button variant="contained" className='learnmore' onClick={() => learnMore(index)}> View More</button>
                  <button className='view' onClick={showDetail}>show candidacy</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`container-displayed ${detail? "flex":"hide"}`} id="annonce">
          {selectedOffer && (
            <Offer 
              num={selectedOffer}
              entrepriseLieOffre={entrepriseOffer}
            />
          )}
        </div>
        <div className={`container-displayed ${detail? "hide":"flex"}`}>
       
          <div className="advert-displayed border local">{selectedOffer && (
            <Candidature id={selectedOffer.id}
            />
          )}
          </div>
       
        </div>
      </div>



      
      <FooterCompany/>
    </div>

  )
  }


