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
// date picker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// fa imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldDog } from '@fortawesome/free-solid-svg-icons';

// sweetalert
import swal from 'sweetalert';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dogName, setDogName] = useState('');
  const [dogBirthday, setDogBirthday] = useState(null);

  const errors = useSelector((store) => store.errors);

  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    const formattedBirthday = dayjs(dogBirthday).format('YYYY-MM-DD');
    if (username === '' || password === '' || dogName === '' || dogName === '' || dogBirthday === null) {
      swal('Please complete all fields to create an account.');
      return;
    } else {
      dispatch({
        type: 'REGISTER',
        payload: {
          username: username,
          password: password,
          name: dogName,
          birthday: formattedBirthday,
        },
      });
    };
  }

  return (
    <form onSubmit={registerUser} autoComplete="off">
      <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4, pb: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 4, mt: 2 }} align="center">
            <FontAwesomeIcon icon={faShieldDog} color="#DDA0DD" size="2xl" /> Registration
          </Typography>
          {errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {errors.registrationMessage}
            </h3>
          )}
          <Stack spacing={2.5} sx={{ ml: 3, mr: 3 }}>
            <TextField
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              label="username"
              required
              size="small"
              variant="outlined"
            />
            <TextField
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              label="password"
              required
              size="small"
              variant="outlined"
              sx={{ mb: 1.5 }}
            />
            <TextField
              value={dogName}
              onChange={(event) => setDogName(event.target.value)}
              label="dog's name"
              required
              size="small"
              variant="outlined"
              sx={{ mb: 1.5 }}
            />
            <DatePicker
              value={dogBirthday}
              onChange={(newValue) => { setDogBirthday(newValue); }}
              renderInput={(params) => <TextField {...params} />}
              disableFuture
              label="dog's birthday (est.) *"
              openTo="day"
              views={['year', 'month', 'day']}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 0.5 }}>
          <Button variant="contained" sx={{ mb: 1, ml: 2 }} onClick={() => history.push('/login')}>Back to Login</Button>
          <Button variant="contained" sx={{ mb: 1, mr: 2 }} type="submit">Create</Button>
        </CardActions>
      </Card>
    </form>
  );
}

export default RegisterForm;

{/* <h2>Register User</h2>
{errors.registrationMessage && (
  <h3 className="alert" role="alert">
    {errors.registrationMessage}
  </h3>
)}
<div>
  <label htmlFor="username">
    Username:
    <input
      type="text"
      name="username"
      value={username}
      required
      onChange={(event) => setUsername(event.target.value)}
    />
  </label>
</div>
<div>
  <label htmlFor="password">
    Password:
    <input
      type="password"
      name="password"
      value={password}
      required
      onChange={(event) => setPassword(event.target.value)}
    />
  </label>
</div>
<div>
  <input className="btn" type="submit" name="submit" value="Register" />
</div> */}