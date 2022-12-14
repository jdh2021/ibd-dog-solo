import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// mui imports
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// sweetalert
import swal from 'sweetalert';

function EditDog({ setEditDog }) {
  const dispatch = useDispatch();

  // selector to retrieve dog object data from dog reducer in store
  const dog = useSelector(store => store.dog);

  // local state for changeable values of input fields
  const [editDogName, setEditDogName] = useState(dog.name);
  const [editDogBirthday, setEditDogBirthday] = useState(dog.birthday);
  const [editDogFood, setEditDogFood] = useState(dog.food);
  const [editDogImage, setEditDogImage] = useState(dog.image);

  // render normal dog view when cancel button is clicked
  const handleEditCancel = () => {
    setEditDog(false);
  }

  // check that dogName and dogBirthday aren't empty strings. dispatch 'PUT_DOG' with payload of updated dog object and function handleEditSuccess
  const handleEditSave = (event) => {
    event.preventDefault();
    console.log('in handleEditSave');
    if (editDogName === '' || editDogBirthday === null ) {
      swal('Please update your dog\'s name and birthday.');
      return;
    } else {
      dispatch({
        type: 'PUT_DOG',
        payload: {
          id: dog.id,
          name: editDogName,
          birthday: editDogBirthday,
          food: editDogFood,
          image: editDogImage,
        },
        handleEditSuccess: handleEditSuccess
      })
    }
  }

  // after successful PUT, dispatch 'FETCH_DOG' to get updated dog object, setEditDog to false to see normal dog view
  const handleEditSuccess = () => {
    console.log('in handleEditSuccess');
    dispatch({ type: 'FETCH_DOG' });
    setEditDog(false);
  }

  return (
    <form onSubmit={handleEditSave} autoComplete="off">
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3, mt: 2 }}>
          Update {dog.name}
        </Typography>
        <Stack spacing={2.5}>
          <TextField
            value={editDogName}
            onChange={(event) => setEditDogName(event.target.value)}
            label="Name"
            required
            variant="outlined"
          />
          <DatePicker
            value={editDogBirthday === null ? '' : editDogBirthday}
            onChange={(newValue) => {
              setEditDogBirthday(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            label="Birthday *"
            openTo="day"
            views={['year', 'month', 'day']}
            disableFuture
            required
          />
           <TextField
            value={editDogFood}
            onChange={(event) => setEditDogFood(event.target.value)}
            label="Food"
            variant="outlined"
          />
          <TextField
            value={editDogImage === '' ? '' : editDogImage}
            onChange={(event) => setEditDogImage(event.target.value)}
            label="URL for Photo"
          />
        </Stack>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", mt: 0.5 }}>
        <Button variant="contained" sx={{ mb: 1, ml: 2 }} onClick={handleEditCancel} >Cancel</Button>
        <Button variant="contained" sx={{ mb: 1, mr: 2 }} type="submit">Save</Button>
      </CardActions>
    </form>
  );
}

export default EditDog;