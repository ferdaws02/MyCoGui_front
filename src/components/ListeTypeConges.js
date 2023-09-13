import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const SelectTypeConge= ({ selectedOption, handleOptionChange }) => {
    const [options, setOptions] = useState([]);
    const [optionselected, setOptionselected] = useState([]);
   
  
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        
    
          fetch('/ref/AfficherTypeConge') // Remplacez l'URL par l'URL de votre API
      .then(response => response.json())
      .then(data => {
        // Les données récupérées doivent être au format : [{ id: 1, nom: 'John', prenom: 'Doe' }, ...]
        const optionsData = data.map(TConge => ({
          value: TConge.id_tco,
          label: `${TConge.type}`,
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
      <FormControl sx={{mt:2,width: '80ch' ,
      '& .MuiSelect-standard':'standard'}}
    
       >
        <InputLabel id="simple-select-label" color='info' >Type Congé</InputLabel>
        <Select 
        variant='outlined'
        label='Type Congé'
        color="info"
        id="simple-select"
        fullWidth
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
  
  export default SelectTypeConge;
    