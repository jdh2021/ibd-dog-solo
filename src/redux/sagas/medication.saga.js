import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sweetalert
import swal from 'sweetalert';

function* fetchMedication(action) {
  // payload is dog id
  try {
    console.log('Dog id to retrieve medication for is:', action.payload);
    const dogMedication = yield axios.get(`/api/medication/${action.payload}`);
    console.log('dogMedication array:', dogMedication.data);
    yield put({ type: 'SET_MEDICATION', payload: dogMedication.data });
  } catch (error) {
    console.log('Error in fetchMedication by dog');
    swal('There\'s an error in fetchMedication by dog.');
  }
}

function* postMedication(action) {
  // payload is medication object
  try {
    console.log('medication to post is:', action.payload);
    yield axios.post('/api/medication', action.payload);
    // after successul POST, dispatch 'FETCH_DOG' and clear inputs
    action.handleMedicationPost();
  } catch (error) {
    console.log('Error in postMedication:', error);
    swal('There\'s an error in postMedication.');
  }
}

function* deleteMedication(action) {
  // payload is medication id
  try {
    console.log('medication id to delete is', action.payload);
    yield axios.delete(`/api/medication/${action.payload}`);
    // after successful DELETE, dispatch 'FETCH_MEDICATION'
    action.handleMedicationChange();
  } catch (error) {
    console.log('Error in deleteMedication:', error);
    swal('There\'s an error in deleteMedication.');
  }
}

function* putMedication(action) {
  // payload is medication object
  try {
    console.log('medication object to update is', action.payload);
    yield axios.put('/api/medication', action.payload);
    // after successful PUT, dispatch 'FETCH_MEDICATION'
    action.handleMedicationChange();
  } catch (error) {
    console.log('Error in putMedication:', error);
    swal('There\'s an error in putMedication.');
  }
}

function* medicationSaga() {
  yield takeLatest('FETCH_MEDICATION', fetchMedication);
  yield takeLatest('POST_MEDICATION', postMedication);
  yield takeLatest('DELETE_MEDICATION', deleteMedication);
  yield takeLatest('PUT_MEDICATION', putMedication)
}

export default medicationSaga;
