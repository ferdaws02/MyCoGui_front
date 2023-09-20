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
import axios from 'axios';

const UpdateConge = ({ open, onClose,data }) => {
    const [userId, setUserId] = useState('');
    const [userNom, setUserNom] = useState('');
    const [userPrenom, setUserPrenom] = useState('');
   
    const [selectedDate1, setSelectedDate1] = useState(data.ddconge);
    const [selectedDate2, setSelectedDate2] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const handleFieldChange = (fieldValues) => {
        // Update the state in the parent component with the new values from the child
        setUserId(fieldValues.userId);
        setUserNom(fieldValues.userNom);
        setUserPrenom(fieldValues.userPrenom);
      };
    
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
       
      }
    //   const handleInputChangeddn = (date) => {
  
    //     setFormData({
    //       ...formData,
    //       ddn_c: date,
    //     });
    //     // Additional logic or actions with the selected date
    //   };
  
    const handleButtonClick = () => {
      // Handle the button click here
      const dataToSend = {
        id_co:data.id_co,
        consultant :{idc:userId},
        ddconge:selectedDate1,
        dfconge:selectedDate2,
        typeConge:{type:selectedOption},
      };
      axios
      .put('/Conge/updateConge', dataToSend)
      .then((response) => {
        console.log('Data sent to the database successfully:', response.data);
        // Optionally, you can perform additional actions after the data is successfully sent
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error while sending data to the database:', error);
      });
      onClose(); // Close the dialog after form submission
    };
  
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Ajouter Conge</DialogTitle>
        <DialogContent>
        <TextField
        variant="outlined"
        color="info"
        id="id"
        type="text"
        name="userId"
        value={data.id_co}
        fullWidth
        margin="normal"
        disabled
       hidden
      />
      <UserIdInput onFieldChange={handleFieldChange}  />
    
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Picker 1"
              value={selectedDate1}
              onChange={(date) => setSelectedDate1(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
            <DatePicker
              label="Date Picker 2"
              value={selectedDate2}
              onChange={(date) => setSelectedDate2(date)}
              renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
            />
          </LocalizationProvider>
          <div>  < SelectTypeConge handleOptionChange={handleOptionChange}/></div>
       
        </DialogContent>
        <DialogActions>
        <Button  color="inherit" variant="text"onClick={onClose}>
          Close
        </Button>
        <Button color="info" variant="text" autoFocus onClick={handleButtonClick}>
          Save
        </Button>
      </DialogActions>
      </Dialog>
    );
  };

export default UpdateConge;