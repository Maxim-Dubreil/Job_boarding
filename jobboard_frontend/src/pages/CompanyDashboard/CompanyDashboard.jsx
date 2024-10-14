import BannerCompany from '../../components/BannerCompany';
import FooterCompany from '../../components/FooterCompany';
import Footer from '../../components/FooterCompany';

export function CompanyDashboard(){
    return (
      <div>
        <BannerCompany />

        {/* DIV en attendant qu'il est du contenu pour voir le rendu Footer Header*/}
        <div
          style={{
          height: '1000px',
          margin: '0 auto',             // Centre le bloc horizontalement
          backgroundColor: '#FFFFFF', // Couleur de fond pour le bloc
          padding: '20px',              // Espacement intérieur
          border: '1px solid #ccc'      // Bordure légère
          }}>
        </div>
        <FooterCompany/>
      </div>

    )
  }
