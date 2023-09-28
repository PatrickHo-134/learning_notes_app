import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      dispatch({
        payload: "Register failed. Please try again.",
      });
    } else {
      dispatch(register(firstName, lastName, email, password));
    }
  };

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
      <h2>Register</h2>
      <div>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
        />
      </div>
      <div>
        {password !== confirmPassword && (
          <Message variant="outlined" severity="error">
            {"Passwords do not match"}
          </Message>
        )}
      </div>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          disabled={password !== confirmPassword}
        >
          Submit
        </Button>
      </div>
    </Box>
  );
};

export default RegisterPage;
