import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SymptomRecord from '../SymptomRecord/SymptomRecord';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

function HealthStatus() {
  const dispatch = useDispatch();

  // retrieve data from record reducer in store
  const records = useSelector(store => store.record);

  // useEffect to dispatch action 'FETCH_DOG' when HealthStatus renders
  useEffect(() => {
    dispatch({ type: 'FETCH_DOG' });
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={11.75} sm={11.75} md={11.25} lg={10.75} xl={9.5}>
        <TableContainer component={Paper} sx={{ mt: 4, mb: 5, backgroundColor: "#d6dde3" }}>
          <Typography sx={{ mt: 3, mb: 2 }} variant="h6">Check-in Records</Typography>
          <Table sx={{ backgroundColor: "#eaeef1", p: 3 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 10 }}>Date</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 10 }}>Score</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 70 }}>Appetite</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 50 }}>Energy</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 50 }}>Pain</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 70 }}>Vomit</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 70 }}>Diarrhea</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 10 }}>Meds?</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 10 }}>Action</TableCell>
                <TableCell align="center" sx={{ pt: 0.3, pb: 0.3 }} style={{ width: 10 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map(symptomRecord => {
                return < TableRow
                  key={symptomRecord.id}
                />
              })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}

export default HealthStatus;