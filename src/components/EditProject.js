import React ,{useState,useEffect}from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import SelectOption from'../components/SelectEntreprise';
const EditProject = ({ isOpenEditProject, onCloseEditProject, rowData}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [titre, setTitre] = useState('');
    const [description, setdescription] = useState('');
    const [entreprise, setEntreprise] = useState('');
    const[data,setData]=useState([]);
    const [selectedOption, setSelectedOption] = useState('')

    useEffect(() => {
      if (rowData) {
        console.log(rowData.entreprise.id_e);
        var x = rowData.entreprise.id_e;
        setTitre(rowData.titre);
        setdescription(rowData.description);
        setEntreprise(x);
         //retrieveData()
      }
    }, [rowData]);
    
   
    const handleSubmit = (event) => {
      event.preventDefault();
      const modifiedData = {
        id_p: rowData.id_p,
        titre,
        description,
        entreprise       
      };
      console.log(modifiedData.entreprise.id_e)
      fetch('/modifierProjet', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(modifiedData),
      })
        .then(response => {
          if (response.ok) {
            // Handle successful submission
            console.log('Data submitted successfully ');
            //onCloseEditProject(); // Close the dialog box
            //window.location.reload(); // Refresh the page
           
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
      if (name === 'titre') {
        setTitre(value);
      } else if (name === 'description') {
        setdescription(value);
      } 
    };


    const handleOptionChange = (selectedOption) => {
      setSelectedOption(selectedOption);
      // Process the selected option in the parent component
      console.log('Selected option:', selectedOption);
    }
    return (
      <Dialog open={isOpenEditProject} onClose={onCloseEditProject}  fullWidth
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
          name='id_p'
          label="id"
          value={rowData.id_p}
          color= "info"
          variant='standard'
         
          hidden
        />
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
          label="Country"
          name='description'
          value={description}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
          
        />
        </div>
        <div>
      
       <SelectOption onOptionChange={handleOptionChange} />
 
      
        </div>
      
        
   
       
        </form>
        </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseEditProject} color="inherit" variant="text">
            Close
          </Button>
          <Button color="info" variant="text" autoFocus onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

export default EditProject;