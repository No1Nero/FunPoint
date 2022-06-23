import React, {useState, useEffect, useRef} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-number-input/style.css';
import eventsApi from 'services/events-api';
import s from './EventAdder.module.css';
import { useSelector } from 'react-redux';

export default function EventAdder({categoryStatus}) {
    const token = useSelector((state) => state.auth.user.token);

    const [categories, setCategories] = useState([]);
    const [status, setStatus] = useState(null);
    const flag = useRef(false);

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [address, setAddress] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(undefined);
    const [description, setDescription] = useState('');

    const notifySuccessEvent = () => {
        toast('Подія відправлена на модерацію', {
            position: toast.POSITION.TOP_LEFT,
            type: toast.TYPE.SUCCESS,
            autoClose: 5000,
            toastId: 'successEvent',
        });
    };

    const notifyErrorEvent = () => {
        toast('Збій у роботі, попробуйте ще раз', {
            position: toast.POSITION.TOP_LEFT,
            type: toast.TYPE.ERROR,
            autoClose: 5000,
            toastId: 'errorEvent'
        });
    };

    useEffect(() => {
        eventsApi.fetchCategories({setState: setCategories});
    }, [categoryStatus]);

    useEffect(() => {
        if (flag.current) {
            if(status === 200) {
                notifySuccessEvent();
            } else {
                notifyErrorEvent();
            }
        } else {
            flag.current = true;
        }
    }, [status]);

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

    const handleSubmit = e => {
        e.preventDefault();
        const event = {
            title: name,
            address: address,
            eventDate: date,
            eventTime: time,
            price: Number(price),
            description: description,
            categoryTitle: category,
            phoneNumber: phoneNumber,
        };
        eventsApi.addEvent({event: event, setStatus: setStatus, token: token});
        clearAllFields();
    };

    return (
        <div>
            <>
                <ToastContainer />
            </>
            <div className={s.wrapper}>
                <div className={s.header_container}>
                    <h1 className={s.header}>Додавання події</h1>
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
                        <button className={s.button} onClick={clearAllFields} type='button'>Очистити</button>
                        <button disabled={!name || !category || !address || !date || !time || !price} className={s.button} type='submit'>Додати</button>
                    </div>
                </form>
            </div>
        </div>
    );
};