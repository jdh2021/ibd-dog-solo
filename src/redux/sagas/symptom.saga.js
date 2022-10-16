import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchRecord(action) {
  // payload is dog object retrieved once 'FETCH_DOG' fires. payload.id is dog id.
  try {
    console.log('Dog id to retrieve record(s) for is:', action.payload);
    const dogRecord = yield axios.get(`/api/symptom/${action.payload}`);
    console.log('dogRecord array:', dogRecord.data);
    yield put({ type: 'SET_RECORD', payload: dogRecord.data });
  } catch (error) {
    console.log('Error in fetchRecord by dog');
    alert('There\'s an error in fetchRecord by dog.');
  }
}

function* postRecord(action) {
  try {
    console.log('symptom record to post is:', action.payload);
    yield axios.post('/api/symptom', action.payload);
    // after successful POST, navigate to HealthStatus and clear inputs
    action.goToHealthStatus();
  } catch (error) {
    console.log('Error in postRecord:', error);
    alert('There\'s an error in postRecord.');
  }
}

function* symptomSaga() {
  yield takeLatest('FETCH_RECORD', fetchRecord);
  yield takeLatest('POST_RECORD', postRecord);
}

export default symptomSaga;
