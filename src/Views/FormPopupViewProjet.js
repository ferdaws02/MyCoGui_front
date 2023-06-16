// FormPopupView.js

import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from '@mui/material';
import { tokens } from '../theme';
import { useTheme } from '@mui/material';

const FormPopupViewProjet = ({
  isOpen,
  onClose,
  entreprise_id_e,
  titre,
  description,
  handleentreprise_id_eChange,
  handleTitreChange,
  handleDescriptionChange,
  resetForm,
  handleSubmit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontStyle={colors.grey[800]} important>
        Add Project
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
          <div>
        

            <TextField
              required
              id="outlined-required"
              label="description"
              color="info"
              variant="standard"
              onChange={handleDescriptionChange}
              value={description}
            />

            <TextField
              required
              id="outlined-required"
              label="titre"
              color="info"
              variant="standard"
              width="50ch"
              onChange={handleTitreChange}
              value={titre}
            />
                <TextField
              required
              id="outlined-required"
              label="entreprise"
              color="info"
              variant="standard"
              onChange={handleentreprise_id_eChange}
              value={entreprise_id_e}
            />
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          resetForm();
          onClose();
        }} color="inherit" variant="text">
          Close
        </Button>
        <Button onClick={handleSubmit} color="info" variant="text" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPopupViewProjet;
