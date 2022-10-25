import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';

// mui import
import Grid from '@mui/material/Grid';

function RegisterPage() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={5} lg={4} xl={3}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
