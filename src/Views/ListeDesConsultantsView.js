import React from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';


const ListeConsutantsView = ({
  consultant,
  getDataById,
  handleDataChange
 
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: 'id_c', headerName: 'ID', width: 70 },
    { field: 'nom_c', headerName: 'NOM', width: 200 },
    { field: 'prenom_c', headerName: 'PRENOM', width: 200 },
    { field: 'adress_c', headerName: 'ADRESSE', width: 200 },
    { field: 'emailc', headerName: 'EMAIL', width: 200 },
    { field: 'etat', headerName: 'ETAT', width: 200 },
    {
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" mt="15px">
            <IconButton aria-label="Edit" size="large" id="Edit_BTN">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="consult" size="large">
              <VisibilityOutlinedIcon fontSize="small" color="info" />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div>
      <Box m="20px">
        <h2>CONSULTANTS</h2>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex"></Box>
      
        </Box>

        <Box
         
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.greenAccent[600],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.greenAccent[600],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={consultant}
            columns={columns}
            sortModel={[{ field: 'id_c', sort: 'desc' }]}
            getRowId={(row) => row.id}
            getRowData={(params) => params.row}
            onRowClick={(params) => {
              const id = params.row.id;
              const rowData = getDataById(id);
              if (rowData) {
                console.log('Data found:', rowData);
                const Data = rowData;
                console.log('Data :', Data);
                handleDataChange(Data);
              } else {
                console.log('Data not found for the specified ID.');
              }
             
            }}
            pagination
            pageSize={10}
          />
         
        </Box>
      </Box>
    </div>
  );
};

export default ListeConsutantsView ;