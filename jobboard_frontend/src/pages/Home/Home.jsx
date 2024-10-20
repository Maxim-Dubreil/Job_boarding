import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Offer from "../../components/offer";
import Footer from '../../components/Footer';
import '../../styles/advert.css';
import Modal from '@mui/material/Modal';
import { Box, TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import { AuthContext } from '../../context/AuthContext3';

export function Home() {
  // Apply form modal
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nameCandidate: '',
    emailCandidate: '',
    phoneCandidate: '',
    messageCandidate: '',
  });
  const { user } = useContext(AuthContext); // Use context to verify logged-in user
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const handleApply = () => {
    // Autofill the form if the user is logged in
    if (user) {
      setFormData({
        nameCandidate: `${user.nom} ${user.prenom}`,
        emailCandidate: user.email,
        phoneCandidate: user.telephone || '',
        messageCandidate: '',
      });
    } else {
      setFormData({
        nameCandidate: '',
        emailCandidate: '',
        phoneCandidate: '',
        messageCandidate: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = user ? { Authorization: `Bearer ${user.token}` } : {};
      const response = await axios.post(
        'http://localhost:5000/api/candidatures',
        {
          id_offre: selectedOffer.id,
          id_utilisateur: user ? user.id : null, // User ID if logged in
          nom: formData.nameCandidate,
          email: formData.emailCandidate,
          telephone: formData.phoneCandidate,
          message_candidature: formData.messageCandidate,
        },
        { headers }
      );
      console.log('Candidature créée avec succès:', response.data);
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la création de la candidature:', error);
    }
  };

  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [entreprise, setEntreprise] = useState([]);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});
  const [detail, setDetail] = useState(false);

  const [what, setWhat] = useState(''); // Search by title/keywords
  const [where, setWhere] = useState(''); // Search by location

  // Fetch job offers
  useEffect(() => {
    axios.get('http://localhost:5000/api/offres/')
      .then((res) => {
        setOffers(res.data);
        setFilteredOffers(res.data);
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
    setDetail(true);
    setEntrepriseOffer(getEntrepriseById(filteredOffers[index].id_entreprise));
  };

  const showDetail = () => {
    setDetail(false);
  };

  // Handle search input changes
  const handleSearch = () => {
    const filtered = offers.filter((offer) => {
      const matchesWhat = (offer.titre && offer.titre.toLowerCase().includes(what.toLowerCase())) ||
        (offer.mots_cles && offer.mots_cles.toLowerCase().includes(what.toLowerCase()));
      const matchesWhere = (offer.lieu && offer.lieu.toLowerCase().includes(where.toLowerCase())) ||
        (offer.region && offer.region.toLowerCase().includes(where.toLowerCase()));
      return matchesWhat && matchesWhere;
    });
    setFilteredOffers(filtered);
  };
  
  return (
    <div className='home-body'>
      <Banner />
      <SearchBar
        what={what}
        setWhat={setWhat}
        where={where}
        setWhere={setWhere}
        handleSearch={handleSearch}
      />

      <div className="home-content">
        <div className="home-annonces">
          <div className="home-adverts">
            {filteredOffers.map((advert, index) => (
              <div
                className={`home-advert ${selectedOffer?.id === advert.id ? "selected-offer" : "unselected-offer"}`}
                key={advert.id}
              >
                <div className='block-tittle-keyword'>
                  <div className='title-advert'>
                    <h2 className='job-name'>{advert.titre}</h2>
                    <h3 className="name-entreprise">{NomEntrepriseId(advert.id_entreprise)}</h3>
                  </div>
                  <div className='keyword-content'>
                    <p className='info'>{advert.region} {advert.lieu}</p>
                    <p className='info'>{advert.type_emploi}</p>
                    <p className='info'>{advert.salaire} €</p>
                    <p className='info-heuretravail'>{advert.heures_travail}</p>
                  </div>
                </div>
                <div className="home-bottom">
                  <div className='home-bouton'>
                    <Button
                      variant="contained"
                      className='learnmore'
                      onClick={() => learnMore(index)}  // "Learn More" button to show more details
                      size="small"
                      sx={{
                        p: '5px',
                        boxShadow: 'none',
                        fontSize: '12px',
                        fontFamily: 'Open_sans, sans-serif',
                        borderRadius: '10px',
                        textTransform: 'none',
                        backgroundColor: '#FC6EDA',
                        fontWeight: 'bold',
                        '&:hover': {
                          boxShadow: 'none',
                          backgroundColor: '#E056B3',
                        }
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed View */}
          <div className={`container-displayed ${detail ? "flex" : "hide"}`} id="annonce">
            {selectedOffer && (
              <Offer
                num={selectedOffer}
                entrepriseLieOffre={entrepriseOffer}
                apply={handleApply}
              />
            )}
          </div>

          {/* Apply Modal */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: '#fff',
                border: '1px solid #000',
                borderRadius: '5px',
                p: 4,
              }}>
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{ fontFamily: 'Open Sans, sans-serif', color: '#fc6eda', fontWeight: 'bold' }}
              >
                To Apply for: {selectedOffer?.titre}
              </Typography>
              <form onSubmit={handleSubmit}>
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
                  type="submit"
                  sx={{
                    mt: 2,
                    color: '#FC6EDA'
                  }}
                >
                  Apply
                </Button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>

      <Footer />
    </div>
  );
}
