import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import Message from "./Message";

const LoginPage = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleLogin = () => {
       dispatch(login(email, password));
     };

     const userLogin = useSelector((state) => state.userLogin);
     const { error, loading, userInfo } = userLogin;

     useEffect(() => {
       if (userInfo) {
         navigate(`/timeline/${userInfo.id}`);
       }
     }, [userInfo, navigate]);

  return (
     <Box
     sx={{
       position: "absolute",
       top: "50%",
       left: "50%",
       transform: "translate(-50%, -50%)",
       bgcolor: "background.paper",
       boxShadow: 24,
       p: 4,
       borderRadius: 4,
     }}
   >
     <h2>Login</h2>
     <TextField
       label="Email"
       variant="outlined"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       fullWidth
     />
     <TextField
       label="Password"
       variant="outlined"
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       fullWidth
     />
     {error && <Message variant="outlined" severity="error">{error}</Message>}
     <Button variant="contained" color="primary" onClick={handleLogin}>
       Log In
     </Button>
   </Box>
  );
};

export default LoginPage;
