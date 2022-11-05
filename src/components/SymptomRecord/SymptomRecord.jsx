import { useDispatch } from 'react-redux';
import './SymptomRecord.css';

// mui imports
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// sweetalert
import swal from 'sweetalert';

function SymptomRecord({ symptomRecord, handleEdit }) {
  const dispatch = useDispatch();

  // formatting date object of symptom record to display MM.DD.YY
  const date = new Date(symptomRecord.created_at);
  const dateDisplay = `${(date.getMonth() + 1)}.${date.getDate()}.${date.getFullYear().toLocaleString().slice(-2)}`;

  // variables to store integer value converted back to text
  let appetiteDisplay;
  let energyDisplay;
  let stomachPainDisplay;
  let vomitDisplay;
  let diarrheaDisplay;

  // switch statements to check value for each category and supply text equivalent selected by user
  switch (symptomRecord.appetite) {
    case 0:
      appetiteDisplay = <span>Normal</span>;
      break;
    case 3:
      appetiteDisplay = <span>High</span>;
      break;
    case 5:
      appetiteDisplay = <span>Low</span>;
      break;
    case 10:
      appetiteDisplay = <span>None</span>;
      break;
    default:
      appetiteDisplay;
  }
  switch (symptomRecord.energy) {
    case 0:
      energyDisplay = <span>Normal</span>;
      break;
    case 1:
      energyDisplay = <span>High</span>;
      break;
    case 5:
      energyDisplay = <span>Low</span>;
      break;
    default:
      energyDisplay
  }
  switch (symptomRecord.stomach_pain) {
    case 0:
      stomachPainDisplay = <span>None</span>;
      break;
    case 5:
      stomachPainDisplay = <span>Some</span>;
      break;
    case 10:
      stomachPainDisplay = <span>A lot</span>;
      break;
    default:
      stomachPainDisplay;
  }
  switch (symptomRecord.vomit) {
    case 0:
      vomitDisplay = <span>None</span>;
      break;
    case 10:
      vomitDisplay = <span>w/o Blood</span>;
      break;
    case 30:
      vomitDisplay = <span>w/ Blood</span>;
      break;
    default:
      vomitDisplay;
  }
  switch (symptomRecord.diarrhea) {
    case 0:
      diarrheaDisplay = <span>None</span>;
      break;
    case 10:
      diarrheaDisplay = <span>w/o Blood</span>;
      break;
    case 30:
      diarrheaDisplay = <span>w/ Blood</span>;
      break;
    default:
      diarrheaDisplay;
  }

  // conditional formatting for background color of score column by symptom record score
  let HealthColor = '';
  if (symptomRecord.score <= 5) {
    HealthColor = "green";
  } else if (symptomRecord.score > 5 && symptomRecord.score <= 10) {
    HealthColor = "Yellow-green";
  } else if (symptomRecord.score > 10 && symptomRecord.score <= 15) {
    HealthColor = "Light-orange";
  } else if (symptomRecord.score > 15 && symptomRecord.score <= 20) {
    HealthColor = "orange";
  } else if (symptomRecord.score > 20 && symptomRecord.score <= 25) {
    HealthColor = "pink";
  } else if (symptomRecord.score > 25) {
    HealthColor = "red";
  }

  // prompts if record should be deleted, takes in id of record clicked on. if confirmed, calls deleteFeedback and passes ID as argument
  const confirmDelete = (id) => {
    // console.log('in confirmDelete. Record id to delete is:', id);
    swal({
      text: "Do you want to delete this record?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(confirmDelete => {
      if (confirmDelete) {
        deleteSymptomRecord(id);
      }
    });
  }

  // dispatches 'DELETE_RECORD', payload is symptomRecord id, function handleSymptomRecordDelete
  const deleteSymptomRecord = (id) => {
    dispatch({ type: 'DELETE_RECORD', payload: id, handleSymptomRecordDelete: handleSymptomRecordDelete });
  }

  const handleSymptomRecordDelete = () => {
    console.log('in handleSymptomRecordDelete');
    dispatch({ type: 'FETCH_RECORD', payload: symptomRecord.dog_id });
  }

  return (
    <TableRow key={symptomRecord.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ p: 0.2 }}>{dateDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2, fontWeight: '600' }} className={HealthColor}>{symptomRecord.score}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{appetiteDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{energyDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{stomachPainDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{vomitDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{diarrheaDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <Checkbox disabled checked={symptomRecord.med_given} />
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <IconButton sx={{ color: "#9c27b0" }} onClick={() => handleEdit(symptomRecord.id)}>
          <FontAwesomeIcon icon={faPenToSquare} size="xs" />
        </IconButton>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <IconButton sx={{ color: "#9c27b0" }} onClick={() => confirmDelete(symptomRecord.id)}>
          <FontAwesomeIcon icon={faTrash} size="xs" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default SymptomRecord;