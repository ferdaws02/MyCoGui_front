import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { Button,Box,IconButton} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';


const ListConges = () => {
  const [conges, setConges] = useState([]);
  const [data, setData] = useState('');
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
 
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/AddUser'); 
  };
  const handletoEdit = (id)=> {
    const row = getDataById(id)
    navigate(`/ModifUser/${row.id_c}`); 
  };
  const handleDataChange = (newData) => {
    setData(newData);
  };
  useEffect(() => {
    // Fetch data from the backend and update the state
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Make a request to your backend API endpoint
      const response = await fetch('/Conge/showAll');

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
    const row = conges.find((row) => row.id_co === id);
    return row ? row : null;
  };


  const columns = [
    { field: 'id_co', headerName: 'ID', width: 70 },
    { field: 'ddconge', headerName: 'DATE DEBUT', width: 150},
    { field: 'dfconge', headerName: 'DATE FIN', width: 150 },
    { field: 'etat', headerName: 'ETAT', width: 150 },
  
    {
      headerName: "Action",
      flex: 1,
      renderCell: (params)  => {
        const id = params.row.id_c; // Get the ID from the 'id_c' field
       
        return (<Box display="flex"  mt="15px">
                   <IconButton onClick={() => handletoEdit(id)} aria-label="Edit" size="large" id="Edit_BTN">
                  <EditOutlinedIcon fontSize="small"  />
                  </IconButton>
                  <IconButton aria-label="consult" size="large">
                  <VisibilityOutlinedIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton aria-label="Validation" size="large" id="Validate_BTN">
                  <DoneOutlineOutlinedIcon fontSize="small" color="success" />
                  </IconButton>
                  <IconButton aria-label="Validation" size="large" id="Validate_BTN">
                  <HighlightOffOutlinedIcon fontSize="medium" color='error' />
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
        <Box>
     <Button onClick={handleOpen} size="small"  sx={{
        backgroundColor: colors.greenAccent[500], 
        '&:hover': {
          backgroundColor: colors.greenAccent[700]
        },
      }}
     variant="contained">
     Ajout Congé 
     <Box width="5px"></Box>
      <AddCircleOutlineOutlinedIcon  fontSize="medium" />
      </Button>
     
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
        <DataGrid rows={conges} columns={columns} sortModel={[{ field: 'id_co', sort: 'desc' }]} 
         getRowId={(row) => row.id} // Specify the ID field
         getRowData={(params) => params.row} // Retrieve the row data
         onRowClick={(params) => {
           const id = params.row.id_c;
           const rowData = getDataById(id);
           if (rowData) {
             console.log('Data found:', rowData);
             const Data= rowData
             console.log('Data :', Data);

             handleDataChange(Data)
           
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
      {/* <FormPopup isOpen={isOpen} onClose={handleClose} /> */}
      
      </div>);
};

export default ListConges ;
