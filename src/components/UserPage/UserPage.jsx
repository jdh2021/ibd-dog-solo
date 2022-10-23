import React from 'react';
// import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import EditDog from '../EditDog/EditDog';

// material ui imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function UserPage() {
  const dispatch = useDispatch();

  // dispatch action 'FETCH_DOG' on when UserPage renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // retrieve data from dog, medication reducer in store
  const dog = useSelector(store => store.dog);
  const medications = useSelector(store => store.medication);

  // date formatting to display birthday on page
  const birthday = new Date(dog.birthday);
  const formattedBirthday = birthday.toLocaleDateString();

  // local state for conditional rendering of editDog card
  const [editDog, setEditDog] = useState(false);

  // on click of Edit button, setEditDog to true to render EditDog view
  const handleEditDog = () => {
    setEditDog(true);
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={8} sm={6} md={4.5} lg={3.75} xl={3}>
        {editDog === false ?
          <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4 }}>
            <CardMedia
              sx={{
                width: 250,
                height: 250,
                display: "inline",
                mt: 6,
              }}
              component="img"
              image={dog.image != '' ? dog.image : 'images/ibdog.png'}
            />
            <CardContent>
              <Typography variant="h6">
                {dog.name}
              </Typography>
              <Typography variant="body1">
                  Birthday: {formattedBirthday}
              </Typography>
              <Typography variant="body1">
                Food:
                {dog.food != '' ? <span> {dog.food}</span> : <span> -</span>}
              </Typography>
              <Typography style={{ wordWrap: "break-word" }} variant="body1" sx={{ pl: 4, pr: 4 }}>
                Medication(s): <br />
                {medications.length != 0 ?
                  medications.map(medication =>
                    medication.active && <span key={medication.id}> &#8226; {medication.name} </span>
                  )
                  : <span>-</span>
                }
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button variant="contained" sx={{ mb: 4 }} onClick={handleEditDog} >Edit</Button>
            </CardActions>
          </Card> :
          // render if editDog is true
          <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4, pl: 2, pr: 2, pb: 2 }}>
            <EditDog setEditDog={setEditDog} />
          </Card>
        }
      </Grid>
    </Grid>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;


// // this component doesn't do much to start, just renders some user reducer info to the DOM
// const user = useSelector((store) => store.user);
// <div className="container">
// <h2>Welcome, {user.username}!</h2>
// <p>Your ID is: {user.id}</p>
// {/* <LogOutButton className="btn" /> */}
// </div>