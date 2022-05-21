import axios from "axios";
import authActions from "./auth-actions";

const register = credentials => async dispatch => {
    try{
        await axios.post('https://funpoint-server.herokuapp.com/android/register', credentials);
        dispatch(authActions.registerSuccess());
    } catch(error) {
        dispatch(authActions.registerError(error.response.data.cause));
    }
};

const login = credentials => async dispatch => {
    try{
        const response = await axios.post('https://funpoint-server.herokuapp.com/android/login', credentials);
        dispatch(authActions.loginSuccess(response.data));
    } catch(error) {
        dispatch(authActions.loginError('Неверный логин или пароль'));
    }
};

const logout = () => async dispatch => {
    dispatch(authActions.logoutSuccess());
};

const getCurrentUser = () => (dispatch, getState) => {
    const {user: {user: persistedUser}} = getState();

    if(!persistedUser.token) {
        return;
    }
    console.log(persistedUser);
    dispatch(authActions.getCurrentUserSuccess(persistedUser));
};

const authOperations = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authOperations;