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

  const learnMore = (idoffre) => {
    console.log(idoffre);
    setId(data[idoffre -1]);
    console.log(id);
  }


  useEffect(()=>{
    axios.get('http://localhost:5000/api/offres/')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])

  const HandleClick = (e)=>{
    console.log("salut")
  }

  return (
    <div>

      <Banner />
      <SearchBar />

      <div className="annonces border">  {/* les annonces */}
        <div className="adverts  border">  {/* toutes les annonces sur la gauhche*/}
          {
          data.map((advert, index)=>{
              return (
                <div class="advert border" key={index}>
                  <h3>{advert.titre}</h3>
                  <p>{advert.description_p}</p>
                  <div class="bouton">
                    <button onClick={() => {setId(parseInt(advert.id,"10"));  learnMore(advert.id)}}> Learn More</button>
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
            {id && <Offer num={id} />}
            
        </div>




   
      </div>
 
      <Footer />
  
    </div>





  )
}
