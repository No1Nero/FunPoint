import React from "react";
import sadSmile from '../../UI/icons/sadSmile.png';
import s from './NoUser.module.css';

export default function NoUser({message}) {
    return (
        <div className={s.card}>
            <img className={s.img} alt="#" src={sadSmile} />
            <p className={s.parf}>{message}</p>
        </div>
    );
};