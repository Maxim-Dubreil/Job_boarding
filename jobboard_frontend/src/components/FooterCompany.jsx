import CopyrightIcon from '@mui/icons-material/Copyright';
import '../styles/FooterCompany.css';

function footerCompany () {
    return(
        <footer className="footerCompany">
            <div className="footer-content">
                <p className='copyrightcompany'>
                    <CopyrightIcon fontSize="small" /> {new Date().getFullYear()} Mon Application. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};


export default footerCompany