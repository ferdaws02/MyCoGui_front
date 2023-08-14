import React, { useState } from 'react';
import { useTheme } from '@mui/material';
import { Button, Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from '../theme';
import FormPopup from '../Controllers/FormPopupProjectController';
import EditFormProject from '../components/EditProject';
import ProjectPopup from './ProjectPopup';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
  const [isProjectPopupOpen, setProjectPopupOpen] = useState(false);
  const [selectedProjectData, setSelectedProjectData] = useState(null);

  const columns = [
    { field: 'id_p', headerName: 'ID', width: 70 },
    { field: 'titre', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'entreprise', headerName: 'Entreprise', width: 200, valueGetter: (params) => params.row.entreprise?.nomentreprise || '' },
    {
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => {
        const id = params.row.id_p;

        return (
          <Box display="flex" mt="15px">
            <IconButton
              onClick={() => {
                const rowData = getDataById(id);
                if (rowData) {
                  setSelectedProjectData(rowData);
                  setProjectPopupOpen(true);
                } else {
                  console.log('Data not found for the specified ID.');
                }
              }}
              aria-label="consult"
              size="large"
            >
              <VisibilityOutlinedIcon fontSize="small" color="info" />
            </IconButton>
            <IconButton
              onClick={() => {
                const rowData = getDataById(id);
                if (rowData) {
                  setSelectedProjectData(rowData);
                  setProjectPopupOpen(false); // Close ProjectPopup
                  handleDataChange(rowData);
                  handleOpenEdit(); // Open EditFormProject
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
              Ajouter un Projet
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
            pagination
            pageSize={10}
          />
          {isProjectPopupOpen && (
            <ProjectPopup isOpen={isProjectPopupOpen} onClose={() => setProjectPopupOpen(false)} projectData={selectedProjectData} />
          )}
          <EditFormProject isOpenEditProject={isOpenEdit} onCloseEditProject={handleCloseEdit} rowData={data} />
        </Box>
      </Box>
      <FormPopup isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default ListProjetView;