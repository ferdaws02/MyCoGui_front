import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 
import { useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';
import { Box, Button, IconButton } from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const ListDemandes = () => {
  const [demandes, setDemandes] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/AddDemande'); 
  };

  const handleShowDetails = (id) => {
    // Handle showing details for demandes if needed
  };

  const handletoEdit = (id) => {
    // Handle edit for demandes if needed
  };

  // Function to fetch data (you'll need to implement this)
  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint for demandes
      const response = await fetch('/Demandes'); // Replace with your actual API endpoint

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
        setDemandes(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data from the backend and update the state
    fetchData();
  }, []);

  const columns = [
    { field: 'id_demande', headerName: 'ID', width: 100 },
    { field: 'nom', headerName: 'Nom Consultant', width: 150 },
    { field: 'id_consultant', headerName: 'ID Consultant', width: 150 },
    { field: 'date_demande', headerName: 'Date de Demande', width: 200 },
    { field: 'type_demande', headerName: 'Type de demande', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      headerName: 'Actions',
      field: 'actions',
      flex: 1,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <IconButton
            onClick={() => handleShowDetails(params.row.id_demande)}
            aria-label="Consult"
            size="large"
          >
            <VisibilityOutlinedIcon fontSize="small" color="info" />
          </IconButton>
          <IconButton
            onClick={() => handletoEdit(params.row.id_demande)}
            aria-label="Edit"
            size="large"
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <div>
      <Box m="20px">
        <h2>Demandes</h2>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box></Box>
          <Box>
            <Button
                 onClick={handleOpen} size="small"  sx={{
                backgroundColor: colors.greenAccent[500],
                '&:hover': {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
              variant="contained"
            >
              Ajout Demande
              <Box width="5px"></Box>
              <AddCircleOutlineOutlinedIcon fontSize="medium" />
            </Button>
          </Box>
        </Box>

        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            '& .MuiDataGrid-root': {
              border: 'none',
              backgroundColor: colors.primary[400], // Adjust the table background color
            },
            '& .MuiDataGrid-cell': {
              borderBottom: 'none',
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.greenAccent[600], // Adjust the header background color
              borderBottom: 'none',
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: 'none',
              backgroundColor: colors.greenAccent[600], // Adjust the pagination background color
            },
            '& .MuiCheckbox-root': {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={demandes}
            columns={columns}
            sortModel={[{ field: 'id_demande', sort: 'desc' }]}
            getRowId={(row) => row.id_demande}
            pagination
            pageSize={10}
          />
        </Box>
      </Box>
    </div>
  );
};

export default ListDemandes;
