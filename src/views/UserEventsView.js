import React, {useState} from 'react';
import s from './UserEventsView.module.css';
import EventAdder from 'components/EventAdder/EventAdder';
import CategoryAdder from 'components/CategoryAdder/CategoryAdder';
import NoUser from 'components/NoUser/NoUser';
import { useSelector } from 'react-redux';
import EventList from 'components/Events/EventList';
import CategoryList from 'components/Categories/CategoryList';

export default function UserEventsView() {
    const [toggler, setToggler] = useState(true);
    const [categoryStatus, setCategoryStatus] = useState(null);

    const token = useSelector((state) => state.auth.user.token);

    const changeToggler = () => {
        setToggler(toggler => !toggler);
    };

    return (
        <div className={s.wrapper}>
            {token ? 
            <div className={s.container}>
                <div>
                    <EventAdder categoryStatus={categoryStatus} />
                    <CategoryAdder responseCategory={setCategoryStatus} />
                </div>
                <div>
                    <div className={s.button_wrapper}>
                        <button className={s.button} onClick={changeToggler}>{toggler ? "Перейти к категориям" : "Перейти к событиям"}</button>
                    </div>
                    {toggler ? 
                        <EventList categoryStatus={categoryStatus} categoryTitle="Добавленные события" categoryId={77777} eventPath="/myevents/"/> : 
                        <CategoryList categoryId={99999} headerTitle="Добавленные категории"/>
                    }
                </div>
            </div> : 
            <div className={s.nouser_container}>
                <NoUser message="Зарегистрируйтесь или авторизуйтесь, чтоб получить возможность добавлять собственные события и категории."/>
            </div>}
        </div>
    );
};