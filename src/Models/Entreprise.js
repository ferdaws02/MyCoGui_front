import { useState, useEffect } from 'react';


const useEntrepriseModel = () => {
  const [entreprises, setEntreprises] = useState([]);
  const [data, setData] = useState('');

  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('/listeDesEntreprises');

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
        setEntreprises(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const getDataById = (id) => {
    const row = entreprises.find((row) => row.id === id);
    return row ? row : null;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { entreprises, data, getDataById };
};

export default useEntrepriseModel;