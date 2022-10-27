import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MedicationRow from '../MedicationRow/MedicationRow';

// mui imports
import Button from '@mui/material/Button';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
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
import { faPills, faPlus } from '@fortawesome/free-solid-svg-icons';

// sweetalert
import swal from 'sweetalert';

function Medication() {
  const dispatch = useDispatch();

  // retrieve data from dog, medication reducer in store
  const dog = useSelector(store => store.dog);
  const medications = useSelector(store => store.medication);

  // useEffect to dispatch action 'FETCH_DOG' when Medication component renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // add medication dialog
  const [open, setOpen] = useState(false);

  // local state for changeable values of input fields
  const [medicationName, setMedicationName] = useState('');
  const [medicationFrequency, setMedicationFrequency] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');
  const [medicationStart, setMedicationStart] = useState(null);

  // dispatch POST_MEDICATION, payload is medication object and function handleMedicationPost
  const handleSubmitMedication = (event) => {
    event.preventDefault();
    console.log('in handleSubmitMedication');
    if (medicationName === '' || medicationDosage === '' || medicationFrequency === '') {
      swal('Please complete all required fields to add a medication.');
      return;
    } else {
      dispatch({
        type: 'POST_MEDICATION',
        payload: {
          dog_id: dog.id,
          name: medicationName,
          dosage: medicationDosage,
          frequency: medicationFrequency,
          date_started: medicationStart
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
    setMedicationStart(null);
    setOpen(false);
  }

  // prompts if medication should be deleted, takes in id of medication clicked on. if confirmed, calls deleteMedication and passes id as argument
  const confirmDelete = (id) => {
    console.log('in confirmDelete. Medication id to delete is:', id);
    swal({
      text: "Do you want to delete this medication?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmDelete => {
      if (confirmDelete) {
        deleteMedication(id);
      }
    });
  }

  // dispatches 'DELETE_MEDICATION', payload is medication id, function handleMedicationChange
  const deleteMedication = (id) => {
    dispatch({ type: 'DELETE_MEDICATION', payload: id, handleMedicationChange: handleMedicationChange });
  }

  const handleMedicationChange = () => {
    console.log('in handleMedicationChange');
    dispatch({ type: 'FETCH_MEDICATION', payload: dog.id });
  }

  // dispatches 'PUT_MEDICATION', payload is medication object, function handleMedicationChange
  const editMedicationStatus = (medication) => {
    console.log('in editMedicationStatus');
    // conditionals to send date clicked as inactive date or null as inactive date
    if (medication.active === true && medication.date_started != null) {
      const now = new Date();
      const inactiveDate = dayjs(now).format('YYYY-MM-DD');
      const medStart = new Date(medication.date_started);
      // conditional to check inactive date is greater than start date. if not, alert and return.
      if (medStart > now) {
        swal('This medication can be marked inactive on or after its start date.');
        return;
      } else {
        dispatch({
          type: 'PUT_MEDICATION',
          payload: {
            id: medication.id,
            active: !medication.active,
            date_inactive: inactiveDate,
          },
          handleMedicationChange: handleMedicationChange
        })
      }
    }
    else if ((medication.active === true && medication.date_started === null) || medication.active === false) {
      dispatch({
        type: 'PUT_MEDICATION',
        payload: {
          id: medication.id,
          active: !medication.active,
          date_inactive: null,
        },
        handleMedicationChange: handleMedicationChange
      })
    }
  }

  return (
    <div>
      <Button variant="contained" size="small" sx={{ mb: 1, mt: 4, pt: 1.25, pb: 1.25 }} onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faPlus} /><FontAwesomeIcon icon={faPills} size="lg" />
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { backgroundColor: "#eaeef1" } }} >
        <DialogTitle>Add Medication</DialogTitle>
        <DialogContent>
          <Stack spacing={1.5} sx={{ mt: 0.5 }}>
            <TextField
              value={medicationName}
              onChange={(event) => setMedicationName(event.target.value)}
              required
              label="Name"
              size="small"
            />
            <TextField
              value={medicationDosage}
              onChange={(event) => setMedicationDosage(event.target.value)}
              required
              label="Dosage"
              size="small"
            />
            <TextField
              value={medicationFrequency}
              onChange={(event) => setMedicationFrequency(event.target.value)}
              required
              label="Frequency"
              size="small"
            />
            <DatePicker
              value={medicationStart}
              onChange={(newValue) => {
                setMedicationStart(newValue);
              }}
              renderInput={(params) => <TextField size="small" {...params} />}
              label="Start Date"
              openTo="day"
              views={['year', 'month', 'day']}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)} sx={{ mb: 1, ml: 2 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitMedication} sx={{ mb: 1, mr: 2 }}>Submit</Button>
        </DialogActions>
      </Dialog>
      <Grid container justifyContent="center">
        <Grid item xs={11.5} sm={11} md={8.75} lg={7} xl={6}>
          <TableContainer component={Paper} sx={{ mt: 4, mb: 5, backgroundColor: "#d6dde3" }}>
            <Typography sx={{ mt: 3, mb: 2 }} variant="h6">Medications</Typography>
            <Table sx={{ backgroundColor: "#eaeef1", p: 3 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 40 }}>Name</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 40 }}>Dosage</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 40 }}>Frequency</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 30 }}>Start</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 30 }}>End</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1, pl: 0.2, pr: 0.2 }} style={{ minWidth: 10 }}>Active?</TableCell>
                  <TableCell align="center" sx={{ pt: 1, pb: 1 }} style={{ minWidth: 20 }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medications.map(medication => {
                  return (
                    <MedicationRow
                      key={medication.id}
                      medication={medication}
                      editMedicationStatus={editMedicationStatus}
                      confirmDelete={confirmDelete}
                    />
                  )
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