import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = ({ children, onClose, ...other }) => {
  return (
    <Dialog onClose={onClose} maxWidth="md" fullWidth {...other}>
      {children}
    </Dialog>
  );
};

BootstrapDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const BootstrapDialogTitle = ({ children, onClose, ...other }) => {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ClientPopup = ({ isOpen, onClose, clientData }) => {
  return (
    <BootstrapDialog onClose={onClose} open={isOpen}>
      <BootstrapDialogTitle onClose={onClose}>Client Details</BootstrapDialogTitle>
      <DialogContent>
        {clientData && (
          <div>
            <strong>ID: {clientData.id_e}</strong>
            <p>Name: {clientData.nomentreprise}</p>
            <p>Adresse: {clientData.adresse}</p>
            <p>Country: {clientData.pays}</p>
            {/* Display other client properties as needed */}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

ClientPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  clientData: PropTypes.object, // Define the shape of clientData here
};

export default ClientPopup;
