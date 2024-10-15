import { useState, useEffect } from 'react'
import axios from 'axios'
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import '../../styles/advert.css'


export function Home(){
 {/* const [data, setData] = useState([])
  useEffect(()=>{
    axios.get('/adverts')
    .then((res)=>{
      setData(res.data)
    })
    .catch((err)=>console.log(err))
  }, [])*/}



  return (
    <div>
      <header>
        <Banner />
        <SearchBar />
      </header>



      <div class="annonces border">  {/* les annonces */}
        <div class="adverts  border">  {/* toutes les annonces sur la gauhche*/}
        <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
            <button onclick="showDetails(1)">Learn More</button>
            </div>

          </div>

          <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
            <button onclick="showDetails(2)">Learn More</button>
            </div>

          </div>

          <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
              <button onclick="showDetails(3)">Learn More</button>
            </div>

          </div>



          <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
            <button onclick="showDetails(4)">Learn More</button>
            </div>

          </div>
          <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
            <button onclick="showDetails(5)">Learn More</button>
            </div>

          </div>
          <div class="advert border">
            <h3>Titre de l'offre</h3>
            <p>petite description de l'annonce mais genre un peu plus grand pour voir la taille que ça pourrait prendre sur la page pour se donner une idée un peu en gor sgenre </p>
            <div class="bouton">
            <button onclick="showDetails(6)">Learn More</button>
            </div>

          </div>
          {/*{
            data.map((advert)=>{
              return (
                <div class="advert border">
                  <h3>{advert.titre}</h3>
                  <p>{advert.description_p}</p>
                  <div class="bouton">
                    <button onclick="showDetails({advert.id})">Learn More</button>
                  </div>

                </div>
              )
            })
          }*/}
        </div> 
        {/*<script>
        elt=document.getElementById("annonce") ;
        titre=elt.getElementById("titre") ;
        description=elt.getElementById("description") ;

          function showDetails(num) {
            
            titre_2 = <h2>titre de l'annonce num</h2>;
            desc_2 = <p>plus grande description de l'annonce</p>;
            elt.replaceChild(titre2,titre);
            elt.replaceChild(desc_2,description);

        
          
          };
          showDetails(1);
        </script>*/}

        <div class="advert-displayed border" id="annonce"> {/* l'annonce séléctionnée à droite*/}
                 <h2 id="titre">titre de l'annonce num</h2>
                 <p id="description">plus grande description de l'annonce</p>
        </div>


   
      </div>
    </div>





  )
}
