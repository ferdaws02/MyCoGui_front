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

const FormPopupView = ({
  isOpen,
  onClose,
  nomentreprise,
  pays,
  adresse,
  handleNomentrepriseChange,
  handlePaysChange,
  handleAdresseChange,
  resetForm,
  handleSubmit,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontStyle={colors.grey[800]} important>
        Ajouter Client
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
              label="Nom de l'entreprise"
              color="info"
              variant="standard"
              onChange={handleNomentrepriseChange}
              value={nomentreprise}
            />

            <TextField
              required
              id="outlined-required"
              label="Pays"
              color="info"
              variant="standard"
              onChange={handlePaysChange}
              value={pays}
            />

            <TextField
              required
              id="outlined-required"
              label="Adresse"
              color="info"
              variant="standard"
              width="50ch"
              onChange={handleAdresseChange}
              value={adresse}
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

export default FormPopupView;
