import React from 'react';
import  { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import {putData} from '../Api';
const AddForm = ({ isOpenEdit, onCloseEdit,}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [Type,setType]=useState('')
   
    const onSubmit=(event)=>{
        event.preventDefault();
              
        const AccountData = {
          type:Type}
          fetch('/ref/TypeConge', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(AccountData ),
          })
            .then((response) => response.json())
            .then((data) => {
              // Traiter la réponse de la requête
              console.log(data);
            })
            .catch((error) => {
              // Gérer les erreurs
              console.error(error);
            });
            window.location.reload(); 
      
      }
        const handleInputChange =(event)=>{
          const value = event.target.value;
          setType( value );
         
          console.log("fil handle  " + Type.type);
        };
        
        
  

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
    <form onSubmit={onSubmit}>
    <div>
       
  
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
        <Button color="info" variant="text" autoFocus onClick={onSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddForm;