import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* postRecord(action) {
  try {
    console.log('symptom record to post is:', action.payload);
    yield axios.post('/api/symptom', action.payload);
    // after successful POST, navigate to HealthStatus and clear inputs
    action.goToHealthStatus();
  } catch (error) {
    console.log('Error in postRecord:', error);
    alert('There\'s an error in postRecrd.');
  }
}

function* symptomSaga() {
  yield takeLatest('POST_RECORD', postRecord);
}

export default symptomSaga;
