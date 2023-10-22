import React from 'react';

import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Box,TextField} from '@mui/material';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
const EditFormView = ({ isOpenEdit, onCloseEdit, selectedData,onDataChange 
    , nomentreprise,pays, adresse,handleSubmit,handleInputChange}) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return(
    <Dialog open={isOpenEdit} onClose={onCloseEdit}  fullWidth
    maxWidth="sm">
      <DialogTitle fontStyle={colors.grey[800]} important>Modifier Client</DialogTitle>
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
        label="Nom de l'entreprise"
        name='nomentreprise'
        value={nomentreprise}
        color= "info"
        variant='standard'
        onChange={handleInputChange}
     
       
      />
     
       <TextField
        required
        id="outlined-required"
        label="Pays"
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
export default EditFormView;