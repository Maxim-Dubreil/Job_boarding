import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Offer from "../../components/offer";
import Footer from '../../components/Footer';
import '../../styles/advert.css';

export function Home() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [entreprise, setEntreprise] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});

  const [what, setWhat] = useState(''); // Search by title/keywords
  const [where, setWhere] = useState(''); // Search by location

  // Fetch job offers
  useEffect(() => {
    axios.get('http://localhost:5000/api/offres/entreprise/2')
      .then((res) => {
        setOffers(res.data);
        setFilteredOffers(res.data); // Initially, all offers are shown
      })
      .catch((err) => console.log(err));
  }, []);

  // Fetch companies
  useEffect(() => {
    axios.get('http://localhost:5000/api/entreprises/')
      .then((res) => {
        setEntreprise(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get the company name from the company ID
  const NomEntrepriseId = (IdEntre) => {
    const entrepriseData = entreprise.find((entre) => entre.id === IdEntre);
    return entrepriseData ? entrepriseData.nom_entreprise : "Nom non trouvé";
  };

  // Get full company data by ID
  const getEntrepriseById = (IdEntre) => {
    return entreprise.find((entre) => entre.id === IdEntre) || {};
  };

  // Handle "Learn More" click
  const learnMore = (index) => {
    setSelectedOffer(filteredOffers[index]);
    setEntrepriseOffer(getEntrepriseById(filteredOffers[index].id_entreprise));
  };

  // Handle search input changes
  const handleSearch = () => {
    const filtered = offers.filter((offer) => {
      const matchesWhat = offer.titre.toLowerCase().includes(what.toLowerCase()) ||
        offer.mots_cles.toLowerCase().includes(what.toLowerCase());
      const matchesWhere = offer.lieu.toLowerCase().includes(where.toLowerCase()) ||
        offer.region.toLowerCase().includes(where.toLowerCase());
      return matchesWhat && matchesWhere;
    });
    setFilteredOffers(filtered);
  };

  return (
    <div>
      <Banner />
      <SearchBar 
        what={what} 
        setWhat={setWhat} 
        where={where} 
        setWhere={setWhere} 
        handleSearch={handleSearch} 
      />

      <div className="annonces">
        <div className="adverts">
          {filteredOffers.map((advert, index) => (
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
                  <button variant="contained" className='learnmore'> Learn More</button>
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

      <Footer />
    </div>
  );
}
