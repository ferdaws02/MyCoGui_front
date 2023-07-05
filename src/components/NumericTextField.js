import React, { useState ,useEffect} from 'react';
import TextField from '@mui/material/TextField';

const NumericTextField = ({name,placeholder,value,handleInputChange,error,helperText}) => {
  const [inputValue, setInputValue] = useState();
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const handleInputChange2 = (event) => {
    const value = event.target.value;
    setInputValue(value);
    console.log('fil handleInputChang fil numericTesxtFiled '+inputValue)

    // Vérifier si des caractères non numériques sont présents
    if (/\D/.test(value)) {
      setErrorMessage('Seuls les chiffres sont autorisés.');
    } else {
      setErrorMessage('');
    }
  };

  return (

      <TextField
       color="info"
       variant="outlined"
      name={name}
        value={inputValue}
        onChange={handleInputChange}
        inputProps={{
          pattern: '[0-9]*',
          maxLength: 8, // Maximum length of 10 characters
          minLength: 8, // Minimum length of 3 characters
        }}
       error={error}
       helperText={helperText ? 'Seuls les chiffres sont autorisés.' : ''}
       label={placeholder}
       InputLabelProps={{
        shrink: true}}
     
       
      />
  
  );
};

export default NumericTextField;