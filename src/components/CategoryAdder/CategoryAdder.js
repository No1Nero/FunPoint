import React, {useState, useEffect} from 'react';
import s from './CategoryAdder.module.css';
import eventsApi from 'services/events-api';
import { useSelector } from 'react-redux';

export default function CategoryAdder({responseCategory}) {
    const token = useSelector((state) => state.auth.user.token);

    const [status, setStatus] = useState(null);

    const [categoryTitle, setCategoryTitle] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');

    useEffect(() => {
        responseCategory(status);
    }, [responseCategory, status]);

    const handleChange = e => {
        const {name, value} = e.target;

        switch (name) {
            case "categoryTitle":
                setCategoryTitle(value);
                break;

            case 'categoryDescription':
                setCategoryDescription(value);
                break;

            default:
                return;
        };
    };

    const clearAllFields = () => {
        setCategoryTitle('');
        setCategoryDescription('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        const category = {
            title: categoryTitle,
            description: categoryDescription,
        };
        eventsApi.addCategory({category: category, setStatus: setStatus, token: token});
        clearAllFields();
    };

    return (
        <div>
            <div className={s.wrapper}>
                <div className={s.header_container}>
                    <h2 className={s.header}>Добавление категории</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={s.form}>
                        <section className={s.section}>
                            <label className={s.label}>Название категории</label>
                            <input className={s.input} type="text" name='categoryTitle' value={categoryTitle} onChange={handleChange}></input>
                        </section>
                        <section className={s.section_description}>
                            <label className={s.label_description}>Описание</label>
                            <textarea className={s.input_description} type="text" name='categoryDescription' value={categoryDescription} onChange={handleChange}></textarea>
                        </section>
                        <p className={s.paragraf}> - обязательное поле для заполения</p>
                    </div>
                    <div className={s.buttons}>
                        <button className={s.button} type="button" onClick={clearAllFields}>Очистить</button>
                        <button disabled={!categoryTitle} className={s.button} type="submit">Добавить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};