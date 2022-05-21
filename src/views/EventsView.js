import React, {useState} from "react";
import s from './EventsView.module.css';
import FilterPanel from "components/FilterPanel/FilterPanel";
import EventList from "components/Events/EventList";

export default function EventsView() {
    const [idCallback, setIdCallback] = useState(null);
    const [titleCallback, setTitleCallback] = useState('');

    const callback = ({id, title}) => {
        setIdCallback(id);
        setTitleCallback(title);
    };

    return (
        <div className={s.wrapper}>
            <div className={s.left_list}>
                <EventList categoryTitle={titleCallback} categoryId={idCallback} eventPath="/events/"/>
            </div>
            <div className={s.right_filter}>
                <FilterPanel idDrilling={callback}/>
            </div>
        </div>
    );
};