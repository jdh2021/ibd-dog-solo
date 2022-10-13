import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';

import Grid from '@mui/material/Grid';

function LoginPage() {
  const history = useHistory();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={6} md={4} lg={3.5} xl={2.5}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default LoginPage;
