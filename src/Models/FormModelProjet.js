// FormModel.js

import { useState } from 'react';

const useFormModel = () => {
  const [entreprise_id_e, setentreprise_id_e] = useState('');
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  const [entreprise, setEntreprise] = useState('');


  const handleentreprise_id_eChange = (event) => {
    setentreprise_id_e(event.target.value);
  };

  const handleTitreChange = (event) => {
    setTitre(event.target.value);
  };

  const handleOptionChange = (event) => {
    //  setSelectedOption(event.target.value);
    // console.log("****the selectedOPtion in the handle  "+selectedOption)
    setEntreprise(event.target.value);
    console.log("****the selectedOPtion in the handle  "+entreprise.nomentreprise)
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const resetForm = () => {
    setentreprise_id_e('');
    setTitre('');
    setDescription('');
  };

  return {
    entreprise_id_e,
    titre,
    description,

    handleOptionChange,
    handleentreprise_id_eChange,
    handleTitreChange,
    handleDescriptionChange,
    resetForm,
  };
};

export default useFormModel;
