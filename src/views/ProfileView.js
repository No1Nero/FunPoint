import React from "react";
import EventList from "components/Events/EventList";
import { useDispatch, useSelector } from "react-redux";
import profile from '../UI/icons/profile.png';
import authOperations from "Redux/auth/auth-operations";
import s from './ProfileView.module.css';
import { NavLink } from "react-router-dom";

export default function ProfileView() {
    const {username, firstName, lastName, email, admin} = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    const onLogOut = () => {
        dispatch(authOperations.logout());
    };

    return (
        <div className={s.wrapper}>
            <div className={s.userInfo_container}>
                <div className={s.userInfo_card}>
                    <div className={s.header_container}>
                        <img className={s.header_img} alt="#" src={profile} />
                        <label className={s.header_label}>Особиста інформація</label>
                    </div>
                    <div className={s.info_container}>
                        <section className={s.section}>
                            <label className={s.label_name}>Нік користувача:</label>
                            <label> {username}</label>
                        </section>
                        <section  className={s.section}>
                            <label className={s.label_name}>Ім'я користувача:</label>
                            <label> {firstName} {lastName}</label>
                        </section>
                        <section className={s.section}>
                            <label className={s.label_name}>Пошта:</label>
                            <label> {email}</label>
                        </section>
                        {admin &&
                            <section className={s.section}>
                                <NavLink className={s.admin_navlink} to="/adminpanel">Перейти до панелі адміністратора</NavLink>
                            </section>
                        }
                    </div>
                    <div className={s.button_container}>
                        <button onClick={onLogOut} className={s.logout_button} type="button">Вийти з профіля</button>
                    </div>
                </div>
            </div>
            <div>
                <EventList categoryId={88888} categoryTitle="Обрані події" eventPath="/profile/"/>
            </div>
        </div>
    );
};