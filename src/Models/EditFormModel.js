import { useState, useEffect  } from 'react';

const useEditFormModel = (selectedData) => {
    const [nomentreprise, setNomentreprise] = useState('');
    const [pays, setPays] = useState('');
    const [adresse, setAdresse] = useState('');
    useEffect(() => {
        if (selectedData) {
          setNomentreprise(selectedData.nomentreprise);
          setPays(selectedData.pays);
          setAdresse(selectedData.adresse);
        }
      }, [selectedData]);
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
        return { nomentreprise,pays, adresse,handleInputChange}
    };
    export default useEditFormModel;
    