import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fired on 'FETCH_DOG' action
function* fetchDog() {
  try {
    const userDog = yield axios.get('/api/dog');
    console.log('get dog by userId:', userDog.data);
    // after successful GET, dispatch action to store dog in dog reducer
    yield put({ type: 'SET_DOG', payload: userDog.data });
    // after successful SET, 'FETCH_MEDICATION' using dog data
    yield put({ type: 'FETCH_MEDICATION', payload: userDog.data });
  } catch (error) {
    console.log('Error in fetchDog dog:', error);
    alert('There\'s an error in fetchDog.');
  }
}

function* dogSaga() {
  yield takeLatest('FETCH_DOG', fetchDog);
}

export default dogSaga;
