import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SelectOptions from'./SelectEntreprise';
import {Grid,Box} from '@mui/material';

const  AccountTypeSelect=({onSelect })  =>{
  const [selectedValue, setSelectedValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [entreprise, setEntreprise] = useState('');
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    onSelect(value);
    console.log('Selected value:', value);
  
  };
  const handleOptionChange = (event) => {
    setEntreprise(event.target.value);
  }

  const handleChange = (event) => {
    const value = event.target.value;
    // Handle radio button change if needed
      // Show the dropdown if the selected value is "Client"
      setShowDropdown(value === 'Client');
      console.log(showDropdown)
  };
 

  return (
    <Box 
    component="form"
    >
      <FormControl sx={{position:'center',width: 300 }}>
        <InputLabel id="simple-select-label" color='info' sx={{ml:10,mt:3}}>Type de Compte</InputLabel>
        <Select
        sx={{ml:10,mt:3}}
          color="info"
          id="simple-select"
          value={selectedValue}
          label="Type de Compte"
          onChange={handleSelectChange}
        >
          <MenuItem value={"Consultant"}>Consultant</MenuItem>
          <MenuItem value={"Service_Manager"}>Service Manager</MenuItem>
          <MenuItem value={"RH"}>RH</MenuItem>
          <MenuItem value={"Comptable"}>Comptable</MenuItem>
          <MenuItem value={'Manager'}>Manager</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={2}>
      <Grid item>
        <item>
      {selectedValue === 'Manager' && (
        <FormControl component="fieldset">
          <RadioGroup  sx={{mt:4}}
            row
            aria-label="position"
            name="subType"
            onChange={handleChange}>
            <FormControlLabel value="Client" control={<Radio  color='info' />} label="Client" />
            <FormControlLabel value="Inetum" control={<Radio  color='info' />} label="Inetum" />
          </RadioGroup>
        </FormControl>
      )}</item><item>
      {showDropdown && (
        <SelectOptions handleOptionChange={handleOptionChange}/>
        )}
        </item>
        </Grid>
        </Grid>
    </Box>
  );
}

export default AccountTypeSelect;