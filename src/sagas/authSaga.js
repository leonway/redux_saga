import { all, call, put, takeLatest,select } from 'redux-saga/effects';
import { message } from 'antd';
import types from 'constants/auth';
import { login } from 'services/auth';
import { loginToData } from 'common/authTree';
import { Action } from 'actionReducer/action';

const prefix = ['layout'];
const action = new Action(prefix);

function* userLogin({ payload }) {
    const { user, history } = payload;
    try {
        const { code, message, data:{ token, rolePowerDics } } = yield call(login, user);
       if(code===200){
        yield put({
            type: types.userLoginSuccess,
            payload: {}
        });
      const { authorTree, navItems, sidebars,openKeys } = loginToData(rolePowerDics);
      const payload = { status:"loading",navItems, sidebars,openKeys }
      const { router:{ location } } = yield select(_=>_)
      payload.nav1 = location.pathname.split("/",3)[1];
      payload.nav2 = location.pathname.split("/",3)[2];

      yield put(action.create('create',payload));
      
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
        yield put({ type: types.clearUserData });
    } catch (error) {
        yield put({ type: types.clearUserData });
    }
}

export default function* authSaga() {
    yield all([takeLatest(types.userLogin, userLogin), takeLatest(types.userLogout, userLogout)]);
}
