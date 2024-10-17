import '../../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import logoLogin from '../../assets/image/logoBanner.png';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import * as React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import axios from 'axios';

export function Login() {

    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState(true);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({
        name: '', surname: '', email: '', password: '', phone: '', location: '', role: 'candidate',
        companyName: '', businessSector: '', siteWeb: '', phoneCompany: '', emailCompany: '', companyDescription: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('custom-background');
        return () => {
            document.body.classList.remove('custom-background');
        };
    }, []);

    // Handle login request
    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email: loginData.email,
                mot_de_passe: loginData.password,
            });
            alert('Login Successful');
            console.log(response.data);
            // Store the token in localStorage for future authenticated requests
            localStorage.setItem('token', response.data.token);

            // Redirect user based on role
            if (response.data.role === 'employé') {
                navigate('/'); // Home page for employees
            } else if (response.data.role === 'recruteur') {
                navigate('/CompanyDashboard'); // Recruiter page for recruiters
            } else if (response.data.role === 'admin') {
                navigate('/admin'); // Admin page for admin users
            }
        } catch (error) {
            console.error('Login failed', error);
            alert('Login Failed: ' + error.response?.data?.error);
        }
    };

    // Handle signup request
    const registerUser = async () => {
        try {
            let entrepriseId = null;

            // If role is recruiter, create the company first
            if (signupData.role === 'recruiter') {
                const entrepriseResponse = await axios.post('http://localhost:5000/api/entreprises', {
                    nom_entreprise: signupData.companyName,
                    secteur_activite: signupData.businessSector,
                    site_web: signupData.siteWeb,
                    telephone: signupData.phoneCompany,
                    email: signupData.emailCompany,
                    description: signupData.companyDescription,
                    adresse: signupData.location,
                });
                entrepriseId = entrepriseResponse.data.id;
            }

            const response = await axios.post('http://localhost:5000/api/users/register', {
                nom: signupData.name,
                prenom: signupData.surname,
                email: signupData.email,
                mot_de_passe: signupData.password,
                telephone: signupData.phone,
                adresse: signupData.location,
                role: signupData.role === 'candidate' ? 'employé' : 'recruteur',
                id_entreprise: entrepriseId,
            });
            alert('Signup Successful');
            console.log(response.data);

            // Redirect user based on role after successful signup
            if (signupData.role === 'candidate') {
                navigate('/'); // Home page for employees
            } else if (signupData.role === 'recruiter') {
                navigate('/recruiter'); // Recruiter page for recruiters
            }
        } catch (error) {
            console.error('Signup failed', error);
            alert('Signup Failed: ' + error.response?.data?.error);
        }
    };

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
                        borderRadius: '15px',
                        color: '#fff',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontFamily: 'Open_sans, sans-serif',
                        fontWeight: isLogin ? 'bold' : 'regular',
                        backgroundColor: isLogin ? '#E056B3' : '#FC6EDA',
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
                        borderRadius: '15px',
                        color: '#fff',
                        transition: 'all 0.2s ease',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontFamily: 'Open_sans, sans-serif',
                        fontWeight: isLogin ? 'regular' : 'bold',
                        backgroundColor: isLogin ? '#FC6EDA' : '#E056B3',
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
                        <input
                            type="email"
                            id="email-login"
                            className="login-input"
                            value={loginData.email}
                            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        />
                    </div>

                    <div className="login-input-group">
                        <label htmlFor="password-login" className="login-label">Mot de passe</label>
                        <input
                            type="password"
                            id="password-login"
                            className="login-input"
                            value={loginData.password}
                            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <div className="forgot-password">Lost password ? Click Here</div>
                    </div>

                    <div className='submit-container'>
                        <Button
                            variant='contained'
                            onClick={loginUser}
                            sx={{
                                height: '45px',
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
                                    gap: '5px',
                                }}
                            >
                                <FormLabel id="radio-buttons-group">
                                    <Typography
                                        sx={{
                                            fontFamily: 'Montserrat',
                                            fontWeight: 'Bold',
                                            fontSize: '15px',
                                            color: '#000',
                                            textAlign: 'center',
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
                                        onClick={() => {
                                            setRole(true);
                                            setSignupData({ ...signupData, role: 'candidate' });
                                        }}
                                        control={<Radio
                                            sx={{
                                                color: '#FC6EDA',
                                                '&.Mui-checked': {
                                                    color: '#FC6EDA',
                                                },
                                            }}
                                        />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontWeight: 'regular',
                                                    fontSize: '14px',
                                                    color: '#000',
                                                    '&.Mui-checked': {
                                                        color: '#000',
                                                    },
                                                }}
                                            >
                                                Candidate
                                            </Typography>
                                        }
                                    />
                                    <FormControlLabel
                                        value='recruiter'
                                        onClick={() => {
                                            setRole(false);
                                            setSignupData({ ...signupData, role: 'recruiter' });
                                        }}
                                        control={<Radio
                                            sx={{
                                                color: '#FC6EDA',
                                                '&.Mui-checked': {
                                                    color: '#FC6EDA',
                                                },
                                            }}
                                        />
                                        }
                                        label={
                                            <Typography
                                                sx={{
                                                    fontFamily: 'Montserrat',
                                                    fontWeight: 'regular',
                                                    fontSize: '14px',
                                                    color: '#000',
                                                    '&.Mui-checked': {
                                                        color: '#000',
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
                                    <input
                                        type='text'
                                        id="name-signup"
                                        className='sign-input'
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="surname-signup" className='sign-label'>Surname</label>
                                    <input
                                        type='text'
                                        id="surname-signup"
                                        className='sign-input'
                                        value={signupData.surname}
                                        onChange={(e) => setSignupData({ ...signupData, surname: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-mail'>
                                    <label htmlFor="email-signup" className='sign-label'>Email</label>
                                    <input
                                        type='email'
                                        id="email-signup"
                                        className='sign-input'
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        placeholder='ex : myname@gmail.com'
                                        required
                                    />
                                </div>
                                <div className='signup-input-password'>
                                    <label htmlFor="password-signup" className='sign-label'>Password</label>
                                    <input
                                        type='password'
                                        id="password-signup"
                                        className='sign-input'
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="phone" className='sign-label'>Phone</label>
                                    <input
                                        type='tel'
                                        id="phone"
                                        className='sign-input'
                                        value={signupData.phone}
                                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="job-signup" className='sign-label'>Location</label>
                                    <input
                                        type='text'
                                        id="job-signup"
                                        className='sign-input'
                                        value={signupData.location}
                                        onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                                        placeholder='Enter your city'
                                        required
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className={`signup-form-recruiter ${!role ? 'active' : ''}`}>
                                <div className='signup-input-group'>
                                    <label htmlFor="name-signup" className='sign-label'>Name</label>
                                    <input
                                        type='text'
                                        id="name-signup"
                                        className='sign-input'
                                        value={signupData.name}
                                        onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="surname-signup" className='sign-label'>Surname</label>
                                    <input
                                        type='text'
                                        id="surname-signup"
                                        className='sign-input'
                                        value={signupData.surname}
                                        onChange={(e) => setSignupData({ ...signupData, surname: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-mail'>
                                    <label htmlFor="email-signup" className='sign-label'>Email</label>
                                    <input
                                        type='email'
                                        id="email-signup"
                                        className='sign-input'
                                        value={signupData.email}
                                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                        placeholder='ex : myname@gmail.com'
                                        required
                                    />
                                </div>
                                <div className='signup-input-password'>
                                    <label htmlFor="password-signup" className='sign-label'>Password</label>
                                    <input
                                        type='password'
                                        id="password-signup"
                                        className='sign-input'
                                        value={signupData.password}
                                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="phone" className='sign-label'>Phone</label>
                                    <input
                                        type='tel'
                                        id="phone"
                                        className='sign-input'
                                        value={signupData.phone}
                                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="location" className='sign-label'>Location</label>
                                    <input
                                        type='text'
                                        id="location"
                                        className='sign-input'
                                        value={signupData.location}
                                        onChange={(e) => setSignupData({ ...signupData, location: e.target.value })}
                                        placeholder='Enter your city'
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="name-company" className='sign-label'>Name of your company</label>
                                    <input
                                        type='text'
                                        id="name-company"
                                        className='sign-input'
                                        value={signupData.companyName}
                                        onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="business-sector" className='sign-label'>Business sector</label>
                                    <input
                                        type='text'
                                        id="business-sector"
                                        className='sign-input'
                                        value={signupData.businessSector}
                                        onChange={(e) => setSignupData({ ...signupData, businessSector: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="site-web" className='sign-label'>Company web site</label>
                                    <input
                                        type='text'
                                        id="site-web"
                                        className='sign-input'
                                        value={signupData.siteWeb}
                                        onChange={(e) => setSignupData({ ...signupData, siteWeb: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-group'>
                                    <label htmlFor="phone-company" className='sign-label'>Phone Company</label>
                                    <input
                                        type='tel'
                                        id="phone-company"
                                        className='sign-input'
                                        value={signupData.phoneCompany}
                                        onChange={(e) => setSignupData({ ...signupData, phoneCompany: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-mail'>
                                    <label htmlFor="mail-company" className='sign-label'>Email Company</label>
                                    <input
                                        type='text'
                                        id="mail-company"
                                        className='sign-input'
                                        value={signupData.emailCompany}
                                        onChange={(e) => setSignupData({ ...signupData, emailCompany: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className='signup-input-mail'>
                                    <label htmlFor="description" className='sign-label'>Describe your company</label>
                                    <input
                                        type='textarea'
                                        id="description"
                                        className='sign-input'
                                        value={signupData.companyDescription}
                                        onChange={(e) => setSignupData({ ...signupData, companyDescription: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='submit-container'>
                        <Button variant='contained'
                            onClick={registerUser}
                            sx={{
                                height: '45px',
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
