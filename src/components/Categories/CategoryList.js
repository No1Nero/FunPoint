import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import eventsApi from "services/events-api";
import CategoryCard from "./CategoryCard";
import s from './CategoryList.module.css';

export default function CategoryList({headerTitle, categoryId, isAdmin = false}) {
    const token = useSelector((state) => state.auth.user.token);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (categoryId === 99999) {
            eventsApi.fetchAddedCategories({token: token, setState: setCategories});
        } else if (categoryId === 88888) {
            eventsApi.fetchAdminCategories({token: token, setState: setCategories});
        }
        
    }, [categoryId, token]);

    return (
        <div>
            <h2 className={s.event_header}>{headerTitle}</h2>
            <ul className={s.event_ul}>
                {categories.map(({description, title, id_category, moderatingMessage, moderatingStatus}) => (
                    <li className={s.event_li} key={id_category}>
                        <CategoryCard moderatingStatus={moderatingStatus} moderatingMessage={moderatingMessage} categoryId={categoryId} id={id_category} isAdmin={isAdmin} title={title} description={description} />
                    </li>
                ))}
            </ul>
        </div>
    );
};