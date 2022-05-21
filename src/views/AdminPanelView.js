import React from 'react';
import NoUser from 'components/NoUser/NoUser';
import s from './AdminPanelView.module.css';
import EventList from 'components/Events/EventList';
import CategoryList from 'components/Categories/CategoryList';
import { useSelector } from 'react-redux';

export default function AdminPanelView() {
    const isAdmin = useSelector((state) => state.auth.user.admin);

    return (
        <div className={s.wrapper}>
            {isAdmin ?
            <div className={s.container}>
                <div>
                    <EventList isAdmin={isAdmin} categoryTitle="Ожидающие события" categoryId={66666} eventPath="/adminpanel/"/>
                </div>
                <div>
                    <CategoryList isAdmin={isAdmin} categoryId={88888} headerTitle="Ожидающие категории"/>
                </div>
            </div> : 
            <div className={s.access_denied_container}>
                <NoUser message="Вы не имеете доступа к этой странице" />
            </div>
            }
        </div>
    );
};