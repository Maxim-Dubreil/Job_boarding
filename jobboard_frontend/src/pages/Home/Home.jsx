import { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import Offer from "../../components/offer"
import Footer from '../../components/Footer';
import '../../styles/advert.css';



export function Home(){
  const [id, setId] = useState(null);
  const [data, setData] = useState([])
  const [table, setTable] = useState([])
  const [entrepriseOffer, setEntrepriseOffer] = useState([])




  useEffect(()=>{
    axios.get('http://localhost:5000/api/offres/')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])


  const [entreprise, setEntreprise] = useState([])
              
  useEffect(()=>{
    axios.get(`http://localhost:5000/api/entreprises/`)
    .then((res)=>{
      setEntreprise(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])           






  const NomEntrepriseId = (IdEntre) => {
    const entrepriseData = entreprise.find(entre => entre.id === IdEntre);
    console.log(`iei renvoie ça ${entrepriseData ? entrepriseData.nom_entreprise : "Nom non trouvé"}`)
    return entrepriseData ? entrepriseData.nom_entreprise : "Nom non trouvé";
  }

  const getEntrepriseId = (IdEntre) => {
    const entrepriseData = entreprise.find(entre => entre.id === IdEntre);
    console.log(`iei renvoie ça ${entrepriseData ? entrepriseData : {}}`)
    return entrepriseData ? entrepriseData : {};
  }




  const learnMore = (key) => {
  
    setTable(data[key])
    setId(data[key].id);
    setEntrepriseOffer(getEntrepriseId(data[key].id))
  }




  return (
    <div>

      <Banner />
      <SearchBar />

      <div className="annonces ">  {/* les annonces */}
        <div className="adverts ">  {/* toutes les annonces sur la gauhche*/}
          {
          data.map((advert, index)=>{
              var num = advert.id
              console.log(entreprise)
              console.log(`index dans data.map : ${index}`)

              
              

              
              return (
                <div 
                className={`advert ${id === advert.id ? "rose" : "border"}`}
                id={num} 
                key={index}
                onClick={() => {learnMore(index)}}>
                  <div className='top left'>
                    <h3>{advert.titre}</h3>
                    <h4>{NomEntrepriseId(advert.id_entreprise)}</h4>  
                  </div>
                  <div className='top-right'>
                    <h5 className='info gris lieu'>{advert.region} {advert.lieu}</h5>
                    <h5 className='info gris'>{advert.type_emploi}</h5>
                    <h5 className='info bleu'>{advert.salaire} €</h5>
                    <h5 className='info gris'>{advert.heures_travail} </h5>
                  </div>
                  <p className='mid'>{advert.description_p}</p>
                  <div className="bottom">
                    <div className='bouton'>
                      <button variant="contained"  className='learnmore' > Learn More</button>
                    </div>
                  </div>

                </div>
              )
            })
}



      
      </div> 
        
        <div className='container-displayed' id="annonce">
            {id && <Offer num={table} entrepriseLieOffre={entrepriseOffer} />}
            
        </div>

        
           
      </div>
      <Footer />
    </div>
  
  )

}
