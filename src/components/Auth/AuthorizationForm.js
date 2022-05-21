import React, {useState} from "react";
import {useSelector} from 'react-redux';
import authOperations from "Redux/auth/auth-operations";
import { useDispatch } from "react-redux";
import s from './AuthorizationForm.module.css';

export default function AuthrizationForm() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const handleAuthorization = (user) => {
        dispatch(authOperations.login(user));
    };

    const handleChange = e => {
        const {name, value} = e.target;

        switch(name) {
            case 'userName':
                setUserName(value);
                break;

            case 'password':
                setPassword(value);
                break;

            default:
                return;
        };
    };

    const clearAllFields = () => {
        setUserName('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            username: userName,
            password: password,
        };
        handleAuthorization(user);
        clearAllFields();
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.header_container}>
                <h2>Авторизация пользователя</h2>
            </div>
            <div className={s.div_content}>
                <section className={s.section}>
                    <label className={s.label}>Имя пользователя</label>
                    <input className={s.input} type="text" onChange={handleChange} name='userName' value={userName}></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Пароль</label>
                    <input className={s.input} type="password" onChange={handleChange} name='password' value={password}></input>
                </section>
                {error && <p className={s.error}>{error}</p>}
            </div>
            <div className={s.buttons}>
                <button disabled={!userName || !password} className={s.button} type="submit">Войти</button>
            </div>
        </form>
    );
};