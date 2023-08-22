import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const SelectMC = ({ selectedOption, handleOptionChange }) => {
    const [options, setOptions] = useState([]);
    const [optionselected, setOptionselected] = useState([]);
   
  
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        
    
          fetch('/MC/ListeMCs') 
      .then(response => response.json())
      .then(data => {
        // Les données récupérées doivent être au format : [{ id: 1, nom: 'John', prenom: 'Doe' }, ...]
        const optionsData = data.map(consultants => ({
          value: consultants.idc,
          label: `${consultants.nom_c} ${consultants.prenom_c}`,
        }));
        setOptions(optionsData);
      })
      .catch(error => console.error('Erreur lors de la récupération des données:', error));
      };
    
      const handleChange = (event) => {
        setOptionselected(event.target.value);
        handleOptionChange(event);
      };
  
    return (
      <FormControl sx={{mt:1,mb:1,mr:5,ml:5, width: '66ch' ,
      '& .MuiSelect-standard':'standard'}}
    
       >
        <InputLabel id="simple-select-label" color='info' sx={{ml:5,mr:10,mt:2}}>Manager_Client</InputLabel>
        <Select 
        variant='outlined'
        label='Consultants'
        color="info"
        id="simple-select"
        sx={{ml:5,mt:2,mr:8}} 
        value={optionselected}
         onChange={handleChange}
       >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export default SelectMC;
    