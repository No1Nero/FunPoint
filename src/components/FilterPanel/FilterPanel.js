import React, {useState, useEffect} from "react";
import classNames from "classnames";
import './FilterPanel.css';
import eventsApi from "services/events-api";

export default function FilterPanel({idDrilling}) {
    const [categories, setCategories] = useState([]);
    const [chosen, setChosen] = useState(99999);
    const [chosenTitle, setChosenTitle] = useState('Все события');

    const id = 99999;

    useEffect(() => {
        idDrilling({
            id: chosen,
            title: chosenTitle
        });
    });

    useEffect(() => {
        eventsApi.fetchCategories({setState: setCategories});
    }, []);

    const handleClick = id => {
        setChosen(id);
        const object = categories.filter(category => category.id_category === id);
        setChosenTitle(object[0].title);
    };

    const handleAllClick = id => {
        setChosen(id);
        setChosenTitle('Все события');
    };

    return (
        <div className="filter_wrapper">
            <h2 className="filter_header">Категории событий</h2>
            <div className="filter_menu">
                <section name="Все события" title="Все события на сайте" className={classNames('filter_all', chosen === id ? 'chosen' : null)} key={id} onClick={() => handleAllClick(id)}>Все события</section>
                {categories.map(({id_category, title, description}) => 
                    <section name={title} title={description} className={classNames('filter_section', chosen === id_category ? 'chosen' : null)} key={id_category} onClick={() => handleClick(id_category)}>{title}</section>
                )}
            </div>
        </div>
    );
};