import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { Button,Box,IconButton} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
const TableauAffectation = () => {

    const [data, setData] = useState([]);
    const [conges, setConges] = useState([]);
    const [aff, setAff] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 

 
  
  const handleDataChange = (newData) => {
    setData(newData);
  };
  useEffect(() => {
    // Fetch data from the backend and update the state
    fetchData();
    fetchDatat2();
  }, []);

  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('users');

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
        setConges(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
  const fetchDatat2 = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('/affectations/listeAffectationMI');

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, idrow: index + 1 }));
        setAff(rowsWithIds);
        console.log("the affectation data  "+aff.manager_id)
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
  const getDataById = (id) => {
    const row = conges.find((row) => row.idc === id);
        return row ? row : null;
  }
  
 
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/AddAffectaion'); 
  };
  const handleOpen2 = () => {
    navigate('/AddAffectationMI'); 
  };
 


// const id_p= conges.projet.id_p
  const columns = [
    { field: 'idc', headerName: 'ID', width: 70 },
    { field: 'ddaff_projet', headerName: 'DATE DEBUT', width: 150,
    valueGetter: (params) => {
      const date = new Date(params.row.ddaff_projet);
      return date.toLocaleDateString(); // Format de date lisible
    },},
    { field: 'dfaff_projet', headerName: 'DATE FIN', width: 150,
    valueGetter: (params) => {
      const date = new Date(params.row.dfaff_projet);
      return date.toLocaleDateString(); // Format de date lisible
    }, },
    { field: 'status', headerName: 'ETAT', width: 100 },
    {
      field: 'projet.id_p', // Access the nested property path
    headerName: 'PROJET',
    width: 150,
    valueGetter: (params) => {
      const projet = params.row.projet; // Get the "projet" object
      if (projet) {
        return projet.titre; // Return the ID if "projet" exists
      }
      return ""; // Return an empty string if "projet" is not defined
    }, },
    {
      field: 'managerclient.idc', // Access the nested property path
    headerName: 'MANAGER CLIENT',
    width: 150,
    valueGetter: (params) => {
      const enterprise = params.row.managerclient; // Get the "projet" object
      if (enterprise) {
        return enterprise.nom_c+" " +enterprise.prenom_c; // Return the ID if "projet" exists
      }
      return ""; // Return an empty string if "projet" is not defined
    },
  },
    {
      headerName: "ACTION",
      flex: 1,
      renderCell: (params)  => {
        const id = params.row.id_co; // Get the ID from the 'id_c' field
       
        return (<Box display="flex"  mt="15px">
                   <IconButton aria-label="Edit" size="large" id="Edit_BTN">
                  <EditOutlinedIcon fontSize="small"  />
                  </IconButton>
                  <IconButton aria-label="consult" size="large">
                  <VisibilityOutlinedIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton aria-label="Annulation" size="large" id="Validate_BTN"  >
                  <HighlightOffOutlinedIcon fontSize="medium" color='error' />
                  </IconButton>
                 </Box>
        )},
      },
       
  ];
  //AffectationMI

  const columnsaff = [
    { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'id.manager_id', headerName: 'Manager ID', flex: 1 ,
  valueGetter: (params) => params.row.id.manager_id,},
  { field: 'id.consultant_id', headerName: 'Consultant ID', flex: 1 ,
  valueGetter: (params) => params.row.id.consultant_id,},
  {
    field: 'aff_date',
    headerName: 'Aff Date',
    flex: 1,
    valueGetter: (params) => params.row.aff_date.join('/'),
  },

    {
      headerName: "ACTION",
      flex: 1,
      renderCell: (params)  => {
        const id = params.row.id_co; // Get the ID from the 'id_c' field
       
        return (<Box display="flex"  mt="15px">
                   <IconButton aria-label="Edit" size="large" id="Edit_BTN">
                  <EditOutlinedIcon fontSize="small"  />
                  </IconButton>
                  <IconButton aria-label="consult" size="large">
                  <VisibilityOutlinedIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton aria-label="Annulation" size="large" id="Validate_BTN"  >
                  <HighlightOffOutlinedIcon fontSize="medium" color='error' />
                  </IconButton>
                 </Box>
        )},
      },
       
  ];
return(<div>
 <Box m="20px">
  
     <h2 >Affectation Projet</h2>
     <Box display="flex" justifyContent="space-between" p={2}>
     <Box
        display="flex"
       
      >
        </Box>
        <Box>
     <Button onClick={handleOpen}  size="small"  sx={{
        backgroundColor: colors.greenAccent[500], 
        '&:hover': {
          backgroundColor: colors.greenAccent[700]
        },
      }}
     variant="contained"
        >
     Ajout Affectation
     <Box width="5px"></Box>
      <AddCircleOutlineOutlinedIcon  fontSize="medium" />
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
        <DataGrid rows={conges} columns={columns} sortModel={[{ field: 'idc', sort: 'desc' }]} 
       getRowId={(row) => row.idc} // Specify the ID field
       getRowData={(params) => params.row} // Retrieve the row data
       onRowClick={(params) => {
         const id = params.row.idc;
         const rowData = getDataById(id);
         if (rowData) {
           console.log('Data found:', rowData);
           const Data= rowData
           console.log('Data :', Data);

           handleDataChange (Data)
         
         } else {
           console.log('Data not found for the specified ID.');
         }
      
        
           
           //();
         }}
         pagination
         pageSize={10}
        
      />
   
{/* // ********************************** */}
      </Box>
      <Box></Box>
      <h2 style={{marginTop:2}}>Affectation MI</h2>
     <Box display="flex" justifyContent="space-between" p={2}>
     <Box
        display="flex"
       
      >
        </Box>
        <Box>
     <Button onClick={handleOpen2}  size="small"  sx={{
        backgroundColor: colors.greenAccent[500], 
        '&:hover': {
          backgroundColor: colors.greenAccent[700]
        },
      }}
     variant="contained"
        >
     Ajout Affectation MI
     <Box width="5px"></Box>
      <AddCircleOutlineOutlinedIcon  fontSize="medium" />
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
        <DataGrid rows={aff} columns={columnsaff} sortModel={[{ field: 'manager_id', sort: 'desc' }]} 
       getRowId={(row) => row.id} // Specify the ID field
       getRowData={(params) => params.row} // Retrieve the row data
       onRowClick={(params) => {
         const id = params.row.idc;
         const rowData = getDataById(id);
         if (rowData) {
           console.log('Data found:', rowData);
           const Data= rowData
           console.log('Data :', Data);

           handleDataChange (Data)
         
         } else {
           console.log('Data not found for the specified ID.');
         }
      
        
           
           //();
         }}
         pagination
         pageSize={10}
        
      />
   
  
      </Box>
      </Box>
      {/* <FormPopup isOpen={isOpen} onClose={handleClose} /> */}
      
      </div>);
};

export default TableauAffectation ;