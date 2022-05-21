import React, {useState, useEffect} from "react";
import EventCard from "./EventCard";
import eventsApi from "services/events-api";
import s from './EventList.module.css';
import { useSelector } from "react-redux";

export default function EventList({categoryId, categoryTitle, eventPath, isAdmin = false, categoryStatus}) {
    const token = useSelector((state) => state.auth.user.token);

    const [events, setEvents] = useState([]);

    useEffect(() => {
        if(categoryId === 99999) {
            eventsApi.fetchAllEvents({setState: setEvents});
        } else if (categoryId === 77777) {
            eventsApi.fetchAddedEvents({token: token, setState: setEvents});
        } else if (categoryId === 88888) {
            eventsApi.fetchFavourite({token: token, setState: setEvents});
        } else if (categoryId === 66666) {
            eventsApi.fetchAdminEvents({token: token, setState: setEvents});
        } else {
            eventsApi.fetchCategoryEvents({categoryId: categoryId, setState: setEvents});
        }
    }, [categoryId, token]);

    return (
        <div>
            <h2 className={s.event_header}>{categoryTitle}</h2>
                <ul className={s.event_ul}>
                {events.map(({eventTime, address, price, categoryTitle, phoneNumber, description, id, eventDate, title, moderatingStatus, moderatingMessage}) => (
                    <li className={s.event_li} key={id}>
                        <EventCard
                            eventTime={eventTime}
                            address={address}
                            price={price}
                            categoryTitle={categoryTitle}
                            phoneNumber={phoneNumber}
                            categoryStatus={categoryStatus}
                            categoryId={categoryId}
                            moderatingStatus={moderatingStatus}
                            moderatingMessage={moderatingMessage}
                            isAdmin={isAdmin}
                            id={id} 
                            idPath={`${eventPath}${id}`}
                            eventDate={eventDate}
                            title={title} 
                            description={description} />
                    </li>
                ))}
            </ul>
            
        </div>
    );
}