import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';

function CheckIn() {
  const dispatch = useDispatch();
  const history = useHistory();

  // retrieve data from dog, record reducer in store
  const dog = useSelector(store => store.dog);
  const records = useSelector(store => store.record);

  // dispatch action 'FETCH_DOG' when Checkin loads
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // create date object and formatting for current date
  const date = new Date();
  const currentDate = `${(date.getMonth() + 1)}.${date.getDate()}.${date.getFullYear().toLocaleString().slice(-2)}`;
  let recordEntered = false;
  let dateToDisplay = '';

  // local state for changeable values of input fields
  const [appetite, setAppetite] = useState('');
  const [energy, setEnergy] = useState('');
  const [stomachPain, setStomachPain] = useState('');
  const [vomit, setVomit] = useState('');
  const [diarrhea, setDiarrhea] = useState('');
  const [medicationStatus, setMedicationStatus] = useState(false);

  // map over records to check if current date equals a record date. if dates match, alert record was already entered. 
  records.map(symptomRecord => {
    const historicalRecordDate = new Date(symptomRecord.created_at);
    const historicalRecordFormattedDate = `${(historicalRecordDate.getMonth() + 1)}.${historicalRecordDate.getDate()}.${historicalRecordDate.getFullYear().toLocaleString().slice(-2)}`;
    if (currentDate === historicalRecordFormattedDate) {
      dateToDisplay = <Typography variant="subtitle1" color='#f57c00' sx={{ mb: 2, mt: 0.5 }}>A record was already added today!</Typography>
      recordEntered = true;
      return;
    }
    dateToDisplay = <Typography variant="h6" color='#9c27b0' sx={{ mb: 2 }}>{currentDate}</Typography>
    return;
  })

  // dispatch 'POST_RECORD' with payload of symptom record object and function goToHealthStatus
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in handleSubmit');
    if (appetite === '' || energy === '' || stomachPain === '' || vomit === '' || diarrhea === '') {
      alert('Please complete all fields to submit.');
      return;
    } else if (recordEntered) {
      alert('A record was already added today! Please come back tomorrow.');
    } else {
      dispatch({
        type: 'POST_RECORD',
        payload: {
          dog_id: dog.id,
          appetite: appetite,
          energy: energy,
          stomach_pain: stomachPain,
          vomit: vomit,
          diarrhea: diarrhea,
          med_given: medicationStatus,
        },
        goToHealthStatus: goToHealthStatus
      })
    }
  }

  // if POST successful, navigate to HealthStatus
  const goToHealthStatus = () => {
    history.push('/healthstatus');
  }

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container justifyContent="center">
        <Grid item xs={10} sm={8.25} md={6} lg={4.5} xl={3.25}>
          <Card elevation={4} sx={{ backgroundColor: "#eaeef1", mb: 4, mt: 4, pb: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mt: 3 }}>
                Daily Check-in
              </Typography>
              {dateToDisplay}
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Appetite</FormLabel>
                <RadioGroup row value={appetite} onChange={(event) => setAppetite(event.target.value)}>
                  <FormControlLabel value="10" control={<Radio />} label="None" />
                  <FormControlLabel value="5" control={<Radio />} label="Low" />
                  <FormControlLabel value="0" control={<Radio />} label="Normal" />
                  <FormControlLabel value="3" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Energy</FormLabel>
                <RadioGroup row value={energy} onChange={(event) => setEnergy(event.target.value)}>
                  <FormControlLabel value="5" control={<Radio />} label="Low" />
                  <FormControlLabel value="0" control={<Radio />} label="Normal" />
                  <FormControlLabel value="1" control={<Radio />} label="High" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Stomach Pain</FormLabel>
                <RadioGroup row value={stomachPain} onChange={(event) => setStomachPain(event.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="None" />
                  <FormControlLabel value="5" control={<Radio />} label="Some" />
                  <FormControlLabel value="10" control={<Radio />} label="A lot" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Vomit</FormLabel>
                <RadioGroup row value={vomit} onChange={(event) => setVomit(event.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="None" />
                  <FormControlLabel value="10" control={<Radio />} label="Without Blood" />
                  <FormControlLabel value="30" control={<Radio />} label="With Blood" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl sx={{ mb: 1 }}>
                <FormLabel>Diarrhea</FormLabel>
                <RadioGroup row value={diarrhea} onChange={(event) => setDiarrhea(event.target.value)}>
                  <FormControlLabel value="0" control={<Radio />} label="None" />
                  <FormControlLabel value="10" control={<Radio />} label="Without Blood" />
                  <FormControlLabel value="30" control={<Radio />} label="With Blood" />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControlLabel
                label="Meds Given?"
                control={
                  <Checkbox
                    checked={medicationStatus}
                    onChange={(event) => setMedicationStatus(event.target.checked)}
                  />
                }
              />
            </CardContent>
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center", mt: 0.5 }}>
              <Button variant="contained" sx={{ mb: 2 }} type="submit" onClick={handleSubmit}>Submit</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}

export default CheckIn;