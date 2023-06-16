import React, { useState } from 'react';
import useProjetModel from '../Models/Projet';
import ListProjetView from '../Views/ListeProjets';

const ListProjet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [data, setData] = useState('');
  const { projets, getDataById } = useProjetModel();
 

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
  if (!projets) {

    return <div>Loading...</div>;
}
  return (
    <ListProjetView
      projets={projets}
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

export default ListProjet;