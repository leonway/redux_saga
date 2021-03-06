import { all, call, put, takeLatest } from 'redux-saga/effects';
import { message } from 'antd';
import types from 'constants/auth';
import { login } from 'services/auth';

function* userLogin({ payload }) {
    const { user, history } = payload;
    try {
        const { code, message } = yield call(login, user);
       if(code===200){
        yield put({
            type: types.userLoginSuccess,
            payload: {}
        });
        const { origin } = window.location;
        if (history) {
            history.push({ pathname: '/' });
        } else {
            window.location.href = origin;
        }
       }else{
        message.error(message);
        yield put({ type: types.userLoginFailure, payload: message });
       }
      
    } catch (error) {
        message.error(error.message);
        yield put({ type: types.userLoginFailure, payload: error });
    }
}

function* userLogout() {
    try {
        // yield call(AuthService.logout);
        yield put({ type: types.clearUserData });
    } catch (error) {
        yield put({ type: types.clearUserData });
    }
}

export default function* authSaga() {
    yield all([
      takeLatest(types.userLogin, userLogin), 
      takeLatest(types.userLogout, userLogout)
    ]);
}
