import React ,{useState}from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
const FormPopup = ({ isOpen, onClose }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [nomentreprise, setNomentreprise] = useState('');
    const [pays, setPaye] = useState('');
    const [adresse, setAdresse] = useState('');

const handleNomentrepriseChange = event => {
  setNomentreprise(event.target.value);
};

const handlePayeChange = event => {
  setPaye(event.target.value);
};

const handleAdresseChange = event => {
  setAdresse(event.target.value);
};
const handleSubmit = event => {
  event.preventDefault();

  const clientData = {
    nomentreprise,
    adresse,
    pays,
  };
  
      fetch('/ajouter_Entreprise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData),
      })
        .then(response => {
          if (response.ok) {
            // Handle successful submission
            console.log('Data submitted successfully');
            onClose(); // Close the dialog box
            window.location.reload(); // Refresh the page
           
          } else {
            throw new Error('Error submitting data');
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error submitting data:', error);
        });
        setNomentreprise('');
        setAdresse('');
         setPaye('');
    };
    return (
      <Dialog open={isOpen} onClose={onClose}  fullWidth
      maxWidth="sm">
        <DialogTitle fontStyle={colors.grey[800]} important>Add Client</DialogTitle>
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
          label="Name"
          defaultValue=""
          color= "info"
          variant='standard'
          onChange={handleNomentrepriseChange}
         // value={formData.nomentreprise}
         
        />
       
         <TextField
          required
          id="outlined-required"
          label="Country"
          defaultValue=""
          color= "info"
          variant='standard'
          onChange={handlePayeChange}
          
        />
       
        <TextField
          required
          id="outlined-required"
          label="Adresse"
          defaultValue=""
          color= "info"
          variant='standard'
          width= '50ch'
          onChange={handleAdresseChange}
         
        />
       
        
   
        </div>
        </form>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="text">
            Close
          </Button>
          <Button onClick={handleSubmit} color="info" variant="text" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };




export default FormPopup;