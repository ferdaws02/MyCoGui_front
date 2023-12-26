import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const SelectOptions = ({ selectedOption, handleOptionChange }) => {
    const [options, setOptions] = useState([]);
    const [optionselected, setOptionselected] = useState([]);
   
  
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
        try {
          // Make a request to your backend API endpoint
          const response = await fetch('/listeDesEntreprises');
    
          if (response.ok) {
            const jsonData = await response.json();
            // Add a unique 'id' property to each row
            const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
            setOptions(rowsWithIds);
          } else {
            console.error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error while fetching data:', error);
        }
      };
    
      const handleChange = (event) => {
        setOptionselected(event.target.value);
        handleOptionChange(event);

        console.log('/////fil handle fil select'+optionselected)

      };
  
    return (
      <FormControl sx={{mt:1,mb:1,mr:5,ml:10, width: 300 ,
      '& .MuiSelect-standard':'standard'}}
    
       >
        <InputLabel id="simple-select-label" color='info' sx={{ml:5,mr:10,mt:2}}>Entreprise Client</InputLabel>
        <Select 
        variant='outlined'
        label='Entreprise Client'
        color="info"
        id="entreprise"
        sx={{ml:5,mt:2,mr:8}} 
        value={optionselected}
         onChange={handleChange}
       >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id_e}>
              {option.nomentreprise}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export default SelectOptions;