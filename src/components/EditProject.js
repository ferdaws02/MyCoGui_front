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
    const [entreprise, setEntreprise] = useState(rowData.entreprise);
    const [selectedOption, setSelectedOption] = useState(rowData.entreprise);
  

    useEffect(() => {
      if (rowData) {
        console.log(rowData.entreprise.nomentreprise);
        var x = rowData.entreprise.nomentreprise;
        setTitre(rowData.titre);
        setdescription(rowData.description);
        setEntreprise(x);
        console.log("Entreprise geted"+rowData.entreprise.nomentreprise)
       
      }
    }, [rowData]);
    
   
    const handleSubmit = (event) => {
      event.preventDefault();
      const modifiedData = {
        id_p: rowData.id_p,
        titre,
        description,
        entreprise:{id_e:entreprise}       

      };
      console.log(modifiedData)
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
            onCloseEditProject(); // Close the dialog box
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

    };
  
    return (
      <Dialog open={isOpenEditProject} onClose={onCloseEditProject}  fullWidth
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
          label="description"
          name='description'
          value={description}
          color= "info"
          variant='standard'
          onChange={handleInputChange}
          
        />
        </div>
        <div>
      
       <SelectOption   selectedOption={entreprise} handleOptionChange={handleOptionChange} />
 
      
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