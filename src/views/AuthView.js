import React, {useState} from 'react';
import RegistrationForm from 'components/Auth/RegistrationForm';
import AuthrizationForm from 'components/Auth/AuthorizationForm';
import authActions from 'Redux/auth/auth-actions';
import s from './AuthView.module.css';
import { useDispatch } from 'react-redux';

export default function AuthView() {
    const [toggler, setToggler] = useState(true);

    const dispatch = useDispatch();

    const resetAuthError = () => {
        dispatch(authActions.resetError());
    };

    const handleToggler = () => {
        setToggler(toggler => !toggler);
        resetAuthError();
    };

    return (
        <div className={s.wrapper}>
            <div className={s.div_buttons}>
                <button className={s.left_button} disabled={toggler} onClick={handleToggler} type='button'>Реєстрація</button>
                <button className={s.right_button} disabled={!toggler} onClick={handleToggler} type="button">Авторизація</button>
            </div>
            <div className={s.div_content}>
                {toggler ? <RegistrationForm /> : <AuthrizationForm />}
            </div>
        </div>
    );
};