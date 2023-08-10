import React, { useState, useEffect } from 'react';
import { useTheme } from "@mui/material";
import { Button,Box,IconButton, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { tokens } from "../theme";
import { useNavigate } from 'react-router-dom';
import DetailConsultant from './DetailConsultant';



const ListConsultant = () => {
  const [consultant, setConsultant] = useState([]);
  const [data, setData] = useState('');
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [isConsultantPopupOpen, setConsultantPopupOpen] = useState(false);
  const [selectedConsultantData, setSelectedConsultantData] = useState(null);



  const handleShowDetails = (id) => {
    const selectedRow = getDataById(id);
    if (selectedRow) {
      setSelectedConsultantData(selectedRow);
      setConsultantPopupOpen(true);
    } else {
      console.log('Data not found for the specified ID.');
    }
  };
  
  

 
  const navigate = useNavigate();
  const handleOpen = () => {
    navigate('/AddUser'); 
  };
  const handletoEdit = (id)=> {
    const row = getDataById(id)

    navigate(`/ModifUser/${row.idc}`); 

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
      const response = await fetch('/ListeComptes');

      if (response.ok) {
        const jsonData = await response.json();
        // Add a unique 'id' property to each row
        const rowsWithIds = jsonData.map((row, index) => ({ ...row, id: index + 1 }));
        setConsultant(rowsWithIds);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };
  const getDataById = (id) => {

    const row = consultant.find((row) => row.idc === id);

    return row ? row : null;
  };


  const columns = [

    { field: 'idc', headerName: 'ID', width: 70 },

    { field: 'nom_c', headerName: 'NOM', width: 150},
    { field: 'prenom_c', headerName: 'PRENOM', width: 150 },
    { field: 'adresse_c', headerName: 'ADRESSE', width: 150 },
    { field: 'emailc', headerName: 'EMAIL', width: 180 },
    { field: 'etat', headerName: 'ETAT', width: 100 },
    { field: 'roles', headerName: 'ROLE', width: 150},
    {
      headerName: "ACTION",

    flex: 1,
    field: 'actions', // Add this line to specify the field
    renderCell: (params) => {
      const id = params.row.idc;

       
        return (<Box display="flex"  mt="15px">
                   <IconButton onClick={() => handletoEdit(id)} aria-label="Edit" size="large" id="Edit_BTN">
                  <EditOutlinedIcon fontSize="small"  />
                  </IconButton>

            <IconButton
              onClick={() => {
                const rowData = getDataById(id);
                if (rowData) {
                  setSelectedConsultantData(rowData);
                  setConsultantPopupOpen(true);
                } else {
                  console.log('Data not found for the specified ID.');
                }
              }}
              aria-label="consult"
              size="large"
            >
              <VisibilityOutlinedIcon fontSize="small" color="info" />
            </IconButton>
          </Box>
        );
      },
    },

  ];
return(<div>
 <Box m="20px">
     <h2>COMPTES</h2>
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
     Ajout de compte
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

        <DataGrid rows={consultant} columns={columns} sortModel={[{ field: 'idc', sort: 'desc' }]} 
         getRowId={(row) => row.id} // Specify the ID field
         getRowData={(params) => params.row} // Retrieve the row data
         onRowClick={(params) => {
          if (params.field === 'actions') { // Check if the clicked icon is in the actions column
            const id = params.row.idc;
            const rowData = getDataById(id);
            if (rowData) {
              setSelectedConsultantData(rowData);
              setConsultantPopupOpen(true);
            } else {
              console.log('Data not found for the specified ID.');
            }
          }
        }}
         pagination
         pageSize={10}
        
      />

      {isConsultantPopupOpen && (
            <DetailConsultant
              consultant={selectedConsultantData}
              onClose={() => setConsultantPopupOpen(false)}
            />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ListConsultant;

