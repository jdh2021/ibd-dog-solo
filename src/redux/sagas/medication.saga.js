import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fired on 'FETCH_MEDCIATION' action
function* fetchMedication(action) {
  // payload is dog object retrieved once 'FETCH_DOG' fires. payload.id is dog id.
  try {
    console.log('Dog id to retrieve medication for is:', action.payload);
    const dogMedication = yield axios.get(`/api/medication/${action.payload}`);
    console.log('dogMedication array:', dogMedication.data);
    yield put({ type: 'SET_MEDICATION', payload: dogMedication.data });
  } catch (error) {
    console.log('Error in fetchMedication by dog');
    alert('There\'s an error in fetchMedication by dog.');
  }
}

function* medicationSaga() {
  yield takeLatest('FETCH_MEDICATION', fetchMedication);
}

export default medicationSaga;
