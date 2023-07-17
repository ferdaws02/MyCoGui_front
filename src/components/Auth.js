import React, { useState, useEffect } from "react";
import { Button, TextField ,Box} from "@mui/material";
import { useNavigate } from 'react-router-dom';
const Auth = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
   
    const navigate = useNavigate();
    const handleLogin = () => {
        const data = {
            username,
            password,
        };

        fetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    setError(null);
                    navigate('/dashboard'); 
                } else {
                    setError(response.statusText);
                }
            })
            .catch((error) => {
                setError(error.message);
            });
    };
    
   

    return (
        <Box 
        component="form"
        sx={{
          '& .MuiTextField-root': { mt:1,mb:1,mr:5,ml:50, width: '50ch' },
          '& .MuiFormControlLabel-root':{ml:10},
          '& .MuiInput-root':{ mt:3,ml:10}
          
        }}
        noValidate
        autoComplete="off"
      >
        <form
        >
            <h1 style={{marginLeft:80}}>Login</h1>
            <div>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div>
            <Button
               color="info" 
               variant="contained"
               sx={{mt:3,ml:65}}
                onClick={handleLogin}
            >
                Login
            </Button>
            </div>
            {error && <p>{error}</p>}
        </form>
        </Box>
    );
};

export default Auth;