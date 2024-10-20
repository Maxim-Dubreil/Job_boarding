import '../../styles/AdminCss/Company.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';


    
export function Company () {

    const [rows, setRows] = useState([]); //liste entreprise par ligne
    const [editRow, setEditRow] = useState(null); //Id de la ligne en cours de modification
    const [openModal, setOpenModal] = useState(false); //Etat du modal
    const [openCreateModal, setOpenCreateModal] = useState(false); // Etat du modal de création

    const [companyData, setCompanyData] = useState({
      nom_entreprise: '',
      email: '',
      telephone: '',
      region: '',
      secteur_activite: '',
    }); //donnée

//récupération donnée entreprise
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/entreprises');
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };
    useEffect(() => {
        fetchCompanies();
    }, []);

//Edit company
    const handleEditClick = (row) => {
        setEditRow(row.id);
        setCompanyData({
          nom_entreprise: row.nom_entreprise,
          email: row.email,
          telephone: row.telephone,
          region: row.region,
          secteur_activite:row.secteur_activite,
        });
        setOpenModal(true);
      };

//Save
    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/entreprises/${editRow}`, companyData);
            const updatedRows = rows.map((row) => (row.id === editRow ? { ...row, ...companyData } : row));
            setRows(updatedRows);  // Mise à jour des données dans le tableau après modification
            setOpenModal(false);  // Fermeture de la modale
        } catch (error) {
            console.error("Error updating company:", error);
        }
        };
//Chaque modif est maj
    const handleChange = (e) => {
        setCompanyData({ ...companyData, [e.target.name]: e.target.value });
        };

//supprimer les données par ID
    const handleDeleteClick = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/api/entreprises/:id${id}`);
          setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
          console.error("Error deleting company:", error);
        }
      };



//Créer une entreprise

const handleCreate = async () =>   {
    try {
        const response = await axios.post('http://localhost:5000/api/entreprises', companyData);
            setRows([...rows, response.data]); // Ajoute la nouvelle entreprise à la liste
            setOpenCreateModal(false); // Ferme le modal de création
            setCompanyData({ // Réinitialise les données
                nom_entreprise: '',
                email: '',
                telephone: '',
                region: '',
                secteur_activite: '',
            });
        } catch (error) {
            console.error("Error creating company:", error);
        }
    };

//Les colonnes
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex :0.5,
        },
        {
            field : 'nom_entreprise',
            headerName:' Name',
            flex :0.5,
            cellClassName: 'name-column--cell'
        },
        {
            field : 'email',
            headerName:'Email',
            type: 'email',
            cellClassName : 'name-column--cell',
            flex :0.8,
            headerAlign: 'left',
            align: 'left'
        },

        {
            field :  'telephone',
            headerName:' Phone',
            flex :0.8,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },

        {
            field :  'region',
            headerName:'Location',
            flex :1,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },

        {
            field :  'secteur_activite',
            headerName:'Buisines sector',
            flex :1,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },

        {
            field: 'actions',
            headerName:'',
            flex:0.6,
            cellClassName : 'name-column--cell',
            disableColumnMenu: true,
            renderCell: (params) => (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    gap='10px'
                    p='5'

                >
                    <IconButton
                        sx={{
                            width:'40px',
                            height:'40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                         }}
                         onClick={() => handleEditClick(params.row)}

                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        sx={{
                            width:'40px',
                            height:'40px',
                            backgroundColor: "#FC6EDA",
                            color: "#fff",
                            borderRadius: "50%",
                            "&:hover": {
                                backgroundColor: "#ff69b4",
                            },
                         }}
                         onClick={() => handleDeleteClick(params.row.id)}

                    >
                        <DeleteIcon />
                    </IconButton>

                </Box>
            )
        },

    ];

    return (
    <div className='div-page'>
        <div className='company-all'>
            <div className='company-header'>
                <h2 className='titre-company'>
                    COMPANY
                    </h2>
                <Button
                    variant='contained'
                    size='small'
                    sx={{
                        height:'30px',
                        borderRadius: '5px',
                        backgroundColor: '#FC6EDA',
                        textTransform: 'none',
                        boxShadow: 'none',
                        fontSize:'14px',
                        fontFamily: 'Open_sans, sans-serif',
                        '&:hover': {
                            boxShadow: 'none',
                            backgroundColor: '#fff',
                            color: '#FC6EDA',
                            border: '1px solid #FC6EDA',
                        }
                    }}
                    onClick={() => setOpenCreateModal(true)} // Ouvrir le modal de création
                    >
                    Create Company +
                </Button>
            </div>
            <Box
            m='10px 0 0 0'
            height='75vh'
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    sx={{
                        backgroundColor:'#FFF',
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
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '1px solid #000',
                        borderRadius: '5px',
                        p: 4,
                    }}>
                <h2>Edit Company</h2>
                    <TextField label="Name" name="nom_entreprise" value={companyData.nom_entreprise} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Email" name="email" value={companyData.email} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Phone" name="telephone" value={companyData.telephone} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Location" name="region" value={companyData.region} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Business sector" name="secteur_activite" value={companyData.secteur_activite} onChange={handleChange} fullWidth margin="normal" />
                    <Button
                        onClick={handleSave}
                        sx={{
                            mt: 2,
                            color:'#FC6EDA'
                            }}
                        >
                        Save
                    </Button>
                </Box>
            </Modal>

            <Modal open={openCreateModal} onClose={() => setOpenCreateModal(false)}>
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor:'#fff',
                        border: '1px solid #000',
                        borderRadius: '5px',
                        p: 4,
                    }}>
                        <h2>Create Company</h2>
                        <TextField label="Name" name="nom_entreprise" value={companyData.nom_entreprise} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Email" name="email" value={companyData.email} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Phone" name="telephone" value={companyData.telephone} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Location" name="region" value={companyData.region} onChange={handleChange} fullWidth margin="normal" />
                        <TextField label="Business sector" name="secteur_activite" value={companyData.secteur_activite} onChange={handleChange} fullWidth margin="normal" />
                        <Button
                            onClick={handleCreate}
                            sx={{ mt: 2,
                                color: '#FC6EDA' }}
                        >
                            Create
                        </Button>
                    </Box>
                </Modal>
        </div>
    </div>
    );
}
