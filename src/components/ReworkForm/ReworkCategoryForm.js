import React, {useState} from "react";
import { useSelector } from "react-redux";
import rework_button from '../../UI/icons/rework_button.png';
import eventsApi from "services/events-api";
import s from './ReworkCategoryForm.module.css';

export default function ReworkCategoryForm({id, onTitle, onDescription, changeReworkToggler}) {
    const token = useSelector((state) => state.auth.user.token);
    
    const [categoryTitle, setCategoryTitle] = useState(onTitle);
    const [categoryDescription, setCategoryDescription] = useState(onDescription);

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

    const handleSubmit = () => {
        const category = {
            title: categoryTitle,
            description: categoryDescription,
            id_category: id,
        };
        eventsApi.reworkCategory({token: token, reworkedCategory: category});
        clearAllFields();
    };

    return (
        <div className={s.wrapper}>
            <div className={s.header_container}>
                <button className={s.rework_button} onClick={changeReworkToggler}><img alt="#" src={rework_button} /></button>
                <h2 className={s.header}>Редактирование категории</h2>
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
                    <button disabled={!categoryTitle} className={s.button} type="submit">Внести изменения</button>
                </div>
            </form>
        </div>
    );
};