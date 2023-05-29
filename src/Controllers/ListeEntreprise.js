import React, { useState } from 'react';
import useEntrepriseModel from '../Models/Entreprise';
import ListEntrepriseView from '../Views/ListeEntrepriseView';

const ListEntreprise = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [data, setData] = useState('');
  const { entreprises, getDataById } = useEntrepriseModel();

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleOpenEdit = () => {
    setIsOpenEdit(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCloseEdit = () => {
    setIsOpenEdit(false);
  };

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <ListEntrepriseView
      entreprises={entreprises}
      handleOpen={handleOpen}
      handleOpenEdit={handleOpenEdit}
      handleDataChange={handleDataChange}
      isOpen={isOpen}
      isOpenEdit={isOpenEdit}
      handleClose={handleClose}
      handleCloseEdit={handleCloseEdit}
      data={data}
      getDataById={getDataById} // Pass getDataById as a prop
    />
  );
};

export default ListEntreprise;