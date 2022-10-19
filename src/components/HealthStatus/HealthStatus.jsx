import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditableSymptomRecord from '../EditableSymptomRecord/EditableSymptomRecord';
import SymptomRecord from '../SymptomRecord/SymptomRecord';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';

function HealthStatus() {
  const dispatch = useDispatch();

  // retrieve data from record reducer in store
  const records = useSelector(store => store.record);

  // useEffect to dispatch action 'FETCH_DOG' when HealthStatus renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  // local state for changeable value of symptom record id being edited
  const [editSymptomRecordId, setEditSymptomRecordId] = useState(null);

  // when edit button clicked in SymptomRecord, sets symptom record id to edit
  const handleEdit = (id) => {
    console.log('in handleEdit. symptom record id to edit is:', id);
    setEditSymptomRecordId(id);
  }

  // table pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11.75} sm={11.75} md={11.25} lg={10.75} xl={9.5}>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 5, backgroundColor: "#d6dde3" }}>
          <Typography sx={{ mt: 3, mb: 2 }} variant="h6">Check-in Records</Typography>
          <Table sx={{ backgroundColor: "#eaeef1", p: 3 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 10 }}>Date</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 10 }}>Score</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 50 }}>Appetite</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 50 }}>Energy</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 50 }}>Pain</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 70 }}>Vomit</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 70 }}>Diarrhea</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 10 }}>Meds?</TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 10 }}></TableCell>
                <TableCell align="center" sx={{ pt: 0.5, pb: 0.5 }} style={{ minWidth: 10 }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(symptomRecord => {
                  return <Fragment key={symptomRecord.id}>
                    {editSymptomRecordId === symptomRecord.id ?
                      <EditableSymptomRecord
                        symptomRecord={symptomRecord}
                        key={symptomRecord.id}
                        setEditSymptomRecordId={setEditSymptomRecordId}
                      /> :
                      <SymptomRecord
                        symptomRecord={symptomRecord}
                        key={symptomRecord.id}
                        handleEdit={handleEdit}
                      />
                    }
                  </Fragment>
                })}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[7, 14, 30]}
            component="div"
            count={records.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default HealthStatus;