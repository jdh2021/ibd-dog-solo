import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

function Medication() {
  const dispatch = useDispatch();

  // retrieve data from medications reducer in store
  const medications = useSelector(store => store.medication);

  // useEffect to dispatch action 'FETCH_DOG' when Medication component renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // local state for changeable values of input fields
  const [medicationName, setMedicationName] = useState('');
  const [medicationFrequency, setMedicationFrequency] = useState('');
  const [medicationDosage, setMedicationDosage] = useState('');

  const handleSubmitMedication = (event) => {
    event.preventDefault();
    console.log('in handleSubmitMedication');
  }

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={8} sm={5} md={4} lg={3} xl={2.5}>
          <form onSubmit={handleSubmitMedication} autoComplete="off">
            <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Add Medication
                </Typography>
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
    </div>
  )
}

export default Medication;