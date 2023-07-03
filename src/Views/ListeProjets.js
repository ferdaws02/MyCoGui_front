import React from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';
import FormPopup from '../Controllers/FormPopupProjectController';
import EditFormProject from '../components/EditProject';
import {useState}from 'react';

const ListProjetView = ({
  projets,
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
  const [Data, setData] = useState('');
  const columns = [
    { field: 'id_p', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'entreprise', headerName: 'Entreprise', width: 200 , valueGetter: (params) => params.row.entreprise?.nomentreprise || ''},
   
   
    {
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" mt="15px">
            <IconButton onClick={handleOpenEdit} aria-label="Edit" size="large" id="Edit_BTN">
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
        <h3>PROJECTS</h3>
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
              Add New Project
              <Box width="5px"></Box>
              <AddCircleOutlineOutlinedIcon fontSize="medium" />
            </Button>
          </Box>
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
            rows={projets}
            columns={columns}
            sortModel={[{ field: 'id_e', sort: 'desc' }]}
            getRowId={(row) => row.id}
            getRowData={(params) => params.row}
            onRowClick={(params) => {
              const id = params.row.id;
              const rowData = getDataById(id);
              if (rowData) {
                console.log('Data found:', rowData);
                const Data = rowData;
                console.log('Data :', Data);
                setData(Data)
                handleDataChange(Data);
              } else {
                console.log('Data not found for the specified ID.');
              }
              handleOpenEdit();
            }}
            pagination
            pageSize={10}
          />
          <EditFormProject isOpenEditProject={isOpenEdit} onCloseEditProject={handleCloseEdit} rowData={Data} />
        </Box>
      </Box>
      <FormPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default ListProjetView;