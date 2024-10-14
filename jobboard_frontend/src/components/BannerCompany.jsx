import '../styles/BannerCompany.css'
import logoCompany from '../assets/image/logoCompany.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function BannerCompany () {
    return (
        <header className='BannerCompany' id="top">
{/*Logo Bannière + lien*/}
            <div className='like-img'>
                <Link to="/CompanyDashboard">
                    <img src={logoCompany} alt="Le super logo de Pinkedin" className="logo"/>
                </Link>
            </div>
{/*Bouton home (offers)*/}
            <div className='banner-button'>
                <Link to="/">
                    <Button
                        className='but-offers'
                        variant="text"
                        size='small'
                        sx={{
                            borderRadius:'15px',
                            color: '#FFFFFF',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                            fontWeight : 'bold',
                            textDecoration : 'underline',
                            '&:hover': {
                                backgroundColor: 'none'
                            }
                        }}>
                        View offers
                    </Button>
                </Link>

{/*Bouton connexion*/}
                <Link to="/Login">
                    <Button
                        className="but-connexion"
                        variant="contained"
                        size='small'
                        sx={{
                            boxShadow: 'none',
                            fontSize: '16px',
                            fontFamily: 'Open_sans, sans-serif',
                            borderRadius:'15px',
                            textTransform: 'none',
                            backgroundColor: '#FC6EDA',

                            '&:hover': {
                            boxShadow: 'none',
                            backgroundColor: '#E056B3',
                            },
                        }}>
                        Connexion
                    </Button>
                </Link>
            </div>
        </header>
    );
}

export default BannerCompany