import React ,{useState,useEffect}from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import SelectOptionsbyname from'./SelectEntreprisebyname';
import axios from 'axios';

const AjoutProject = ({ isOpen, onClose}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [titre, setTitre] = useState('');
    const [description, setdescription] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
  

    useEffect(() => {
     
     
    }, []);
    
   
    const handleSubmit = (event) => {
      const dataToSend = {
        titre :titre,
        description:description,
        entreprise:{nomentreprise:entreprise},
      };
      axios
      .post('/ajoutProjet', dataToSend)
      .then((response) => {
        console.log('Data sent to the database successfully:', response.data);
        // Optionally, you can perform additional actions after the data is successfully sent
      })
      .catch((error) => {
        console.error('Error while sending data to the database:', error);
      });
      onClose(); // Close the dialog after form submission
    };
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      if (name === 'titre') {
        setTitre(value);
      } else if (name === 'description') {
        setdescription(value);
      } else if (name === 'entreprise') {
        setEntreprise(value);
      }
    };


    const handleOptionChange = (event) => {
      //  setSelectedOption(event.target.value);
      // console.log("****the selectedOPtion in the handle  "+selectedOption)
      setEntreprise(event.target.value);
      console.log("****the selectedOPtion in the handle  "+entreprise.id_e)
    };
  
    return (
      <Dialog open={isOpen} onClose={onClose}  fullWidth
      maxWidth="sm">
        <DialogTitle fontStyle={colors.grey[800]} important>Edit Project</DialogTitle>
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
          name='titre'
          value={titre}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
       
         
        />
       
         <TextField
          required
          id="outlined-required"
          label="description"
          name='description'
          value={description}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
          
        />
        </div>
        <div>
      
       <SelectOptionsbyname   selectedOption={entreprise} handleOptionChange={handleOptionChange} />
 
      
        </div>
      
        
   
       
        </form>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit" variant="text">
            Close
          </Button>
          <Button color="info" variant="text" autoFocus onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default AjoutProject ;