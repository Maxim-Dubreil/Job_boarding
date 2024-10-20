import "../../styles/ProfileCss/Profile.css";
import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { AuthContext } from '../../context/AuthContext3';
import { TextField, Button } from '@mui/material';

export function Profile() {
    const { user, login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
        role: '',
        chemin_cv: '',
        date_inscription: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                telephone: user.telephone || '',
                adresse: user.adresse || '',
                role: user.role,
                chemin_cv: user.chemin_cv || '',
                date_inscription: user.date_inscription,
            });
        }
    }, [user]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission to update profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/api/users/${user.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            // Update user context with new data
            login({ ...user, ...formData });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="profile-page">
            <Banner />
            <div className="profile-content">
                <div className="form-content">
                <h2>My Profile</h2>
                <form className="profile-form" onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Last Name"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Phone Number"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Address"
                        name="adresse"
                        value={formData.adresse}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="CV Path"
                        name="chemin_cv"
                        value={formData.chemin_cv}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        sx={{
                            width:'450px',
                        }}
                    />
                    <TextField
                        label="Registration Date"
                        name="date_inscription"
                        value={formData.date_inscription}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        disabled
                        sx={{
                            width:'450px',
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{
                            mt: 2,
                            borderRadius: '10px',
                            backgroundColor: '#FC6EDA',
                            fontSize:'14px',
                            fontFamily: 'Open_sans, sans-serif',
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: '#fff',
                                    color: '#FC6EDA',
                                    border: '1px solid #FC6EDA',
                            }
                         }}
                    >
                        Update Profile
                    </Button>
                </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}
