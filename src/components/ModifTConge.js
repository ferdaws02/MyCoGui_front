import React from 'react';
import  { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import {putData} from '../Api';
const ModifTConge = ({ isOpenEdit, onCloseEdit, selectedData,}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [Type,setType]=useState(selectedData.type)
   
    const handleSubmit = async (event) => {
        event.preventDefault();
        const modifiedData = {
          id_tco: selectedData.id_tco,
         type: Type}
         try {
            const response = await putData('/ref/updateTypeConge', modifiedData);
            if (response.ok) {
              // Handle successful submission
              console.log('Data submitted successfully');
               onCloseEdit(); // Close the dialog box
               window.location.reload(); // Refresh the page
            } else {
              throw new Error('Error submitting data');
            }
          } catch (error) {
            // Handle error
            console.error('Error submitting data:', error);
          }
        };
        const handleInputChange =(event)=>{
          const value = event.target.value;
          setType( value );
         
          console.log("fil handle  " + Type.type);
        };
        
        
   
    useEffect(() => {
        if (selectedData) {
          setType(selectedData.type);
       
        }
      }, [selectedData]);


    return(
    <Dialog open={isOpenEdit} onClose={onCloseEdit}  fullWidth
    maxWidth="sm">
      <DialogTitle fontStyle={colors.grey[800]} important>Edit Client</DialogTitle>
      <DialogContent>
      <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { mt:1,mb:1,mr:5,ml:10, width: '50ch' },
      
    }}
    noValidate
    autoComplete="off"
  >
    <form onSubmit={handleSubmit}>
    <div>
       
    <TextField
        required
        id="outlined-required"
        name='id_tco'
        label="id"
        value={selectedData.id_tco}
        color= "info"
        variant='standard'
       
        // hidden
      />
      <TextField
     
        required
        id="outlined-required"
        label="Type Congé"
        name='type'
        value={Type}
        color= "info"
        variant='standard'
         onChange={handleInputChange}
    
       
      />
     
      
 
      </div>
      </form>
      </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseEdit} color="inherit" variant="text">
          Close
        </Button>
        <Button color="info" variant="text" autoFocus onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ModifTConge;