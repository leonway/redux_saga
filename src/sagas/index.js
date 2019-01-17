import { all } from 'redux-saga/effects';
import authSagas from './authSaga';

export default function* rootSaga() {
    yield all([
        authSagas()
    ]);
}