<<<<<<< HEAD
import React from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';
import FormPopup from '../Controllers/FormPopupController';
import EditForm from '../Controllers/EditFormController';
=======
import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'; // Add this import
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';
import FormPopup from '../Controllers/FormPopupController';
import EditFormController from '../Controllers/EditFormController';
import ClientPopup from './ClientPopup'; // Replace with the actual path to ClientPopup.js
>>>>>>> origin/takwa

const ListEntrepriseView = ({
  entreprises,
  handleOpen,
  handleOpenEdit,
  handleDataChange,
  isOpen,
  isOpenEdit,
  handleClose,
  handleCloseEdit,
  data,
  getDataById
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
<<<<<<< HEAD

  const columns = [
    { field: 'id_e', headerName: 'ID', width: 70 },
    { field: 'nomentreprise', headerName: 'NOM ENTREPRISE', width: 200 },
    { field: 'adresse', headerName: 'ADRESSE', width: 200 },
    { field: 'pays', headerName: 'PAYS', width: 200 },
   
    {
      headerName: 'ACTION',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" mt="15px">
            <IconButton onClick={handleOpenEdit} aria-label="Edit" size="large" id="Edit_BTN">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton aria-label="consult" size="large">
=======
  const [isClientPopupOpen, setClientPopupOpen] = useState(false);
  const [selectedClientData, setSelectedClientData] = useState(null);

  const columns = [
    { field: 'id_e', headerName: 'ID', width: 70 },
    { field: 'nomentreprise', headerName: 'Name', width: 200 },
    { field: 'adresse', headerName: 'Adresse', width: 200 },
    { field: 'pays', headerName: 'Country', width: 200 },
    {
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const id = params.row.id_e;
        return (
          <Box display="flex" mt="15px">
            <IconButton
              onClick={() => {
                const rowData = getDataById(id);
                if (rowData) {
                  handleDataChange(rowData);
                  handleOpenEdit();
                } else {
                  console.log('Data not found for the specified ID.');
                }
              }}
              aria-label="Edit"
              size="large"
              id="Edit_BTN"
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              onClick={() => {
                const rowData = getDataById(id);
                if (rowData) {
                  setSelectedClientData(rowData);
                  setClientPopupOpen(true);
                } else {
                  console.log('Data not found for the specified ID.');
                }
              }}
              aria-label="consult"
              size="large"
            >
>>>>>>> origin/takwa
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
        <h2>CLIENT</h2>
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box display="flex"></Box>
          <Box>
            <Button
              onClick={handleOpen}
              size="small"
              sx={{
                backgroundColor: colors.greenAccent[500],
                '&:hover': {
                  backgroundColor: colors.greenAccent[700],
                },
              }}
              variant="contained"
            >
<<<<<<< HEAD
              Ajout Client
=======
              Ajouter un client
>>>>>>> origin/takwa
              <Box width="5px"></Box>
              <AddCircleOutlineOutlinedIcon fontSize="medium" />
            </Button>
          </Box>
        </Box>

        <Box
<<<<<<< HEAD
         
=======
>>>>>>> origin/takwa
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
            rows={entreprises}
            columns={columns}
            sortModel={[{ field: 'id_e', sort: 'desc' }]}
            getRowId={(row) => row.id}
            getRowData={(params) => params.row}
<<<<<<< HEAD
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
              handleOpenEdit();
            }}
            pagination
            pageSize={10}
          />
          <EditForm isOpenEdit={isOpenEdit} onCloseEdit={handleCloseEdit} selectedData={data} />
        </Box>
      </Box>
=======
            pagination
            pageSize={10}
          />
        </Box>
      </Box>

      {/* Display ClientPopup */}
      {isClientPopupOpen && (
        <ClientPopup
          isOpen={isClientPopupOpen}
          onClose={() => setClientPopupOpen(false)}
          clientData={selectedClientData}
        />
      )}

      <EditFormController isOpenEdit={isOpenEdit} onCloseEdit={handleCloseEdit} selectedData={data} />
>>>>>>> origin/takwa
      <FormPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

<<<<<<< HEAD
export default ListEntrepriseView;
=======
export default ListEntrepriseView;
>>>>>>> origin/takwa
