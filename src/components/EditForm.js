import React ,{useState,useEffect}from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
const EditForm = ({ isOpenEdit, onCloseEdit, selectedData,onDataChange }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [nomentreprise, setNomentreprise] = useState('');
    const [pays, setPays] = useState('');
    const [adresse, setAdresse] = useState('');
  //  const [formData, setFormData] = useState({selectedData });
  
  useEffect(() => {
    if (selectedData) {
      setNomentreprise(selectedData.nomentreprise);
      setPays(selectedData.pays);
      setAdresse(selectedData.adresse);
    }
  }, [selectedData]);

   
    const handleSubmit = (event) => {
      event.preventDefault();
      const modifiedData = {
        id_e: selectedData.id_e,
        nomentreprise,
        pays,
        adresse
      };
      fetch('/ModifierEntreprise', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData),
      })
        .then(response => {
          if (response.ok) {
            // Handle successful submission
            console.log('Data submitted successfully');
            onCloseEdit(); // Close the dialog box
            window.location.reload(); // Refresh the page
           
          } else {
            throw new Error('Error submitting data');
          }
        })
        .catch(error => {
          // Handle error
          console.error('Error submitting data:', error);
        });
       
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === 'nomentreprise') {
        setNomentreprise(value);
      } else if (name === 'pays') {
        setPays(value);
      } else if (name === 'adresse') {
        setAdresse(value);
      }
    };


    return (
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
          name='id_e'
          label="id"
          value={selectedData.id_e}
          color= "info"
          variant='standard'
         
          hidden
        />
        <TextField
       
          required
          id="outlined-required"
          label="Name"
          name='nomentreprise'
          value={nomentreprise}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
       
         
        />
       
         <TextField
          required
          id="outlined-required"
          label="Country"
          name='pays'
          value={pays}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
          
        />
       
        <TextField
          required
          id="outlined-required"
          label="Adresse"
          name='adresse'
          value={adresse}
          color= "info"
          variant='standard'
          width= '50ch'
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




export default EditForm;