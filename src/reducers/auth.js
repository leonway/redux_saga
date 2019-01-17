import { createReducer } from 'utils/index';
// import AuthService from 'services/auth';
import types from 'constants/auth';


const initialState = {
    isRefreshing: false,
    isloading: false,
    error: null
};

// actions
export const userActions = {
    userLogin: (user, location, history) => ({
        type: types.userLogin,
        payload: { user, location, history }
    }),
    userLogout: () => ({ type: types.userLogout })
};

// Reducers
export const authReducer = createReducer(initialState, {
    [types.userLogin]: userLogin,
    [types.userLoginSuccess]: userLoginSuccess,
    [types.userLoginFailure]: userLoginFailure,
    [types.authRefreshToken]: refreshToken,
    [types.authRefreshTokenSuccess]: refreshTokenSuccess,
    [types.authRefreshTokenFailure]: clearUserData,
    [types.clearUserData]: clearUserData
});

function refreshToken(state) {
    return { ...state, isRefreshing: true };
}
function refreshTokenSuccess(state, action) {
    return { ...state, ...action.user, isRefreshing: false };
}
function clearUserData() {
    localStorage.clear();
    return { isloading: false, error: null, token: null, isRefreshing: true };
}
function userLogin(state) {
    return { ...state, isloading: true };
}
function userLoginSuccess(state, action) {
    return { ...state, ...action.payload, isloading: false, isLoggedIn: true, isRefreshing: false };
}
function userLoginFailure(state, action) {
    return { ...state, error: action.payload, isloading: false, isLoggedIn: false };
}
