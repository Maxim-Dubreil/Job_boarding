import '../../styles/AdminCss/Company.css';
import Box from '@mui/material/Box';
import { DataGrid, ColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


function Joboffers () {
    const [rows, setRows] = useState([]);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex :0.5,

        },
        {
            field : 'titre',
            headerName:'Name',
            flex :1,
            cellClassName: 'name-column--cell'
        },
        {
            field : 'salaire',
            headerName:'Salaire',
            cellClassName : 'name-column--cell',
            flex :1,
            headerAlign: 'left',
            align: 'left'
        },

        {
            field : 'lieu',
            headerName:'Location',
            flex :0.8,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },

        {
            field : 'region',
            headerName:'Region',
            flex :1,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },

        {
            field : 'type_emploi',
            headerName:'Contract',
            flex :0.5,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },
        {
            field : 'heures_travail',
            headerName:'Hours per week',
            flex :0.5,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },
        {
            field : 'mots_cles',
            headerName:'Tags',
            flex :0.5,
            headerAlign: 'left',
            align: 'left',
            cellClassName : 'name-column--cell',

        },
        {
            field : 'description',
            headerName:'Description',
            flex :1,
            type:'textarea',
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
                    p='5px'

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
                    >
                        <EditIcon /> {/* Assurez-vous d'avoir l'icône ici */}
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
                    >
                        <DeleteIcon /> {/* Assurez-vous d'avoir l'icône ici */}
                    </IconButton>

                </Box>
            )
        },

    ];



    // Fonction pour récupérer les données
    const fetchCompanies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/offres'); // Remplacez par l'URL de votre API
            setRows(response.data); // Assurez-vous que response.data contient les données correctes
        } catch (error) {
            console.error("Error fetching companies:", error); // Affiche l'erreur dans la console
        }
    };

    // Utilisez useEffect pour récupérer les données à la montée du composant
    useEffect(() => {
        fetchCompanies();
    }, []); // Le tableau vide [] signifie que cette fonction s'exécutera une fois lors du premier rendu

    return (
    <div className='div-page'>
        <div className='company-all'>
            <div className='company-header'>
                <h2 className='titre-company'>
                    OFFERS
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
                    }}>
                    Create Offers +
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
                        '& .MuiDataGrid-columnHeaderTitleContainer': {
                            whiteSpace: 'normal'
                        },
                    }}
                    />
            </Box>

        </div>
    </div>
    );
}
export default Joboffers;