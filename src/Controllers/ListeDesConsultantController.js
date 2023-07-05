import React, { useState } from 'react';
import useProjetModel from '../Models/ListeDesConsultantsModele';
import ListeConsutantsView from '../Views/ListeDesConsultantsView';

const ListeConsutants = () => {

  const [data, setData] = useState('');
  const { consultant, getDataById } = useProjetModel();
 



  if (!consultant) {

    return <div>Loading...</div>;
}
  return (

   < ListeConsutantsView 
    />
  );
};

export default ListeConsutants;