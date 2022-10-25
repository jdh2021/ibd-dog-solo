import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

// mui import 
import Grid from '@mui/material/Grid';

function LoginPage() {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={6} md={4} lg={3.5} xl={2.5}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
