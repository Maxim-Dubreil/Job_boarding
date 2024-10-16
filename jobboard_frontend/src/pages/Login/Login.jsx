import '../../styles/Login.css';
import { Link } from 'react-router-dom';
import logoLogin from '../../assets/image/logoBanner.png';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';


export function Login() {

    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        document.body.classList.add('custom-background');
        return () => {
            document.body.classList.remove('custom-background');
        };
    }, []);

    return (
            <div className="login-container">
                <Link to="/">
                    <img src={logoLogin} alt="Logo Login" className="login-logo" />
                </Link>
                <div className="loginsignup-header">
                    <Button variant='contained'
                            onClick={() => setIsLogin(true)}
                        size='small'
                        sx={{
                            transition: 'all 0.2s ease',
                            borderRadius:'15px',
                            color: '#fff',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                            fontWeight: isLogin ? 'bold' : 'regular', // Texte gras si actif
                            backgroundColor: isLogin ? '#E056B3' : '#FC6EDA', // Fond rose si actif, blanc sinon (même que hover)

                            '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                            }
                        }}>Login
                    </Button>
                    <Button variant='contained'
                            onClick={() => setIsLogin(false)}
                        size='small'
                        sx={{
                            borderRadius:'15px',
                            color: !isLogin ? '#fff' : '#000', // Texte blanc si actif, noir sinon
                            transition: 'all 0.2s ease',

                            color: '#fff',
                            textTransform: 'none',
                            fontSize:'16px',
                            fontFamily: 'Open_sans, sans-serif',
                            fontWeight: isLogin ? 'regular' : 'bold', // Texte gras si actif
                            backgroundColor: isLogin ? '#FC6EDA' : '#E056B3', // Fond rose si actif, blanc sinon (même que hover)
                            '&:hover': {
                                backgroundColor: '#E056B3',
                                fontWeight: 'bold',
                                },
                        }}>Sign Up
                    </Button>
                </div>

                {isLogin ? (
                    <div className={`login-form ${isLogin ? 'active' : ''}`}>
                        <div className="login-input-group">
                            <label htmlFor="email-login" className="login-label">Email</label>
                            <input type="email" id="email-login" className="login-input" />
                        </div>
                        <div className="login-input-group">
                            <label htmlFor="password-login" className="login-label">Mot de passe</label>
                            <input type="password" id="password-login" className="login-input" />
                            <div className="forgot-password">Lost password ? Click Here</div>

                        </div>
                        <div className='submit-container'>
                            <Button
                                variant='contained'
                                sx={{
                                    height:'45px',
                                    width: '120px',
                                    backgroundColor: '#2E3A59',
                                    color: '#fff',
                                    borderRadius: '15px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 'bold',
                                    transition: 'all 0.5s ease',

                                    '&:hover': {
                                      backgroundColor: '#FC6EDA',
                                      boxShadow: '0 0 15px 5px rgba(252, 110, 218, 0.6)',
                                    }
                                }}

                            >Login</Button>
                        </div>
                    </div>
                ) : (
                    <div className={`signup-form ${!isLogin ? 'active' : ''}`}>
                        <div className='signup-group'>
                            <div className='signup-input-group'>
                                <label htmlFor="name-signup" className='login-label'>Name</label>
                                <input type='text' id="name-signup" className='sign-input'/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="surname-signup" className='login-label'>Surname</label>
                                <input type='text' id="surname-signup" className='sign-input'/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="email-signup" className='login-label'>Email</label>
                                <input type='email' id="email-signup" className='sign-input'/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="password-signup" className='login-label'>Password</label>
                                <input type='password' id="password-signup" className='sign-input'/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="location-signup" className='login-label'>Where?</label>
                                <input type='text' id="location-signup" className='sign-input'/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="job-signup" className='login-label'>Job research</label>
                                <input type='text' id="job-signup" className='sign-input'/>
                            </div>
                        </div>
                        <div className='submit-container'>
                            <Button variant='contained'
                                sx={{
                                    height:'45px',
                                    width: '120px',
                                    backgroundColor: '#2E3A59',
                                    color: '#fff',
                                    borderRadius: '15px',
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    fontFamily: 'Open Sans, sans-serif',
                                    fontWeight: 'bold',
                                    transition: 'all 0.5s ease',

                                    '&:hover': {
                                      backgroundColor: '#FC6EDA',
                                      boxShadow: '0 0 15px 5px rgba(252, 110, 218, 0.6)',
                                    }
                                }}>Sign Up
                                </Button>
                        </div>
                    </div>
                )}
            </div>
    );
}