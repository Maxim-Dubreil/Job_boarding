import '../styles/Banner.css'
import logoBanner from '../assets/image/logoBanner.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Banner () {
    return (
        <header className='Banner'>

            <div className='like-img'>
                <Link to="/">
                    <img src={logoBanner} alt="Le super logo de Pinkedin" className="logo"/>
                </Link>
            </div>



            <div className='banner-button'>
                <Link to="/CompanyDashboard">
                    <Button
                        className='but-recruitement'
                        variant="text"
                        size='small'
                        sx={{
                            borderRadius:'15px',
                            color: '#000000',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                            fontWeight : 'bold',
                            textDecoration : 'underline',
                            backgroundColor : '#FFFFFF',

                            '&:hover': {
                                backgroundColor: '#FFFFFF',
                            }
                        }}>
                        Recruitement access
                    </Button>
                </Link>

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

export default Banner