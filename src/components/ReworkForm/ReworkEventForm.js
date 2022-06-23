import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import eventsApi from "services/events-api";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import rework_button from '../../UI/icons/rework_button.png';
import s from './ReworkEventForm.module.css';

export default function ReworkEventForm({categoryStatus, id, onAddress, onPrice, categoryTitle, onPhoneNumber, changeReworkToggler, title, onDescription, eventDate, eventTime}) {
    const token = useSelector((state) => state.auth.user.token);

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState(title);
    const [category, setCategory] = useState(categoryTitle);
    const [address, setAddress] = useState(onAddress);
    const [date, setDate] = useState(eventDate);
    const [time, setTime] = useState(eventTime);
    const [price, setPrice] = useState(onPrice);
    const [phoneNumber, setPhoneNumber] = useState(onPhoneNumber);
    const [description, setDescription] = useState(onDescription);

    useEffect(() => {
        eventsApi.fetchCategories({setState: setCategories});
    }, [categoryStatus]);

    const handleChange = e => {
        const {name, value} = e.target;
        switch(name) {
            case 'name':
                setName(value);
                break;

            case 'category':
                setCategory(value);
                break;

            case 'address':
                setAddress(value);
                break;

            case 'date':
                setDate(value);
                break;

            case 'time':
                setTime(value);
                break;

            case 'price':
                setPrice(value);
                break;

            case 'description':
                setDescription(value);
                break;

            default:
                return;
        };
    };

    const clearAllFields = () => {
        setName('');
        setCategory('');
        setAddress('');
        setDate('');
        setTime('');
        setPrice('');
        setDescription('');
    };

    const handleSubmit = () => {
        const event = {
            title: name,
            address: address,
            eventDate: date,
            eventTime: time,
            price: Number(price),
            description: description,
            categoryTitle: category,
            phoneNumber: phoneNumber,
            id: id,
        };
        eventsApi.reworkEvent({token: token, reworkedEvent: event});
        clearAllFields();
    };

    return (
        <div className={s.wrapper}>
        <div className={s.header_container}>
            <button className={s.rework_button} onClick={changeReworkToggler}><img alt="#" src={rework_button} /></button>
            <h1 className={s.header}>Редагування події</h1>
        </div>
        <form onSubmit={handleSubmit}>
            <div  className={s.form}>
                <section className={s.section}>
                    <label className={s.label}>Назва події</label>
                    <input className={s.input} onChange={handleChange} type='text' value={name} name='name'></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Категорія події</label>
                    <select  className={s.input_category} name='category' value={category} onChange={handleChange}>
                        {categories.map(({id_category, title}) => {
                            return (
                                <option value={title} key={id_category}>
                                    {title}
                                </option>
                            );
                        })}
                    </select>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Адреса</label>
                    <input className={s.input} onChange={handleChange} type='text' value={address} name='address'></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Дата</label>
                    <input className={s.input} onChange={handleChange} type='date' value={date} name='date' ></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Час</label>
                    <input className={s.input} onChange={handleChange} type='time' value={time} name='time'></input>
                </section>
                <section className={s.section}>
                    <label className={s.label}>Ціна (грн)</label>
                    <input className={s.input_price} onChange={handleChange} type='number' value={price} name='price'></input>
                </section>
                <section className={s.section}>
                    <label className={s.label_contact}>Контакт</label>
                    <PhoneInput className={s.phone} international value={phoneNumber} onChange={setPhoneNumber} defaultCountry="UA" />
                </section>
                <section className={s.section_description}>
                    <label className={s.label_description}>Опис</label>
                    <textarea className={s.input_description} onChange={handleChange} type='text' value={description} name='description'></textarea>
                </section>
                <p className={s.paragraf}> - обов'язкове поле для заповнення</p>
            </div>
            <div className={s.buttons}>
                <button disabled={!name || !category || !address || !date || !time || !price} className={s.button} type='submit'>Внести зміни</button>
            </div>
        </form>
    </div>
    );
};