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

  const learnMore = (key) => {
    console.log(data[key].id);
    setTable(data[key])
    setId(data[key].id);
 
  }




  return (
    <div>

      <Banner />
      <SearchBar />

      <div className="annonces border">  {/* les annonces */}
        <div className="adverts border">  {/* toutes les annonces sur la gauhche*/}
          {
          data.map((advert, index)=>{
              var num = advert.id
              
              

              
              return (
                <div 
                className={`advert ${id === advert.id ? "rose" : "border"}`}
                id={num} 
                key={index}>
                  <h3>{advert.titre}</h3>
                  <h4>{entreprise[index].nom_entreprise}</h4>  
                  <p>{advert.description_p}</p>
                  <div className="bouton">
                    <button onClick={() => {learnMore(index)}}> Learn More</button>
                  </div>

                </div>
              )
            })
}
        <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
            <button className="learnMore" data-id="1" onClick={() => learnMore("1")}>Learn More</button>
            </div> 

            

        </div>


      
      </div> 
        
        <div className='advert-displayed border' id="annonce">
            {id && <Offer num={table} />}
            
        </div>

        
           
      </div>
      <Footer />
    </div>
  
  )

}
