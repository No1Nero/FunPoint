import React from 'react';
import s from './HomeView.module.css';

export default function HomeView() {
    return (
        <div className={s.wrapper}>
            <h2 className={s.h2}>Сервис для поиска актуальных событий города</h2>
        </div>
    );
};