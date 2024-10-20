import '../styles/Banner.css';
import logoBanner from '../assets/image/logoBanner.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext3';

function Banner() {
    const navigate = useNavigate();
    const { user, logout } = React.useContext(AuthContext);

    return (
        <header className='Banner'>
            <div className='like-img'>
                <Link to="/">
                    <img src={logoBanner} alt="Le super logo de Pinkedin" className="logo" />
                </Link>
            </div>

            <div className='banner-button'>
                {user ? (
                    <>
                        <Link to="/profile">
                            <Button
                                className='but-profile'
                                variant="text"
                                size='small'
                                sx={{
                                    borderRadius: '15px',
                                    color: '#000000',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open_sans, sans-serif',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    backgroundColor: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                    }
                                }}>
                                My Profile
                            </Button>
                        </Link>
                        <Button
                            className='but-logout'
                            variant="contained"
                            size='small'
                            onClick={() => {
                                logout();
                                navigate('/');
                            }}
                            sx={{
                                boxShadow: 'none',
                                fontSize: '16px',
                                fontFamily: 'Open_sans, sans-serif',
                                borderRadius: '15px',
                                textTransform: 'none',
                                backgroundColor: '#FC6EDA',
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: '#E056B3',
                                },
                            }}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link to="/Login">
                            <Button
                                className="but-connexion"
                                variant="contained"
                                size='small'
                                sx={{
                                    boxShadow: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open_sans, sans-serif',
                                    borderRadius: '15px',
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

                        <Link to="/CompanyDashboard">
                            <Button
                                className='but-recruitement'
                                variant="text"
                                size='small'
                                sx={{
                                    borderRadius: '15px',
                                    color: '#000000',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open_sans, sans-serif',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    backgroundColor: '#FFFFFF',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                    }
                                }}>
                                Recruitment access
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Banner;
