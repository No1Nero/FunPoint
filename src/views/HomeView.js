import React from 'react';
import s from './HomeView.module.css';

export default function HomeView() {
    return (
        <div className={s.wrapper}>
            <h2 className={s.h2}>Сервіс для пошуку актуальних подій міста</h2>
        </div>
    );
};