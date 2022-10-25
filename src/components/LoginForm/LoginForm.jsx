import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// mui imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// fontawesoje imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector(store => store.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form autoComplete="off" onSubmit={login}>
      <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 6, pb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 4, mt: 2 }} align="center">
            <FontAwesomeIcon icon={faPaw} color="#DDA0DD" size="xl" /> Login
          </Typography>
          {errors.loginMessage && (
            <h3 className="alert" role="alert">
              {errors.loginMessage}
            </h3>
          )}
          <Stack spacing={2.5} sx={{ ml: 5, mr: 5, mb: 1 }}>
            <TextField
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label="username"
              required
              size="small"
              variant="outlined"
            />
            <TextField
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              label="password"
              required
              size="small"
              variant="outlined"
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 0.5 }}>
          <Button variant="contained" sx={{ mb: 1, ml: 2 }} onClick={() => history.push('/registration')}>Register</Button>
          <Button variant="contained" sx={{ mb: 1, mr: 2 }} type="submit">Login</Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default LoginForm;
