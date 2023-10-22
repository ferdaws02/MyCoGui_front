import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField } from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { postData } from '../Api';

const AddForm = ({ isOpenEdit, onCloseEdit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    type: ""
  });
 
  const handleSubmit = async (event) => {
    event.preventDefault();
  const DatatoSend = {
    type: formData.type,
   
   };
 try {
   const response = await postData('/ref/TypeConge', DatatoSend 
    , {
     headers: {
       'Content-Type': 'application/ json;charset=UTF-8' ,
     },
   });
   if (response.ok) {
     // Handle successful submission
     console.log('Data submitted successfully '+DatatoSend.type);

     onCloseEdit(); // Close the dialog box

     window.location.reload();

   } else {
     throw new Error('Error submitting data '+DatatoSend.type);
   }
 } catch (error) {
   // Handle error
   console.error('Error submitting data:', error);
 }
}


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log('**************the type value',formData.type)
  };

  return (
    <Dialog open={isOpenEdit} onClose={onCloseEdit} fullWidth maxWidth="sm">
      <DialogTitle fontStyle={colors.grey[800]} important>Ajouter Type Congét</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 1, mb: 1, mr: 5, ml: 10, width: '50ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                required
                id="outlined-required"
                label="Type Congé"
                name='type'
                value={formData.type}
                color="info"
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

export default AddForm;
