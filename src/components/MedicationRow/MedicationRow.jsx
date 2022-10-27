import './MedicationRow.css';

// mui imports
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function MedicationRow({ medication, confirmDelete, editMedicationStatus }) {
  // conditional formatting if medication is active or inactive
  let medicationStatus;
  if (medication.active) {
    medicationStatus = 'Active-row'
  } else {
    medicationStatus = 'Inactive-row'
  }
  // conditional formatting to display date medication started, inactive on page. first check if null. 
  let medStartDate;
  let formattedMedStartDate;
  let medEndDate;
  let formattedMedEndDate;
  if (medication.date_started === null) {
    formattedMedStartDate = '';
  } else {
    medStartDate = new Date(medication.date_started);
    formattedMedStartDate = medStartDate.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
  }
  if (medication.date_inactive === null) {
    formattedMedEndDate = '';
  } else {
    medEndDate = new Date(medication.date_inactive);
    formattedMedEndDate = medEndDate.toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });
  }

  return (
    <TableRow
      key={medication.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      className={medicationStatus}
    >
      <TableCell component="th" scope="row" align="center" sx={{ pt: 0.3, pb: 0.3 }}>
        {medication.name}
      </TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>{medication.dosage}</TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>{medication.frequency}</TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>{formattedMedStartDate}</TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>{formattedMedEndDate}</TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>
        <Checkbox
          checked={medication.active}
          onChange={() => editMedicationStatus(medication)}
        />
      </TableCell>
      <TableCell align="center" sx={{ pl: 0, pr: 0, pt: 0.3, pb: 0.3 }}>
        <IconButton sx={{ color: "#9c27b0" }} onClick={() => confirmDelete(medication.id)}>
          <FontAwesomeIcon icon={faTrash} size="xs" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default MedicationRow;