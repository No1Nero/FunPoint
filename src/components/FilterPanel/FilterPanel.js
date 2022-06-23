import React, {useState, useEffect} from "react";
import classNames from "classnames";
import './FilterPanel.css';
import eventsApi from "services/events-api";

export default function FilterPanel({idDrilling}) {
    const [categories, setCategories] = useState([]);
    const [chosen, setChosen] = useState(99999);
    const [chosenTitle, setChosenTitle] = useState('Усі події');

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
        setChosenTitle('Усі події');
    };

    return (
        <div className="filter_wrapper">
            <h2 className="filter_header">Категорії подій</h2>
            <div className="filter_menu">
                <section name="Усі події" title="Усі події на сайті" className={classNames('filter_all', chosen === id ? 'chosen' : null)} key={id} onClick={() => handleAllClick(id)}>усі події</section>
                {categories.map(({id_category, title, description}) => 
                    <section name={title} title={description} className={classNames('filter_section', chosen === id_category ? 'chosen' : null)} key={id_category} onClick={() => handleClick(id_category)}>{title}</section>
                )}
            </div>
        </div>
    );
};