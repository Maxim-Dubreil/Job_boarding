import '../../styles/AdminCss/Users.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function Users () {

    return (
        <div>
            <Box>
                <h2>Users</h2>
                <Button>
                    Create Users
                </Button>
            </Box>
            <Box>
                <DataGrid>

                </DataGrid>
            </Box>

        </div>
    )
}

export default Users;