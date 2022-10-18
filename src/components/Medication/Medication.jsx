import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Medication.css';

// material ui imports
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Medication() {
  const dispatch = useDispatch();

  // retrieve data from dog, medication reducer in store
  const dog = useSelector(store => store.dog);
  const medications = useSelector(store => store.medication);

  // useEffect to dispatch action 'FETCH_DOG' when Medication component renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // local state for changeable values of input fields
  const [medicationName, setMedicationName] = useState('');
  const [medicationFrequency, setMedicationFrequency] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');

  // dispatch POST_MEDICATION, payload is medication object and function handleMedicationPost
  const handleSubmitMedication = (event) => {
    event.preventDefault();
    console.log('in handleSubmitMedication');
    if (medicationName === '' || medicationDosage === '' || medicationFrequency === '') {
      alert('Please complete all fields to add a medication.');
      return;
    } else {
      dispatch({
        type: 'POST_MEDICATION',
        payload: {
          dog_id: dog.id,
          name: medicationName,
          dosage: medicationDosage,
          frequency: medicationFrequency
        },
        handleMedicationPost: handleMedicationPost
      })
    }
  }

  // dispatches 'FETCH_DOG' and clears inputs upon successful POST
  const handleMedicationPost = () => {
    console.log('in handleMedicationPost');
    dispatch({ type: 'FETCH_DOG', payload: dog.id });
    setMedicationName('');
    setMedicationFrequency('');
    setMedicationDosage('');
  }

  // prompt if medication should be deleted, takes in id of medication clicked on. if confirmed, calls deleteMedication and passes id as argument
  const confirmDelete = (id) => {
    console.log('in confirmDelete. Record id to delete is:', id);
    if (window.confirm('Do you want to delete this record?')) {
      deleteMedication(id);
    }
  }

  // dispatches 'DELETE_MEDICATION', payload is medication id, function handleMedicationChange
  const deleteMedication = (id) => {
    dispatch({ type: 'DELETE_MEDICATION', payload: id, handleMedicationChange: handleMedicationChange });
  }

  const handleMedicationChange = () => {
    console.log('in handleMedicationChange');
    dispatch({ type: 'FETCH_MEDICATION', payload: dog.id });
  }

  // dispatches 'PUT_MEDICATION', payload is medication id, function handleMedicationChange
  const editMedicationStatus = (id) => {
    console.log('in editMedicationStatus');
    dispatch({
      type: 'PUT_MEDICATION',
      payload: id, handleMedicationChange: handleMedicationChange
    })
  }

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={7.5} sm={5} md={3.75} lg={3} xl={2.5}>
          <form onSubmit={handleSubmitMedication} autoComplete="off">
            <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 2, mt: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mt: 1 }}>Add Medication</Typography>
                <br />
                <TextField
                  value={medicationName}
                  onChange={(event) => setMedicationName(event.target.value)}
                  required
                  label="Name"
                  size="small"
                  sx={{ mb: 1.5 }}
                />
                <br />
                <TextField
                  value={medicationDosage}
                  onChange={(event) => setMedicationDosage(event.target.value)}
                  required
                  label="Dosage"
                  size="small"
                  sx={{ mb: 1.5 }}
                />
                <br />
                <TextField
                  value={medicationFrequency}
                  onChange={(event) => setMedicationFrequency(event.target.value)}
                  required
                  label="Frequency"
                  size="small"
                />
              </CardContent>
              <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <Button type="submit" variant="contained" sx={{ mb: 2 }}>Submit</Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={11.5} sm={11} md={9} lg={7.75} xl={6.25}>
          <TableContainer component={Paper} sx={{ mt: 4, mb: 5, backgroundColor: "#d6dde3" }}>
            <Typography sx={{ mt: 2.5, mb: 2 }} variant="h6">Medications</Typography>
            <Table sx={{ backgroundColor: "#eaeef1", p: 3 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }}>Name</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }}>Dosage</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }}>Frequency</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }}>Active?</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medications.map(medication => {
                  let medicationStatus = '';
                  if (medication.active) {
                    medicationStatus = 'Active-row'
                  } else {
                    medicationStatus = 'Inactive-row'
                  }
                  return <TableRow
                    key={medication.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    className={medicationStatus}
                  >
                    <TableCell component="th" scope="row" align="center" sx={{ pt: 0.2, pb: 0.2 }}>
                      {medication.name}
                    </TableCell>
                    <TableCell align="center" sx={{ pt: 0.2, pb: 0.2 }}>{medication.dosage}</TableCell>
                    <TableCell align="center" sx={{ pt: 0.2, pb: 0.2 }}>{medication.frequency}</TableCell>
                    <TableCell align="center" sx={{ pt: 0.2, pb: 0.2 }}>
                      <Checkbox
                        checked={medication.active}
                        onChange={() => editMedicationStatus(medication.id)}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ pt: 0.2, pb: 0.2 }}>
                      <IconButton sx={{ color: "#9c27b0" }} onClick={() => confirmDelete(medication.id)}>
                        <FontAwesomeIcon icon={faTrash} size="xs" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Medication;