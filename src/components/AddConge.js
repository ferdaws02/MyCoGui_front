import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  MenuItem
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import UserIdInput from './UserIdInput';
import SelectTypeConge from './ListeTypeConges';
import axios from 'axios'
import { postData } from '../Api';
import { ToastContainer, toast } from 'react-toastify';
const AddConge = ({ open, onClose }) => {


  const [selectedDate1, setSelectedDate1] = useState(null);
  const [selectedDate2, setSelectedDate2] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [etatConge, setEtatConge] = useState('validation_client');
  const [userId, setUserId] = useState('');
  const handleFieldChange = (fieldValues) => {
    setUserId(fieldValues.userId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure 2-digit month
    const day = String(date.getDate()).padStart(2, '0'); // Ensure 2-digit day
    return `${year}-${month}-${day}`;
  };

  const handleButtonClick = async() => {
    const DatatoSend = {
      consultant:{idc:userId} ,
      ddconge:  formatDateToYYYYMMDD(selectedDate1),
      dfconge: formatDateToYYYYMMDD(selectedDate2),
      // etat: etatConge,
      typeConge:{type:selectedOption} ,

    };
    try {
      const response = await postData('/Conge/AddConge', DatatoSend 
      , {
       headers: {
         'Content-Type': 'application/ json;charset=UTF-8' ,
       },
     });
    
     if (response.ok) {
      toast.success('Données enregistrées avec succès');
      // Handle successful submission
      console.log('Data submitted successfully '+DatatoSend.type);
     
      onClose(); // Close the dialog box
 
      window.location.reload();
 
    } else {
      toast.error('vérifier vos données');
      throw new Error('Error submitting data '+DatatoSend.type);
    }
  } catch (error) {
    // Handle error
    console.error('Error submitting data:', error);
  }
 }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter Conge</DialogTitle>
      <DialogContent>
        <UserIdInput onFieldChange={handleFieldChange} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="ddconge"
            value={selectedDate1}
            onChange={(date) => setSelectedDate1(date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
          <DatePicker
            label="Date Picker 2"
            value={selectedDate2}
            onChange={(date) => setSelectedDate2(date)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>
        <div>
          <SelectTypeConge handleOptionChange={handleOptionChange} />
        </div>
        {/* <TextField
          label="État Congé"
          value="validation_client"
          onChange={(e) => setEtatConge(e.target.value)}
          fullWidth
          margin="normal"
        /> */}
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="text" onClick={onClose}>
          Close
        </Button>
        <Button color="info" variant="text" autoFocus onClick={handleButtonClick}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddConge;