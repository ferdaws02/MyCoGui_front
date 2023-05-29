import { useState } from 'react';

const useEditFormModel = (selectedData) => {
   
        const handleInputChange = (event) => {
          const { name, value } = event.target;
          if (name === 'nomentreprise') {
            setNomentreprise(value);
          } else if (name === 'pays') {
            setPays(value);
          } else if (name === 'adresse') {
            setAdresse(value);
          }
        };
        return { nomentreprise,pays, adresse,handleSubmit,handleInputChange}
    };
    export default useEditFormModel;
    