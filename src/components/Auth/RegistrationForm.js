import React, {useState} from "react";
import authOperations from "Redux/auth/auth-operations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import s from './RegistrationForm.module.css';

export default function RegistrationForm() {
    const [userName, setUserName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const error = useSelector((state) => state.auth.error);

    const handleRegistration = (user) => {
        dispatch(authOperations.register(user));
    };

    const handleChange = e => {
        const {name, value} = e.target;

        switch(name) {
            case 'userName':
                setUserName(value);
                break;

            case 'firstName':
                setFirstName(value);
                break;

            case 'lastName':
                setLastName(value);
                break;

            case 'email':
                setEmail(value);
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
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const user = {
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        };
        handleRegistration(user);
        clearAllFields();
    };

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <div className={s.header_container}>
                <h2>Реєстрація користувача</h2>
            </div>
            <div className={s.div_content}>
                <section className={s.section}>
                    <label className={s.label}>Нік користувача</label>
                    <input className={s.input} type="text" onChange={handleChange} name='userName' value={userName}></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Ім'я</label>
                    <input className={s.input} type="text" onChange={handleChange} name='firstName' value={firstName}></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Прізвище</label>
                    <input className={s.input} type="text" onChange={handleChange} name='lastName' value={lastName}></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Пошта</label>
                    <input className={s.input} type="email" onChange={handleChange} name='email' value={email}></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Пароль</label>
                    <input className={s.input} type="password" onChange={handleChange} name='password' value={password}></input>
                </section>
                {error && <p className={s.error}>{error}</p>}
            </div>
            <div className={s.buttons}>
                <button disabled={!userName || !firstName || !lastName || !email || !password} className={s.button} type="submit">Зареєструватися</button>
            </div>
        </form>
    );
};