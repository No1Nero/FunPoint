import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import eventsApi from "services/events-api";
import s from './OneEventView.module.css';
import favourite from '../UI/icons/favourite.png';
import no_favourite from '../UI/icons/no_favourite.png';

export default function OneEventView() {
    const token = useSelector((state) => state.auth.user.token);
    const {id} = useParams();

    const [event, setEvent] = useState([]);

    useEffect(() => {
        eventsApi.fetchEvent({id: id, setState: setEvent, token: token});
    }, [id, token]);

    const addToFavourite = () => {
        eventsApi.addEventToFavourite({token: token, idEvent: event.id, setState: setEvent});
    };

    const removeFromFavourite = () => {
        eventsApi.removeEventFromFavourite({token: token, idEvent: event.id, setState: setEvent});
    };

    return(
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.header_wrapper}>
                    <h2 className={s.h2}>{event.title}</h2>
                    {token && 
                        <>
                        {event.favouriteForCurrentUser ? 
                            <img onClick={removeFromFavourite} alt="#" src={favourite}/> : 
                            <img onClick={addToFavourite} alt="#" src={no_favourite} />
                        }
                        </>
                    }
                </div>
                <div className={s.card_div}>
                    <section className={s.section_address}>
                        <label className={s.label}>Адреса: </label>
                        <label className={s.section_value}>{event.address}</label>
                    </section>
                    <section className={s.section_price}>
                        <label className={s.label}> Ціна: </label>
                        <label className={s.section_value}>{event.price} грн</label>
                    </section>
                    <section className={s.section_date}>
                        <label className={s.label}>Дата: </label>
                        <label className={s.section_value}>{event.eventDate}</label>
                    </section>
                    <section className={s.section_time}>
                        <label className={s.label}>Час: </label>
                        <label className={s.section_value}>{event.eventTime}</label>
                    </section>
                    <section className={s.section_contact}>
                        <label className={s.label}>Контакт: </label>
                        <label className={s.section_value}>{event.phoneNumber}</label>
                    </section>
                    <section className={s.section_description}>
                        <label className={s.label}>Опис: </label>
                        <label className={s.section_value_description}>{event.description}</label>
                    </section>
                </div>
            </div>
        </div>
    );
};