import { useState } from 'react';
import { useDispatch } from 'react-redux';

// mui imports
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function EditableSymptomRecord({ symptomRecord, setEditSymptomRecordId }) {
  const dispatch = useDispatch();

  // local state for changeable values of input fields
  const [appetite, setAppetite] = useState(symptomRecord.appetite);
  const [energy, setEnergy] = useState(symptomRecord.energy);
  const [stomach_pain, setStomachPain] = useState(symptomRecord.stomach_pain);
  const [vomit, setVomit] = useState(symptomRecord.vomit);
  const [diarrhea, setDiarrhea] = useState(symptomRecord.diarrhea);
  const [medicationGiven, setMedicationGiven] = useState(symptomRecord.med_given);

  // formatting date object of symptom record to display MM.DD.YY
  const date = new Date(symptomRecord.created_at);
  const dateDisplay = `${(date.getMonth() + 1)}.${date.getDate()}.${date.getFullYear().toLocaleString().slice(-2)}`;

  // dispatch 'PUT_RECORD' with payload of updated symptom record object, function handleEditRecord success
  const handleEditRecordSave = (event) => {
    event.preventDefault()
    console.log('in handleEditSave');
    dispatch({
      type: 'PUT_RECORD',
      payload: {
        id: symptomRecord.id,
        appetite: appetite,
        energy: energy,
        stomach_pain: stomach_pain,
        vomit: vomit,
        diarrhea: diarrhea,
        med_given: medicationGiven
      },
      handleEditRecordSuccess: handleEditRecordSuccess
    })
  }

  // upon successful PUT, setEditSymptomRecordId back to null so SymptomRecord component renders
  const handleEditRecordSuccess = () => {
    setEditSymptomRecordId(null);
    dispatch({ type: 'FETCH_RECORD', payload: symptomRecord.dog_id });
  }

  return (
    <TableRow key={symptomRecord.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ p: 0.2 }}>{dateDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{symptomRecord.score}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl size="small">
          <Select
            value={appetite}
            onChange={(event) => setAppetite(event.target.value)}
            sx={{ fontSize: '0.8rem' }}
          >
            <MenuItem value={10} dense>None</MenuItem>
            <MenuItem value={5} dense>Low</MenuItem>
            <MenuItem value={0} dense>Normal</MenuItem>
            <MenuItem value={3} dense>High</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl size="small">
          <Select
            value={energy}
            onChange={(event) => setEnergy(event.target.value)}
            sx={{ fontSize: '0.8rem' }}
          >
            <MenuItem value={5} dense>Low</MenuItem>
            <MenuItem value={0} dense>Normal</MenuItem>
            <MenuItem value={1} dense>High</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl size="small">
          <Select
            value={stomach_pain}
            onChange={(event) => setStomachPain(event.target.value)}
            sx={{ fontSize: '0.8rem' }}
          >
            <MenuItem value={0} dense>None</MenuItem>
            <MenuItem value={5} dense>Some</MenuItem>
            <MenuItem value={10} dense>A lot</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl size="small">
          <Select
            value={vomit}
            onChange={(event) => setVomit(event.target.value)}
            sx={{ fontSize: '0.8rem' }}
          >
            <MenuItem value={0} dense>None</MenuItem>
            <MenuItem value={10} dense>w/o Blood</MenuItem>
            <MenuItem value={30} dense>w/ Blood</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl size="small" sx={{ m: 0 }}>
          <Select
            value={diarrhea}
            onChange={(event) => setDiarrhea(event.target.value)}
            sx={{ fontSize: '0.8rem' }}
          >
            <MenuItem value={0} dense >None</MenuItem>
            <MenuItem value={10} dense>w/o Blood</MenuItem>
            <MenuItem value={30} dense>w/ Blood</MenuItem>
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl>
          <Checkbox
            checked={medicationGiven}
            onChange={(event) => setMedicationGiven(!medicationGiven)}
          />
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl>
          <IconButton color="primary" onClick={handleEditRecordSave}>
            <FontAwesomeIcon icon={faFloppyDisk} size="xs" />
          </IconButton>
        </FormControl>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <FormControl>
          <IconButton color="primary" onClick={() => setEditSymptomRecordId(null)}>
            <FontAwesomeIcon icon={faCircleXmark} size="xs" />
          </IconButton>
        </FormControl>
      </TableCell>
    </TableRow>
  )
}

export default EditableSymptomRecord;