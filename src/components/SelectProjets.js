import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select ,TextField ,Grid} from '@mui/material';
import SelectMC from './SelectMC'

const SelectProjets= ({ selectedOption, handleOptionChange,handleOptionMCChange}) => {
    const [options, setOptions] = useState([]);
    const [mcs, setMcs] = useState([]);
    const [optionselected, setOptionselected] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [selectedEnterprise, setSelectedEnterprise] = useState('');
    const handleOptionChangeMC = (event) =>{
      setMcs(event.target.value);
      handleOptionMCChange(event)
      console.log("the MC selected "+mcs)
    }
    useEffect(() => {
        fetchData();
    }, []);
  
    const fetchData = async () => {
      fetch('/ListeProjets')
        .then(response => response.json())
        .then(data => {
          const optionsData = data.map(projet => ({
            value: projet.id_p,
            label: projet.titre,
            relatedEnterpriseId: projet.entreprise.nomentreprise, // Replace with the actual property
          }));
          setOptions(optionsData);
        })
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
    };
      const handleChange = (event) => {
       
          const selectedProjectId = event.target.value;
          setSelectedProject(selectedProjectId);
        
          // Find the selected project's related enterprise
          const selectedProjectObj = options.find(option => option.value === selectedProjectId);
          if (selectedProjectObj) {
            setSelectedEnterprise(selectedProjectObj.relatedEnterpriseId); // Replace with the actual property
          }
        
          // Call the parent component's function
          handleOptionChange(event);}
  
    return (
      <FormControl sx={{ mt: 1, mb: 1, mr: 5, ml: 5, '& .MuiSelect-standard': 'standard',
      '& .MuiTextField-root': {mt: 3, mb: 1, mr: 13, ml: 5,  width: '50ch' }, }}>
      
        <InputLabel id="simple-select-label" color='info' sx={{ml:5,mr:10,mt:2}}>Projet</InputLabel>
      
          <Select
            variant="outlined"
            label="projet"
            color="info"
            id="Project-select"
            sx={{ ml: 5, mt: 2,width: '50ch'  }}
            value={selectedProject}
            onChange={handleChange}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
     
      {/* Display related enterprise */}
      {selectedEnterprise && (
        <div>
        <TextField
          label="Related Enterprise"
          value={selectedEnterprise}
          disabled
          variant="outlined"
          sx={{mt:2}}
          
        />
        <SelectMC selectedOption={mcs} handleOptionChange={handleOptionChangeMC}/>
        </div>
      )}
      
    </FormControl>
    );
  };
  
  export default SelectProjets;
    