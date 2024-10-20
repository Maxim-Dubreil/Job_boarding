import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import BannerCompany from '../../components/BannerCompany';
import FooterCompany from '../../components/FooterCompany';
import Candidature from '../../components/Candidature';
import Offer from '../../components/offercompanies';
import '../../styles/companiesAdvert.css';
import { AuthContext } from '../../context/AuthContext3';
import { Box, TextField, Button, Modal } from '@mui/material';

export function CompanyDashboard() {
  const { user } = useContext(AuthContext);
  const [offers, setOffers] = useState([]);
  const [shown, setShown] = useState(true);
  const [detail, setDetail] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [entrepriseOffer, setEntrepriseOffer] = useState({});
  const [entreprise, setEntreprise] = useState([]);
  const [open, setOpen] = useState(false);
  const [candidacies, setCandidacies] = useState([]);
  const [offerFormData, setOfferFormData] = useState({
    titre: '',
    region: '',
    lieu: '',
    type_emploi: '',
    salaire: '',
    heures_travail: '',
    description: '',
    description_p: ''
  });

  const id = user?.id_entreprise; // Get the company ID from the logged-in user

  // Fetch job offers of the logged-in user's company
  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/offres/entreprise/${id}`)
        .then((res) => {
          setOffers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  // Handle "Learn More" click
  const learnMore = (index) => {
    setSelectedOffer(offers[index]);
    setDetail(true);
    setEntrepriseOffer(getEntrepriseById(offers[index].id_entreprise));
  };

  // Fetch candidacies for the selected offer
  const showCandidacies = async (offerId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/candidatures/offre/${offerId}`);
      setCandidacies(response.data);
      setDetail(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures :', error);
    }
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

  // Hide or show the offers
  const hide = () => {
    shown === true ? setShown(false) : setShown(true);
  }

  // Handle form changes
  const handleChange = (e) => {
    setOfferFormData({ ...offerFormData, [e.target.name]: e.target.value });
  };

  // Handle form submission for creating or updating an offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedOffer) {
        // Update existing offer
        await axios.put(`http://localhost:5000/api/offres/${selectedOffer.id}`, offerFormData);
      } else {
        // Create new offer
        await axios.post('http://localhost:5000/api/offres', { ...offerFormData, id_entreprise: id });
      }
      setOpen(false);
      // Refresh offers
      axios.get(`http://localhost:5000/api/offres/entreprise/${id}`)
        .then((res) => {
          setOffers(res.data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Erreur lors de la création/mise à jour de l'offre:", error);
    }
  };

  // Open modal for creating a new offer
  const handleOpenCreate = () => {
    setSelectedOffer(null);
    setOfferFormData({
      titre: '',
      region: '',
      lieu: '',
      type_emploi: '',
      salaire: '',
      heures_travail: '',
      description: '',
      description_p: ''
    });
    setOpen(true);
  };

  // Open modal for editing an existing offer
  const handleOpenEdit = (offer) => {
    setSelectedOffer(offer);
    setOfferFormData({
      titre: offer.titre,
      region: offer.region,
      lieu: offer.lieu,
      type_emploi: offer.type_emploi,
      salaire: offer.salaire,
      heures_travail: offer.heures_travail,
      description: offer.description,
      description_p: offer.description_p
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div className='company-page'>
      <BannerCompany />
      <div className='company-bouton'>
        <div className='boutonC cacherC flexC'>
          <Button
           type="submit"
           variant="contained"
           color="primary"
           sx={{
                mt: '40px',
                marginRight: '10px',
               borderRadius: '10px',
               backgroundColor: '#FC6EDA',
               fontSize:'14px',
               height:'35px',
               fontFamily: 'Open_sans, sans-serif',
               boxShadow:'none',
                   '&:hover': {
                       boxShadow: 'none',
                       backgroundColor: '#fff',
                       color: '#FC6EDA',
                       border: '1px solid #FC6EDA',
               }
            }}
            onClick={hide}
          >
            Hide all offers
          </Button>
          <Button
           type="submit"
           variant="contained"
           color="primary"
           sx={{
              mt: '40px',
              marginLeft: '25px',
               borderRadius: '10px',
               height:'35px',
               backgroundColor: '#FC6EDA',
               fontSize:'14px',
               fontFamily: 'Open_sans, sans-serif',
                boxShadow:'none',
                   '&:hover': {
                       boxShadow: 'none',
                       backgroundColor: '#fff',
                       color: '#FC6EDA',
                       border: '1px solid #FC6EDA',
               }
            }}
            onClick={handleOpenCreate}
          >
            Create New Offer
          </Button>
        </div>
      </div>
      <div className={`annoncesC ${shown === true ? "flexC" : "hideC"}`}
      >
        <div className="advertsC">
          {offers.map((advert, index) => (
            <div
              className={`advertC ${selectedOffer?.id === advert.id ? "roseC" : "borderC"} `}
              key={advert.id}
            >
              <div className='topC'>
                <h3>{advert.titre}</h3>
              </div>
              <div className='midC'>
                <h5 className='infoC grisC lieuC'>{advert.region} {advert.lieu}</h5>
                <h5 className='infoC grisC'>{advert.type_emploi}</h5>
              </div>
              <div className='midC'>
                <h5 className='infoC bleuC'>{advert.salaire} €</h5>
                <h5 className='infoC grisC'>{advert.heures_travail}</h5>
              </div>
              <p className='midC'>{advert.description_p}</p>
              <div className="bottomC">
                <div className='boutonC'>
                  <button variant="contained" className='learnmoreC' onClick={() => learnMore(index)}> View More</button>
                  <button className='viewC' onClick={() => showCandidacies(advert.id)}>show candidacy</button>
                  <button className='editC' onClick={() => handleOpenEdit(advert)}>Edit Offer</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`container-displayedC ${detail ? "flexC" : "hideC"}`} id="annonce">
          {selectedOffer && (
            <Offer
              num={selectedOffer}
              entrepriseLieOffre={entrepriseOffer}
            />
          )}
        </div>
        <div className={`container-displayedC ${detail ? "hideC" : "flexC"}`}>
          <div className="advert-displayedC borderC localC">
            {candidacies.length > 0 ? (
              candidacies.map((candidacy, index) => (
                <div key={index} className="candidature-cardC">
                  <h4>Nom: {candidacy.nom} {candidacy.prenom}</h4>
                  <p>Email: {candidacy.email}</p>
                  <p>Téléphone: {candidacy.telephone}</p>
                  <p>Message: {candidacy.message_candidature}</p>
                </div>
              ))
            ) : (
              <p>Aucune candidature pour cette offre d'emploi.</p>
            )}
          </div>
        </div>
      </div>

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
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="titre"
              name="titre"
              label="Title"
              type="text"
              fullWidth
              variant="standard"
              value={offerFormData.titre}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="region"
              name="region"
              label="Region"
              type="text"
              fullWidth
              variant="standard"
              value={offerFormData.region}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="lieu"
              name="lieu"
              label="Location"
              type="text"
              fullWidth
              variant="standard"
              value={offerFormData.lieu}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="type_emploi"
              name="type_emploi"
              label="Job Type"
              type="text"
              fullWidth
              variant="standard"
              value={offerFormData.type_emploi}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="salaire"
              name="salaire"
              label="Salary"
              type="number"
              fullWidth
              variant="standard"
              value={offerFormData.salaire}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="heures_travail"
              name="heures_travail"
              label="Working Hours"
              type="text"
              fullWidth
              variant="standard"
              value={offerFormData.heures_travail}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              fullWidth
              variant="standard"
              value={offerFormData.description}
              onChange={handleChange}
            />
            <TextField
              required
              margin="dense"
              id="description_p"
              name="description_p"
              label="Short Description"
              multiline
              rows={2}
              fullWidth
              variant="standard"
              value={offerFormData.description_p}
              onChange={handleChange}
            />
            <Button onClick={handleClose} sx={{ mt: 2, color: '#FC6EDA' }}>Cancel</Button>
            <Button type="submit" sx={{ mt: 2, color: '#FC6EDA' }}>{selectedOffer ? 'Update' : 'Create'}</Button>
          </form>
        </Box>
      </Modal>

      <FooterCompany />
    </div>
  )
}
