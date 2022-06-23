import React, {useState} from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReworkEventForm from "components/ReworkForm/ReworkEventForm";
import eventsApi from "services/events-api";
import no_moderate from '../../UI/icons/NO_MODERATE.png';
import ACCEPTED from '../../UI/icons/ACCEPTED.png';
import REWORK from '../../UI/icons/REWORK.png';
import DECLINED from '../../UI/icons/DECLINED.png';
import rework_button from '../../UI/icons/rework_button.png';
import s from './EventCard.module.css';

const statusImages = {
    ACCEPTED: ACCEPTED,
    REWORK: REWORK,
    DECLINED: DECLINED,
};

export default function EventCard({idPath, address, price, categoryTitle, phoneNumber, eventTime, eventDate, title, description, id, isAdmin, moderatingMessage, moderatingStatus, categoryId, categoryStatus}) {
    const token = useSelector((state) => state.auth.user.token);

    const [adminAnswer, setAdminAnswer] = useState('');
    const [adminDescription, setAdminDescription] = useState('');
    const [adminMessageToggler, setAdminMessageToggler] = useState(false);
    const [reworkToggler, setReworkToggler] = useState(false);

    const changeReworkToggler = () => {
        setReworkToggler(reworkToggler => !reworkToggler);
    };

    const changeToggler = () => {
        setAdminMessageToggler(adminMessageToggler => !adminMessageToggler);
    };

    const handleChange = e => {
        const {name, value} = e.target;
        switch(name) {
            case 'adminAnswer':
                setAdminAnswer(value);
                break;

            case 'adminDescription':
                setAdminDescription(value);
                break;

            default:
                return;
        };
    };

    const handleSubmit = () => {
        const adminObject = {
            eventId: id,
            status: adminAnswer,
            message: adminDescription,
        };
        eventsApi.moderateEvent({token: token, adminAnswer: adminObject});
        setAdminAnswer('');
        setAdminDescription('');
    };

    return (
        <div>
            {reworkToggler ? 
                <ReworkEventForm id={id} onAddress={address} onPrice={price} categoryTitle={categoryTitle} onPhoneNumber={phoneNumber} eventTime={eventTime} onDescription={description} eventDate={eventDate} title={title} categoryStatus={categoryStatus} changeReworkToggler={changeReworkToggler} /> :
                <div className={s.card_wrapper}>
                    <>
                    <div className={s.header_wrapper}>
                        <div>
                            {categoryId === 77777 && moderatingStatus === 'REWORK' && <button className={s.rework_button} onClick={changeReworkToggler}><img alt="#" src={rework_button} /></button>}
                            <NavLink to={idPath} className={s.h2}>{title}</NavLink>
                        </div>
                        {categoryId === 77777 && <img className={s.status_img} onClick={changeToggler} alt="#" src={moderatingStatus ? statusImages[moderatingStatus] : no_moderate} />}
                    </div>
                    <div  className={s.card_div}>
                        {adminMessageToggler ? 
                            <>
                            <label className={s.moder_label}>Повідомлення модерації: </label>
                            <label>{moderatingMessage}</label>
                            </> : 
                            <>
                            <section className={s.section_date}>
                                <label className={s.label}>Дата: </label>
                                <label className={s.section_value}>{eventDate}</label>
                            </section>
                            <section className={s.section_description}>
                                <label>Опис: </label>
                                <label className={s.section_value_description}>{description}</label>
                            </section>
                            {isAdmin &&
                                <div>
                                    <div className={s.admin_container}>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="ACCEPTED"></input>
                                            <label>Опублікувати</label>
                                        </section>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="REWORK"></input>
                                            <label>Редагувати</label>
                                        </section>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="DECLINED"></input>
                                            <label>Скасувати</label>
                                        </section>
                                    </div>
                                    {adminAnswer === 'REWORK' || adminAnswer === 'DECLINED' ? 
                                        <textarea className={s.admin_textarea} onChange={handleChange} name="adminDescription" value={adminDescription}></textarea> : 
                                        <></>
                                    }
                                    <button className={s.admin_button} disabled={!adminAnswer} onClick={handleSubmit} type="button">Відправити</button>
                                </div>
                            }
                            </>
                        }
                    </div>
                    </>
            </div>
            }
        </div>
    );
};