import '../styles/BannerCompany.css'
import logoCompany from '../assets/image/logoCompany.png';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';

function BannerCompany() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [userRole, setUserRole] = React.useState('');

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT to get user info
            setUserRole(user.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <header className='BannerCompany' id="top">
            <div className='like-img'>
                <Link to={userRole === 'recruteur' ? "/CompanyDashboard" : "/"}>
                    <img src={logoCompany} alt="Le super logo de Pinkedin" className="logo" />
                </Link>
            </div>

            <div className='banner-button'>
                {userRole === 'recruteur' ? (
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
                ) : (
                    <Link to="/">
                        <Button
                            className='but-offers'
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
                            View offers
                        </Button>
                    </Link>
                )}

                {isLoggedIn ? (
                    <>
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
                            onClick={handleLogout}
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

export default BannerCompany
