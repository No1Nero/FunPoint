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
                    <EventList isAdmin={isAdmin} categoryTitle="Очікуючі події" categoryId={66666} eventPath="/adminpanel/"/>
                </div>
                <div>
                    <CategoryList isAdmin={isAdmin} categoryId={88888} headerTitle="Очікуючі категорії"/>
                </div>
            </div> : 
            <div className={s.access_denied_container}>
                <NoUser message="Ві не маєте доступу до даної сторінки" />
            </div>
            }
        </div>
    );
};