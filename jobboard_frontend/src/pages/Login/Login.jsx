import '../../styles/Login.css';
import { Link } from 'react-router-dom';
import logoLogin from '../../assets/image/logoBanner.png';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import * as React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography} from '@mui/material';



export function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState(true);

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
            <Button
                variant='contained'
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
                }}>
                Login
            </Button>
            <Button
                variant='contained'
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
                }}>
                Sign Up
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
                        }}>
                        Login
                    </Button>
                </div>
            </div>
        ) : (
            <div className={`signup-form ${!isLogin ? 'active' : ''}`}>
                <div className='signup-group'>
                    <div className='radio-group'>
                        <FormControl
                            sx={{
                                gap:'5px',
                            }}
                            >
                            <FormLabel id ="radio-buttons-group">
                                <Typography
                                sx={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: 'Bold', // Ou 'normal' si vous préférez
                                    fontSize: '15px',
                                    color: '#000',
                                    textAlign: 'center', // Centrer le texte
                                }}
                            >
                                Choose one:
                            </Typography>
                            </FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby='radio-buttons-group'
                                    name='row-radio-buttons-group'
                                    defaultValue='candidate'
                                >
                                    <FormControlLabel
                                        value='candidate'
                                        onClick={() => setRole(true)}
                                        control={<Radio
                                            sx={{
                                            color: '#FC6EDA', // couleur par défaut
                                            '&.Mui-checked': {
                                                color: '#FC6EDA', // couleur quand sélectionné
                                                },
                                            }}
                                        />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontWeight: 'regular', // Ou 'regular', selon vos besoins
                                                    fontSize: '14px',
                                                    color: '#000',
                                                    '&.Mui-checked': {
                                                        color: '#000', // Couleur lorsque sélectionné
                                                    },
                                                }}
                                            >
                                                Candidate
                                            </Typography>
                                        }
                                        />
                                    <FormControlLabel
                                        value='recruiter'
                                        onClick={() => setRole(false)}
                                        control={<Radio
                                            sx={{
                                            color: '#FC6EDA', // couleur par défaut
                                            '&.Mui-checked': {
                                                color: '#FC6EDA', // couleur quand sélectionné
                                                },
                                            }}
                                        />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontWeight: 'regular', // Ou 'regular', selon vos besoins
                                                    fontSize: '14px',
                                                    color: '#000',
                                                    '&.Mui-checked': {
                                                        color: '#000', // Couleur lorsque sélectionné
                                                    },
                                                }}
                                            >
                                                Recruiter
                                            </Typography>
                                        }
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>

                        {role ? (
                        <div className={`signup-form-candidate ${role ? 'active' : ''}`}>
                            <div className='signup-input-group'>
                                <label htmlFor="name-signup" className='sign-label'>Name</label>
                                <input type='text' id="name-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="surname-signup" className='sign-label'>Surname</label>
                                <input type='text' id="surname-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-mail'>
                                <label htmlFor="email-signup" className='sign-label'>Email</label>
                                <input type='email' id="email-signup" className='sign-input' placeholder='ex : myname@gmail.com' required/>
                            </div>
                            <div className='signup-input-password'>
                                <label htmlFor="password-signup" className='sign-label'>Password</label>
                                <input type='password' id="password-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="phone" className='sign-label'>Phone</label>
                                <input type='tel' id="phone" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="job-signup" className='sign-label'>Location</label>
                                <input type='text' id="job-signup" className='sign-input' placeholder='Enter your city' required/>
                            </div>
                        </div>
                    ) : (
                        <div className={`signup-form-recruiter ${!role ? 'active' : ''}`}>
                            <div className='signup-input-group'>
                                <label htmlFor="name-signup" className='sign-label'>Name</label>
                                <input type='text' id="name-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="surname-signup" className='sign-label'>Surname</label>
                                <input type='text' id="surname-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-mail'>
                                <label htmlFor="email-signup" className='sign-label'>Email</label>
                                <input type='email' id="email-signup" className='sign-input' placeholder='ex : myname@gmail.com' required/>
                            </div>
                                <div className='signup-input-password'>
                                <label htmlFor="password-signup" className='sign-label'>Password</label>
                                <input type='password' id="password-signup" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="phone" className='sign-label'>Phone</label>
                                <input type='tel' id="phone" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="location" className='sign-label'>Location</label>
                                <input type='text' id="location" className='sign-input' placeholder='Enter your city' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="name-company" className='sign-label'>Name of your company</label>
                                <input type='text' id="name-company" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="business-sector" className='sign-label'>Buisness sector</label>
                                <input type='text' id="business-sector" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="site-web" className='sign-label'>Company web site</label>
                                <input type='text' id="site-web" className='sign-input' required/>
                            </div>
                            <div className='signup-input-group'>
                                <label htmlFor="phone-company" className='sign-label'>Phone Company</label>
                                <input type='tel' id="phone-company" className='sign-input' required/>
                            </div>
                            <div className='signup-input-mail'>
                                <label htmlFor="mail-company" className='sign-label'>Email Company</label>
                                <input type='text' id="mail-company" className='sign-input' required/>
                            </div>
                            <div className='signup-input-mail'>
                                <label htmlFor="description" className='sign-label'>Describe your company</label>
                                <input type='textarea' id="description" className='sign-input' required/>
                            </div>
                        </div>
                    )}
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
                    }}>
                    Sign Up
                </Button>
            </div>
            </div>
        )}
    </div>
);
}
