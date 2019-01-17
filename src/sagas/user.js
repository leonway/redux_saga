import { takeEvery, call, put } from 'redux-saga/effects';
import request from '../utils/request';
// import { postOption } from '../common/common';

function* fetchUser() {
    try{
        const user = yield call(request,"https://jsonplaceholder.typicode.com/users");
        console.log(user);
        
        yield put({type:'FETCH_USER_SUCCEEDED', user: user})
    }catch(e){
        yield put({type:'FETCH_USER_FAILURE', error: e})
    }
}

function* fetchTodos() {
  const todos = yield call(request,"https://jsonplaceholder.typicode.com/todos");
  console.log(todos);
}

export function* watchFetchUser() {
  yield takeEvery('FETCH_USER_REQUEST', fetchUser);
}

export function* watchFetchTodos() {
  yield takeEvery('FETCH_TODOS_REQUEST', fetchTodos);
}