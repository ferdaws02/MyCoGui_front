import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


const SelectOptions = () => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
  
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
      setSelectedOption(event.target.value);
    };
  
    return (
      <FormControl sx={{mt:1,mb:1,mr:5,ml:10, width: 300 }}
      >
        <Select value={selectedOption} onChange={handleChange}
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