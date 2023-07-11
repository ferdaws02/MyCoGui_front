import React, { useState, useEffect } from 'react';
import { 
  Box,
  Button,
  IconButton,
  TextField,
 
 } from '@mui/material';
import NumericTextField from './NumericTextField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { DataGrid } from "@mui/x-data-grid"
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import ModifTConge from './ModifTConge'


const AjoutTC=()=>{
  const [conges, setConges] = useState([]);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Type,setType]=useState('');
  const [isOpen, setIsOpenEdit] = useState(false);
  
  const [data, setData] = useState('');
  useEffect(() => {
    // Fetch data from the backend and update the state
    fetchData();
  }, []);
  const onOpen=()=>{
    setIsOpenEdit(true);
  }
  const onClose=()=>{
    setIsOpenEdit(false);
  }
  const handleDataChange = (newData) => {
    setData(newData);
  };


  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('/ref/AfficherTypeConge');

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
        setConges(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
  const getDataById = (id) => {
    const row = conges.find((row) => row.id_tco === id);
        return row ? row : null;
  };
  const onSubmit=(event)=>{
    event.preventDefault();
          
    const AccountData = {
      type:Type}
      fetch('/ref/TypeConge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(AccountData ),
      })
        .then((response) => response.json())
        .then((data) => {
          // Traiter la réponse de la requête
          console.log(data);
        })
        .catch((error) => {
          // Gérer les erreurs
          console.error(error);
        });
        window.location.reload(); 
  
  }
  const handleInputChange=(e)=>{
    const value  = e.target.value;
    setType(value)
  }
  const columns = [
    { field: 'id_tco', headerName: 'ID', width: 70 },
    { field: 'type', headerName: 'TYPE', width: 150},
    {
      headerName: "Action",
      flex: 1,
      renderCell: (params)  => {
        const id = params.row.id_tco; // Get the ID from the 'id_c' field
       
        return (<Box display="flex"  mt="15px">
                   <IconButton onClick={onOpen} aria-label="Edit" size="large" id="Edit_BTN">
                  <EditOutlinedIcon fontSize="small"  />
                  </IconButton>
                  <IconButton aria-label="consult" size="large">
                  <VisibilityOutlinedIcon fontSize="small" color="info" />
                  </IconButton>
                 </Box>
        )},
      },
       
  ];


  return(<div>
    <Box m="20px">
        <h2>Congés</h2>
        <Box display="flex" justifyContent="space-between" p={2}>
        <Box
           display="flex"
          
         >
         
           </Box>
           <Box
            sx={{ 
              '& .MuiTextField-root': { mt:1,mb:3,mr:1,ml:10},
            '& .MuiIconButton-root':{mt:3,mb:3,mr:1}}}
           >
           <TextField 
           variant="outlined"
           color="info"
           type="text"
           name="Type"
           value={Type}
           onChange={handleInputChange}
           label="Ajouer Type"
          />
       
        <IconButton onClick={onSubmit} size="small"  sx={{
           '&:hover': {
             backgroundColor: colors.greenAccent[700]
           },
         }}
        variant="contained">
        <Box width="5px"></Box>
         <AddCircleOutlineOutlinedIcon  fontSize="medium" />
         </IconButton>
        
         </Box>
         </Box>
         
         <Box
           m="40px 0 0 0"
           height="75vh"
           sx={{
             "& .MuiDataGrid-root": {
               border: "none",
             },
             "& .MuiDataGrid-cell": {
               borderBottom: "none",
             },
             "& .name-column--cell": {
               color: colors.greenAccent[300],
             },
             "& .MuiDataGrid-columnHeaders": {
               backgroundColor: colors.greenAccent[600],
               borderBottom: "none",
             },
             "& .MuiDataGrid-virtualScroller": {
               backgroundColor: colors.primary[400],
             },
             "& .MuiDataGrid-footerContainer": {
               borderTop: "none",
               backgroundColor: colors.greenAccent[600],
             },
             "& .MuiCheckbox-root": {
               color: `${colors.greenAccent[200]} !important`,
             },
           }}
         >
           <DataGrid rows={conges} columns={columns} sortModel={[{ field: 'id_tco', sort: 'asc' }]} 
            getRowId={(row) => row.id_tco} // Specify the ID field
            getRowData={(params) => params.row} // Retrieve the row data
            onRowClick={(params) => {
              const id = params.row.id_tco;
              const rowData = getDataById(id);
              if (rowData) {
                console.log('Data found:', rowData);
                const Data= rowData
                console.log('Data :', Data);
   
                handleDataChange (Data)
              
              } else {
                console.log('Data not found for the specified ID.');
              }
           
              
              //();
            }}
            pagination
            pageSize={10}
           
         />
          {/* <EditForm   isOpenEdit={isOpenEdit} onCloseEdit={handleCloseEdit} selectedData={data} /> */}
         </Box>
         </Box>
         <ModifTConge isOpenEdit={isOpen} onCloseEdit={onClose} selectedData={data} />
         
         </div>);
};
export default  AjoutTC;