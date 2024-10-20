import '../../styles/AdminCss/Users.css';
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

function Users() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        adresse: '',
    });
    const { user } = useContext(AuthContext);

    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5,
        },
        {
            field: 'nom',
            headerName: 'Name',
            flex: 1,
            cellClassName: 'name-column--cell'
        },
        {
            field: 'prenom',
            headerName: 'Surname',
            cellClassName: 'name-column--cell',
            flex: 1,
            headerAlign: 'left',
            align: 'left'
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 0.8,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'telephone',
            headerName: 'Phone',
            flex: 1,
            headerAlign: 'left',
            align: 'left',
            cellClassName: 'name-column--cell',
        },
        {
            field: 'adresse',
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
                        onClick={() => deleteUser(params.row.id)}
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
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Utilisez useEffect pour récupérer les données à la montée du composant
    useEffect(() => {
        if (user?.token) {
            fetchUsers();
        }
    }, [user]);

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            });
            setRows(rows.filter((row) => row.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Fonction pour gérer l'édition
    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormValues({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            telephone: user.telephone,
            adresse: user.adresse,
        });
        setOpen(true);
    };

    // Fonction pour gérer la mise à jour ou la création d'un utilisateur
    const handleSave = async () => {
        try {
            if (selectedUser) {
                // Update existing user
                await axios.put(`http://localhost:5000/api/users/${selectedUser.id}`, formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            } else {
                // Create new user
                await axios.post('http://localhost:5000/api/users/register', formValues, {
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });
            }
            setOpen(false);
            fetchUsers();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <div className='div-page'>
            <div className='company-all'>
                <div className='company-header'>
                    <h2 className='titre-company'>USERS</h2>
                    <Button
                        variant='contained'
                        size='small'
                        onClick={() => {
                            setSelectedUser(null);
                            setFormValues({ nom: '', prenom: '', email: '', telephone: '', adresse: '' });
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
                        Create Users +
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
                <DialogTitle>{selectedUser ? 'Edit User' : 'Create User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formValues.nom}
                        onChange={(e) => setFormValues({ ...formValues, nom: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Surname"
                        type="text"
                        fullWidth
                        value={formValues.prenom}
                        onChange={(e) => setFormValues({ ...formValues, prenom: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        value={formValues.email}
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Phone"
                        type="text"
                        fullWidth
                        value={formValues.telephone}
                        onChange={(e) => setFormValues({ ...formValues, telephone: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Location"
                        type="text"
                        fullWidth
                        value={formValues.adresse}
                        onChange={(e) => setFormValues({ ...formValues, adresse: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        {selectedUser ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Users;
