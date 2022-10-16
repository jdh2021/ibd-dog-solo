import { useDispatch } from 'react-redux';

// material ui imports
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function SymptomRecord({ symptomRecord }) {
  // formatting date object of symptom record to display YY.MM.DD
  const date = new Date(symptomRecord.created_at);
  const dateDisplay = `${(date.getMonth() + 1)}.${date.getDate()}.${date.getFullYear().toLocaleString().slice(-2)}`;

  // empty variable to store integer value converted back to text
  let appetiteDisplay = <span></span>;
  let energyDisplay = <span></span>;
  let stomachPainDisplay = <span></span>;
  let vomitDisplay = <span></span>;
  let diarrheaDisplay = <span></span>;

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

  return (
    <TableRow key={symptomRecord.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row" align="center" sx={{ p: 0.2 }}>{dateDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{symptomRecord.score}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{appetiteDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{energyDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{stomachPainDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{vomitDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>{diarrheaDisplay}</TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        {symptomRecord.med_given ?
          <Checkbox disabled checked /> : <Checkbox disabled />
        }
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <IconButton sx={{ color: "#666666" }}>
          <FontAwesomeIcon icon={faPenToSquare} size="xs" />
        </IconButton>
      </TableCell>
      <TableCell align="center" sx={{ p: 0.2 }}>
        <IconButton sx={{ color: "#666666" }}>
          <FontAwesomeIcon icon={faTrash} size="xs" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default SymptomRecord;