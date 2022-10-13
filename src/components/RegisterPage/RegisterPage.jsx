import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';

// mui import
import Grid from '@mui/material/Grid';

function RegisterPage() {
  const history = useHistory();

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={5} lg={4} xl={3}>
        <RegisterForm />
      </Grid>
    </Grid>
  );
}

export default RegisterPage;
