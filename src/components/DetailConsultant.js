import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: theme.spacing(3), // Set the border radius for the popup
    width: '600px', // Set the width of the popup
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    justifyContent: 'flex-start',
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

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
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const DetailConsultant = ({ consultant, onClose }) => {
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={true}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Détails de profile
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {/* Render the details of the selected consultant here */}
        {/* You can access the properties of the selected consultant using the 'consultant' prop */}
        {consultant && (
          <div>
            {/* Render the image if available */}
            {consultant.photo_c && (
              <img
                src={`data:image/jpeg;base64,${consultant.photo_c}`}
                alt="Consultant's Photo"
                style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%' }}
              />
            )}
            <Typography gutterBottom variant="h6" >
            <strong>ID:</strong> {consultant.idc}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Nom:</strong> {consultant.nom_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Prénom:</strong> {consultant.prenom_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> CIN: </strong>{consultant.cin_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Adresse: </strong> {consultant.adresse_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Date de naissance:</strong> {new Date(consultant.ddn_c).toLocaleDateString()}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Sexe: </strong>{consultant.sexe_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Numéro de téléphone:</strong> {consultant.num_tel_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> État:</strong> {consultant.etat}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Email: </strong>{consultant.emailc}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Rôles:</strong> {consultant.roles}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Mot de passe:</strong> {consultant.mdp_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Service Manager: </strong>{consultant.serviceManager}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Poste:</strong> {consultant.post_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Pôle:</strong> {consultant.pole_c}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Status:</strong> {consultant.status}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Date début d'affiliation au projet: </strong> {consultant.ddaff_projet}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong>Date fin d'affiliation au projet:</strong> {consultant.dfaff_projet}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Solde congé maladie: </strong>{consultant.soldecongémaladie}
            </Typography>
            <Typography gutterBottom variant="h6">
            <strong> Projet Affecter: </strong>{consultant.projet.titre}
            </Typography>
            
           </div>)}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} color="secondary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default DetailConsultant;
