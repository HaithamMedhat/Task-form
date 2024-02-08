"use client";
import * as React from "react";
import {
  Avatar,
  CssBaseline,
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Alert
} from "@mui/material";
import Link from "next/link";
import Input from "./Input";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
type FormValues = {
  firstName? : string,
  lastName? : string,
  email : string,
  password : string
}  
interface typeProps {
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  onSubmit: (data:FormValues)=> void;
  errors: any;
  formContent: string;
  errorLogin?:string;
  isloading:boolean;
}

export default function Form({
  register,
  handleSubmit,
  onSubmit,
  errors,
  formContent,
  errorLogin,
  isloading
}: typeProps) {
  let content: any;
  const LoginContent = (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          {errorLogin &&  <Grid item xs={12}> <Alert severity="error">{errorLogin}</Alert> </Grid>}
          <Grid item xs={12}>
            <Input
              errorMessages={errors.email ? errors.email.message : false}
              label="Email Address"
              id="email"
              required={true}
              fullWidth={true}
              register={register}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              errorMessages={errors.password ? errors.password.message : false}
              label="password"
              id="password"
              required={true}
              fullWidth={true}
              register={register}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={isloading}
        >
          {isloading ?  'Submiting...' : 'Log in '}
        </Button>
        <Link className="leftLink" href="/signup">
          you don&lsquo;t have an account? Sign up
        </Link>
      </Box>
    </>
  );

  const SignupContent = ( 
      <>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                errorMessages={errors.firstName ? errors.firstName.message : false}
                label="First Name"
                id="firstName"
                required={true}
                fullWidth={true}
                register={register}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                errorMessages={errors.lastName ? errors.lastName.message : false}
                label="Last Name"
                id="lastName"
                required={true}
                fullWidth={true}
                register={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                errorMessages={errors.email ? errors.email.message : false}
                label="Email Address"
                id="email"
                required={true}
                fullWidth={true}
                register={register}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                errorMessages={
                  errors.password ? errors.password.message : false
                }
                label="password"
                id="password"
                required={true}
                fullWidth={true}
                register={register}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isloading}
            >
              {isloading ?  'Submiting...' : 'Sign up'}
          </Button>
          <Link className="leftLink" href="/login">
            Already have an account? Sign in
          </Link>
        </Box>
      </>
   
  );
  switch (formContent) {
    case "sign up":
      content = SignupContent;
      break;
    case "log in":
      content = LoginContent;
      break;
    default:
      content = SignupContent;
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          px: 2,
          py: 2,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {content}
      </Box>
    </Container>
  );
}
