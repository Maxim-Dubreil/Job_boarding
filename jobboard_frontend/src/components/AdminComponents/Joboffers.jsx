import '../../styles/AdminCss/Joboffers.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function Joboffers () {

    return (
        <div>
            <Box>
                <h2>Offers</h2>
                <Button>
                    Create Offers
                </Button>
            </Box>
            <Box>
                <DataGrid>

                </DataGrid>
            </Box>

        </div>
    )
}

export default Joboffers;