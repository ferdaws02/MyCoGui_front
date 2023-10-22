import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { Button,Box,IconButton} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';
import ValidationButton from './validation button/ValidationButton';
import axios from 'axios'; 
import ValidationButtonODM from './validation button/validationbuttonforODM';
import ValidationButtonNDF from './validation button/validationButtonNDF';


const ListNDF= () => {
    const [ndf, setNDF] = useState([]);
    const [data, setData] = useState('');
  const [roles, setRoles] = useState('');
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleDataChange = (newData) => {
        setData(newData);}
    useEffect(() => {
        // Fetch data from the backend and update the state
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          // Make a request to your backend API endpoint
          const response = await fetch('/ODM/showNDF');
    
          if (response.ok) {
            const jsonData = await response.json();
            // Add a unique 'id' property to each row
            const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
            setNDF(rowsWithIds);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error while fetching data:', error);
        }
      };
      const getDataById = (id) => {
        const row = ndf.find((row) => row.id_ndf === id);
            return row ? row : null;
      }
      
      const handleValidation = (id) => {
        const rowData = getDataById(id);
        console.log("********************the validation")
        if (rowData) {
          // Update the "etat" field to "valider" for the specified row
          const updatedRow = { ...rowData, etat: 'valider' };
    
          // Update the "conges" state with the updated row
          const updatedConges =ndf.map((row) => (row.id_ndf === id ? updatedRow : row));
          setNDF(updatedConges);
    
          // Send the updated row to the backend
          // ... (Your fetch code to update the row in the backend) ...
        } else {
          console.log('Data not found for the specified ID.');
        }
      };
      const handleCancellation = (id) => {
       
          const rowData = getDataById(id);
          if (rowData) {
         console.log("the rowdatat*********",rowData)
            // const updatedConges = conges.map((row) => (row.id_odm === id ? updatedRow : row));
         
            // Envoyer les modifications à la base de données via une requête API Axios
            axios.put(`/ODM/anuuleStatus`, rowData)
              .then((response) => {
                if (response.status === 200) {
                  console.log('La mise à jour a été effectuée avec succès');
                  window.location.reload();
                } else {
                  console.error('Échec de la mise à jour');
                }
              })
              .catch((error) => {
                console.error('Erreur lors de la mise à jour:', error);
              });
          } else {
            console.log('Data not found for the specified ID.');
          }
        };



        useEffect(() => {
           axios.get('/api/get-profile')
             .then((response) => {
               console.log(response)
               if (response.status === 200) {
                   setRoles(response.data.roles);
                  
               } else {
                 console.error('Failed to fetch user ID');
               }
             })
             .catch((error) => {
               console.error('Error while fetching data:', error);
             });
         }, []);
       
      
  const isConsultant = (roles) => {
    console.log("+++++++++++++the role is " + roles );
    
    // Check if the user is a Consultant or Manager_Client with status not validation_client
    if (roles === 'Consultant') {
      return false; }
      else{
        return true;
      }
    }

    const navigate = useNavigate();
    const handleOpen = () => {
      navigate('/AddODM'); 
    };
    const columns = [
        { field: 'id_ndf', headerName: 'ID', width: 70 },
        { field: 'fraiskm', headerName: 'FRAIS', width: 150},
       
        { field: 'kmJour', headerName: 'KM/J', width: 100 },
        { field: 'nbrJRSURsit', headerName: 'NBR JOUR', width: 100 },
       
        { field: 'somme', headerName: 'SOMME', width: 150},
        { field: 'statusNdf', headerName: 'STATUS', width: 150},
           
        {
          headerName: "ACTION",
          flex: 1,
          renderCell: (params)  => {
            const id = params.row.id_ndf; // Get the ID from the 'id_c' field
           
            return (<Box display="flex"  mt="15px">
                       <IconButton  aria-label="Edit" size="large" id="Edit_BTN">
                      <EditOutlinedIcon fontSize="small"  />
                      </IconButton>
                      <IconButton aria-label="consult" size="large">
                      <VisibilityOutlinedIcon fontSize="small" color="info" />
                      </IconButton>
                       <ValidationButtonNDF id_ndf={id} onRefrech={handleValidation} etat={params.row.statusNdf}/>
                      <IconButton aria-label="Annulation" size="large" id="Validate_BTN"  onClick={() => handleCancellation(id)}>
                      <HighlightOffOutlinedIcon fontSize="medium" color='error' />
                      </IconButton>
                     </Box>
            )},
          },
    ]
    return(<div>
        <Box m="20px">
            <h2>Note De Frais</h2>
            <Box display="flex" justifyContent="space-between" p={2}>
            <Box
               display="flex"
              
             >
               </Box>
               <Box>
               <Button
  size="small"
  sx={{
    backgroundColor: colors.greenAccent[500],
    '&:hover': {
      backgroundColor: colors.greenAccent[700]
    },
  }}
  variant="contained"
  onClick={handleOpen}
  disabled={isConsultant(roles)}// Condition pour désactiver le bouton si c'est un consultant
>
  Ajout NDF
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
               <DataGrid rows={ndf} columns={columns} sortModel={[{ field: 'id_ndf', sort: 'desc' }]} 
              getRowId={(row) => row.id_ndf} // Specify the ID field
              getRowData={(params) => params.row} // Retrieve the row data
              onRowClick={(params) => {
                const id = params.row.id_ndf;
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
          
          {/* <AddConge open={dialogOpen} onClose={handleCloseDialog} /> */}
             </Box>
             </Box>
             {/* <FormPopup isOpen={isOpen} onClose={handleClose} /> */}
             
             </div>);
    
};

export default ListNDF ;