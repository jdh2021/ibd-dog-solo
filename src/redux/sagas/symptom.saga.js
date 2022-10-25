import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sweetalert
import swal from 'sweetalert';

function* fetchRecord(action) {
  // payload is dog id
  try {
    console.log('Dog id to retrieve record(s) for is:', action.payload);
    const dogRecord = yield axios.get(`/api/symptom/${action.payload}`);
    console.log('dogRecord array:', dogRecord.data);
    // after successful GET, dispatch action to store record(s) in record reducer
    yield put({ type: 'SET_RECORD', payload: dogRecord.data });
  } catch (error) {
    console.log('Error in fetchRecord:', error);
    swal('There\'s an error in fetchRecord.');
  }
}

function* postRecord(action) {
  // payload is symptom record object
  try {
    console.log('symptom record to post is:', action.payload);
    yield axios.post('/api/symptom', action.payload);
    // after successful POST, navigate to HealthStatus and clear inputs
    action.goToHealthStatus();
  } catch (error) {
    console.log('Error in postRecord:', error);
    swal('There\'s an error in postRecord.');
  }
}

function* deleteRecord(action) {
  // payload is symptom record id
  try {
    console.log('symptom record id to delete is', action.payload);
    yield axios.delete(`/api/symptom/${action.payload}`);
    // after successful DELETE, dispatch 'FETCH_RECORD'
    action.handleSymptomRecordDelete();
  } catch (error) {
    console.log('Error in deleteRecord:', error);
    swal('There\'s an error in deleteRecord.');
  }
}

function* putRecord(action) {
  // payload is symptom record object
  try {
    console.log('symptom record to update is', action.payload);
    yield axios.put('/api/symptom', action.payload);
    // after successful PUT, dispatch 'FETCH_RECORD'
    action.handleEditRecordSuccess();
  } catch (error) {
    console.log('Error in putRecord:', error);
    swal('There\'s an error in putRecord.');
  }
}

function* symptomSaga() {
  yield takeLatest('FETCH_RECORD', fetchRecord);
  yield takeLatest('POST_RECORD', postRecord);
  yield takeLatest('DELETE_RECORD', deleteRecord);
  yield takeLatest('PUT_RECORD', putRecord);
}

export default symptomSaga;
