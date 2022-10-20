import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// sweetalert
import swal from 'sweetalert';

function* fetchDog() {
  try {
    const userDog = yield axios.get('/api/dog');
    console.log('get dog by userId:', userDog.data);
    // after successful GET, dispatch action to store dog in dog reducer
    yield put({ type: 'SET_DOG', payload: userDog.data });
    // after successful SET, 'FETCH_MEDICATION', 'FETCH_RECORD' using dog data
    yield put({ type: 'FETCH_MEDICATION', payload: userDog.data.id });
    yield put({ type: 'FETCH_RECORD', payload: userDog.data.id });
  } catch (error) {
    console.log('Error in fetchDog:', error);
    swal('There\'s an error in fetchDog.');
  }
}

function* putDog(action) {
  // payload is dog object
  try {
    console.log('dog object to update is:', action.payload);
    yield axios.put('/api/dog', action.payload);
    action.handleEditSuccess();
  } catch (error) {
    console.log('Error in putDog:', error);
    swal('There\'s an error in putDog.');
  }
}

function* dogSaga() {
  yield takeLatest('FETCH_DOG', fetchDog);
  yield takeLatest('PUT_DOG', putDog);
}

export default dogSaga;
