import CopyrightIcon from '@mui/icons-material/Copyright';
import '../styles/Footer.css';

function Footer () {
    return(
        <footer className="footer">
            <div className="footer-content">
                <p>
                    <CopyrightIcon fontSize="small" /> {new Date().getFullYear()} Mon Application. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};


export default Footer