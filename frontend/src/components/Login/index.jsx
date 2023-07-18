import { Box, Button, Container, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [otpSent, setOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleMobileNumberChange = (e) => {
    const { value } = e.target;
    //regex to validate weather its number or not
    const numRegex = /^[0-9]+$/;

    //check if mobile number is valid
    if (value === "" || numRegex.test(value)) {
      if (value.length > 10) {
        setError("Enter a valid mobile number");
      } else {
        setError("");
        setPhoneNumber(value);
      }
    } else {
      setError("Enter a valid mobile number");
    }
  };

  const handleOtpChange = (e) => {
    const { value } = e.target;
    //regex to validate weather its number or not
    const numRegex = /^[0-9]+$/;

    //check if mobile number is valid
    if (value === "" || numRegex.test(value)) {
      if (value.length > 6) {
        setError("Enter a valid otp number");
      } else {
        setError("");
        setOtp(value);
      }
    } else {
      setError("Enter a valid otp number");
    }
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/generateOtp`,
        { phoneNumber }
      );
      setOtpSent(true);

      console.log(response);
    } catch (error) {
      setOtpSent(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/verifyOtp`,
        { phoneNumber, otp }
      );
      console.log(response);
      navigate("/dashboard");
    } catch (error) {}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      sendOtp();
    } else {
      verifyOtp();
    }
  };

  return (
    <Container sx={{ margin: "3rem auto" }} maxWidth="sm">
      <Box
        component="form"
        sx={{
          bgcolor: "#cfe8fc",
          padding: "5rem 3rem",
          borderRadius: "20px",
        }}
      >
        <h1>Login/Signup</h1>
        {!otpSent ? (
          <Box>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              placeholder="Enter Your Phone Number"
              variant="outlined"
              sx={{
                marginBottom: "1rem",
              }}
              fullWidth
              value={phoneNumber}
              onChange={handleMobileNumberChange}
              error={error}
              helperText={error}
            />
          </Box>
        ) : (
          <Box>
            <TextField
              id="outlined-basic"
              label="OTP"
              placeholder="Enter Your Otp"
              variant="outlined"
              sx={{
                marginBottom: "1rem",
              }}
              fullWidth
              value={otp}
              onChange={handleOtpChange}
              error={error}
              helperText={error}
            />
          </Box>
        )}
        <Button
          variant="contained"
          size="large"
          sx={{
            marginBottom: "1rem",
          }}
          fullWidth
          onClick={handleSubmit}
        >
          {!otpSent ? "Send Otp" : "Verify Otp"}
        </Button>
      </Box>
    </Container>
  );
};

export default Login;