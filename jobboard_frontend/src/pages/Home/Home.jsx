import { useState, useEffect } from 'react'
import Banner from '../../components/Banner';
import learnMore from '../../components/advert.jsx'
import SearchBar from '../../components/SearchBar';
import Footer from '../../components/Footer';
import '../../styles/advert.css'
import axios from 'axios';




export function Home(){
  const [id, setId] = useState(0);
 {/* const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('/adverts')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])*/}

  const HandleClick = (e)=>{
    console.log("salut")
  }

  return (
    <div>

      <Banner />
      <SearchBar />





      <div className="annonces border">  {/* les annonces */}
        <div className="adverts  border">  {/* toutes les annonces sur la gauhche*/}
        <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
            <button className="learnMore" data-id="1" onClick={() => learnMore("1")}>Learn More</button>
            </div>

          </div>

          <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
            <button className="learnMore" data-id="2" onClick={() => learnMore("2")}>Learn More</button>
            </div>

          </div>

          <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
              <button className="learnMore" data-id="3">Learn More</button>
            </div>

          </div>



          <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
            <button className="learnMore" data-id="4">Learn More</button>
            </div>

          </div>
          <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
               <button className="learnMore" data-id="5">Learn More</button>
            </div>

          </div>
          <div className="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div className="bouton">
            <button className="learnMore" data-id="6">Learn More</button>
            </div>

          </div>
          {/*
            data.map((advert)=>{
              return (
                <div class="advert border">
                  <h3>{advert.titre}</h3>
                  <p>{advert.description_p}</p>
                  <div class="bouton">
                    <button onClick={() => {setId(parseInt(advert.id,"10"));  (Id) => learnMore(Id)}}> Learn More</button>
                  </div>

                </div>
              )
            })
          }*/}
        </div>

        <div className="advert-displayed border" id="annonce"> {/* l'annonce séléctionnée à droite*/}
                 <h2 id="titre">titre de l'annonce num</h2>
                 <p id="description">plus grande description de l'annonce</p>
        </div>



      </div>

      <Footer />

    </div>





  )
}
