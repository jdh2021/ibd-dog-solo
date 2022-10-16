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