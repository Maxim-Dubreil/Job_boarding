import '../styles/BannerCompany.css';
import logoCompany from '../assets/image/logoCompany.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext3';

function BannerCompany() {
    const navigate = useNavigate();
    const { user, logout } = React.useContext(AuthContext);

    return (
        <header className='BannerCompany' id="top">
            <div className='like-img'>
                <Link to={user && user.role === 'recruteur' ? "/CompanyDashboard" : "/"}>
                    <img src={logoCompany} alt="Le super logo de Pinkedin" className="logo" />
                </Link>
            </div>

            <div className='banner-button'>
                {user ? (
                    <>
                        {user.role === 'recruteur' && (
                            <Link to="/CompanyDashboard">
                                <Button
                                    className='but-dashboard'
                                    variant="text"
                                    size='small'
                                    sx={{
                                        borderRadius: '15px',
                                        color: '#FFFFFF',
                                        textTransform: 'none',
                                        fontSize: '16px',
                                        fontFamily: 'Open_sans, sans-serif',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        '&:hover': {
                                            backgroundColor: 'none'
                                        }
                                    }}>
                                    Company Dashboard
                                </Button>
                            </Link>
                        )}
                        <Link to="/profile">
                            <Button
                                className='but-profile'
                                variant="text"
                                size='small'
                                sx={{
                                    borderRadius: '15px',
                                    color: '#FFFFFF',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open_sans, sans-serif',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    '&:hover': {
                                        backgroundColor: 'none'
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
                )}
            </div>
        </header>
    );
}

export default BannerCompany;
