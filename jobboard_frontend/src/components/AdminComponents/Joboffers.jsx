import '../../styles/AdminCss/Company.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../../context/AuthContext3';

function JobOffers() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [formValues, setFormValues] = useState({
        titre: '',
        description: '',
        salaire: '',
        lieu: '',
        type_emploi: '',
        heures_travail: '',
        mots_cles: '',
    });
    const { user } = useContext(AuthContext);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
        },
        {
            field: 'titre',
            headerName: 'Title',
            flex: 1,
            cellClassName: 'name-column--cell'
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,
            cellClassName: 'name-column--cell',
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'salaire',
            headerName: 'Salary',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'lieu',
            headerName: 'Location',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'actions',
            headerName: '',
            flex: 0.6,
            cellClassName: 'name-column--cell',
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    gap='10px'
                    p='5px'
                >
                    <IconButton
                        onClick={() => handleEdit(params.row)}
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => deleteOffer(params.row.id)}
                        sx={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            )
        },
    ];

    // Fonction pour récupérer les données
    const fetchOffers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/offres', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching job offers:", error);
        }
    };

    // Utilisez useEffect pour récupérer les données à la montée du composant
    useEffect(() => {
        if (user?.token) {
            fetchOffers();
        }
    }, [user]);

    // Fonction pour supprimer une offre
    const deleteOffer = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/offres/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting job offer:", error);
        }
    };

    // Fonction pour gérer l'édition
    const handleEdit = (offer) => {
        setSelectedOffer(offer);
        setFormValues({
            titre: offer.titre,
            description: offer.description,
            salaire: offer.salaire,
            lieu: offer.lieu,
            type_emploi: offer.type_emploi,
            heures_travail: offer.heures_travail,
            mots_cles: offer.mots_cles,
        });
        setOpen(true);
    };

    // Fonction pour gérer la mise à jour ou la création d'une offre
    const handleSave = async () => {
        try {
            if (selectedOffer) {
                // Update existing offer
                await axios.put(`http://localhost:5000/api/offres/${selectedOffer.id}`, formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            } else {
                // Create new offer
                await axios.post('http://localhost:5000/api/offres', formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            }
            setOpen(false);
            fetchOffers();
        } catch (error) {
            console.error("Error saving job offer:", error);
        }
    };

    return (
        <div className='div-page'>
            <div className='company-all'>
                <div className='company-header'>
                    <h2 className='titre-company'>JOB OFFERS</h2>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={() => {
                            setSelectedOffer(null);
                            setFormValues({ titre: '', description: '', salaire: '', lieu: '', type_emploi: '', heures_travail: '', mots_cles: '' });
                            setOpen(true);
                        }}
                        sx={{
                            height: '30px',
                            borderRadius: '5px',
                            backgroundColor: '#FC6EDA',
                            textTransform: 'none',
                            boxShadow: 'none',
                            fontSize: '14px',
                            fontFamily: 'Open_sans, sans-serif',
                            '&:hover': {
                                boxShadow: 'none',
                                backgroundColor: '#fff',
                                color: '#FC6EDA',
                                border: '1px solid #FC6EDA',
                            }
                        }}
                    >
                        Create Job Offer +
                    </Button>
                </div>
                <Box m='10px 0 0 0' height='75vh'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        sx={{
                            backgroundColor: '#FFF',
                            "& .MuiDataGrid-root": {
                                border: "1px solid #000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: '1px solid #fff',
                            },
                            "& .name-column--cell": {
                                backgroundColor: '#fff',
                                color: '#000',
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: '#FC6EDA',
                                color: '#000',
                            },
                        }}
                    />
                </Box>
            </div>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{selectedOffer ? 'Edit Job Offer' : 'Create Job Offer'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={formValues.titre}
                        onChange={(e) => setFormValues({ ...formValues, titre: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formValues.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Salary"
                        type="text"
                        fullWidth
                        value={formValues.salaire}
                        onChange={(e) => setFormValues({ ...formValues, salaire: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        type="text"
                        fullWidth
                        value={formValues.lieu}
                        onChange={(e) => setFormValues({ ...formValues, lieu: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Job Type"
                        type="text"
                        fullWidth
                        value={formValues.type_emploi}
                        onChange={(e) => setFormValues({ ...formValues, type_emploi: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Working Hours"
                        type="text"
                        fullWidth
                        value={formValues.heures_travail}
                        onChange={(e) => setFormValues({ ...formValues, heures_travail: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Keywords"
                        type="text"
                        fullWidth
                        value={formValues.mots_cles}
                        onChange={(e) => setFormValues({ ...formValues, mots_cles: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {selectedOffer ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default JobOffers;
