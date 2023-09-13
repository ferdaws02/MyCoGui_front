import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField } from '@mui/material';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';
import { putData } from '../Api';
import axios from 'axios';

const ModifTConge = ({ isOpenEdit, onCloseEdit, selectedData }) => {
  const [type, setType] = useState(selectedData.type);
  const theme = useTheme();
   
  const colors = tokens(theme.palette.mode);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'type') {
      setType(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const modifiedData = {
      id_tco: selectedData.id_tco,
     type: type}
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

  return (
  
      <Dialog
        open={isOpenEdit}
        onClose={onCloseEdit}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle fontStyle={colors.grey[800]} important>
          Edit Client
        </DialogTitle>
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
                  name="idtco"
                  label="id"
                  value={selectedData.idtco}
                  color="info"
                  variant="standard"
                  hidden
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Type Congé"
                  name="type"
                  value={type}
                  color="info"
                  variant="standard"
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
