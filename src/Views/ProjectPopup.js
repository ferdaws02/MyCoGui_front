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

const ProjectPopup = ({ isOpen, onClose, projectData }) => {
  return (
    <BootstrapDialog onClose={onClose} open={isOpen}>
      <BootstrapDialogTitle onClose={onClose}>Détails d'un projet  </BootstrapDialogTitle>
      <DialogContent>
        {/* Display project data here */}
        {/* Example: */}
        <div>
        <strong>  <p>ID: {projectData?.id}</p></strong> 
        <strong>  <p>TITRE: {projectData?.titre}</p> </strong> 
        <strong>   <p>DESCRIPTION: {projectData?.description}</p> </strong> 
        <strong>   <p>ENTREPRISES: {projectData?.entreprise.nomentreprise}</p> </strong>
          {/* Display other project properties as needed */}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

ProjectPopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  projectData: PropTypes.object, // You can define the shape of projectData here
};

export default ProjectPopup;
