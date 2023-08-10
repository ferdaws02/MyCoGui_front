// FormModel.js

import { useState } from 'react';

const useFormModel = () => {
  const [nomentreprise, setNomentreprise] = useState('');
  const [pays, setPays] = useState('');
  const [adresse, setAdresse] = useState('');

  const handleNomentrepriseChange = (event) => {
    setNomentreprise(event.target.value);
  };

  const handlePaysChange = (event) => {
    setPays(event.target.value);
  };

  const handleAdresseChange = (event) => {
    setAdresse(event.target.value);
  };

  const resetForm = () => {
    setNomentreprise('');
    setPays('');
    setAdresse('');
  };

  return {
    nomentreprise,
    pays,
    adresse,
    handleNomentrepriseChange,
    handlePaysChange,
    handleAdresseChange,
    resetForm,
  };
};

export default useFormModel;
