import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, NavLink } from 'react-router-dom';
import logo from '../../UI/logo/logo.png';
import profile from '../../UI/icons/profile.png';
import s from './Layout.module.css';

export default function Layout() {
    const token = useSelector((state) => state.auth.user.token);
    const userName = useSelector((state) => state.auth.user.username);

    return (
        <>
            <header className={s.header}>
                <div className={s.img_wrapper}>
                    <NavLink to='/'><img className={s.img} alt='#' src={logo} /></NavLink>
                </div>
                <div className={s.navigation}>
                    <NavLink className={s.menu_link} to='/'>Главная</NavLink>
                    <NavLink className={s.menu_link} to='/events'>События</NavLink>
                    <NavLink className={s.menu_link} to='/myevents'>Мои события</NavLink>
                    {token ? 
                    <NavLink className={s.navlink_img} to='/profile'>
                        <div className={s.div_image}>
                            <img  className={s.profile_img} alt='#' src={profile} />
                            <label className={s.profile_label}>{userName}</label>
                        </div>
                    </NavLink> :
                    <form className={s.auth_form} action='/auth'>
                        <button className={s.auth_button}>Войти</button>
                    </form>}
                </div>
            </header>
            <Outlet />
        </>
    );
};