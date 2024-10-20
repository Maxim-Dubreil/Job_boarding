import { useState, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import FormApply from '../../components/FormApply';
import Offer from "../../components/offer";
import Footer from '../../components/Footer';
import '../../styles/advert.css';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';


export function Home() {

//Apply form modal
    const [open, setOpen] = useState (false);
    const [formData, setFormData] = useState({
      nameCandidate:'',
      emailCandidate:'',
      phoneCandidate:'',
      messageCandidate:'',

    });

    const handleApply = () => setOpen(true);

    const handleClose = () => setOpen(false);

  //Chaque modif est maj
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    handleClose();
  }



  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [entreprise, setEntreprise] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});
  const [detail, setDetail] = useState(false); // gère quel partie du site est affiché à droite

  const [what, setWhat] = useState(''); // Search by title/keywords
  const [where, setWhere] = useState(''); // Search by location

  // Fetch job offers
  useEffect(() => {
    axios.get('http://localhost:5000/api/offres/')
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
    setDetail(true)
    setEntrepriseOffer(getEntrepriseById(filteredOffers[index].id_entreprise));
  };


  const showDetail = ()=>{
    setDetail(false)
  }

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

        <div className={`container-displayed ${detail? "hide":"flex"}`} id="annonce">
          {selectedOffer && (
            <Offer
              num={selectedOffer}
              entrepriseLieOffre={entrepriseOffer}
              apply={handleApply}
            />
          )}
        </div>
        <div className={`container-displayed ${detail? "flex":"hide"}`} id="annonce">
          {selectedOffer && (
            <FormApply
              num={selectedOffer}
            />
          )}
        </div>
          <Modal open={open} onClose={handleClose}>
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor:'#fff',
                  border: '1px solid #000',
                  borderRadius: '5px',
                  p: 4,
                }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontFamily: 'Open Sans, sans-serif', color : '#fc6eda', fontWeight:'bold'}}
              >
                To Apply
              </Typography>
              <TextField
                autoFocus
                required
                margin="dense"
                id="nameCandidate"
                name="nameCandidate"
                label="Name"
                type="text"
                fullWidth
                variant="standard"
                value={formData.nameCandidate}
                onChange={handleChange}


              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="emailCandidate"
                name="emailCandidate"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={formData.emailCandidate}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="phoneCandidate"
                name="phoneCandidate"
                label="Phone number"
                type="tel"
                fullWidth
                variant="standard"
                value={formData.phoneCandidate}
                onChange={handleChange}
              />
              <TextField
                margin="dense"
                id="messageCandidate"
                name="messageCandidate"
                label="Message"
                multiline
                rows={5}
                fullWidth
                variant="standard"
                value={formData.messageCandidate}
                onChange={handleChange}
              />
              <Button onClick={handleClose}
                sx={{
                  mt: 2,
                  color: '#FC6EDA'
                }}
              >
                Cancel
              </Button>
              <Button
                type = "submit"
                sx={{
                  mt: 2,
                  color: '#FC6EDA' }}
                >
                  Apply
                </Button>
              </Box>
            </Modal>
          </div>
      <Footer />
    </div>
  );
}
