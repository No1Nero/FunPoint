import React, {useState} from "react";
import { useSelector } from "react-redux";
import ReworkCategoryForm from "components/ReworkForm/ReworkCategoryForm";
import eventsApi from "services/events-api";
import no_moderate from '../../UI/icons/NO_MODERATE.png';
import ACCEPTED from '../../UI/icons/ACCEPTED.png';
import REWORK from '../../UI/icons/REWORK.png';
import DECLINED from '../../UI/icons/DECLINED.png';
import rework_button from '../../UI/icons/rework_button.png';
import s from './CategoryCard.module.css';

const statusImages = {
    ACCEPTED: ACCEPTED,
    REWORK: REWORK,
    DECLINED: DECLINED,
};

export default function CategoryCard({title, description, isAdmin, id, categoryId, moderatingStatus, moderatingMessage}) {
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

    const handleSubmit = e => {
        const adminObject = {
            idCategory: id,
            status: adminAnswer,
            message: adminDescription,
        };
        eventsApi.moderateCategory({token: token, adminAnswer: adminObject});
        setAdminAnswer('');
        setAdminDescription('');
    };

    return (
        <div>
            {reworkToggler ? 
                <ReworkCategoryForm id={id} onTitle={title} onDescription={description} changeReworkToggler={changeReworkToggler} /> :
                <div className={s.card_wrapper}>
                    <div className={s.header_wrapper}>
                        <div>
                            {categoryId === 99999 && moderatingStatus === 'REWORK' && <button className={s.rework_button} onClick={changeReworkToggler}><img alt="#" src={rework_button} /></button>}
                            <h2 className={s.h2}>{title}</h2>
                        </div>
                        {categoryId === 99999 && <img className={s.status_img} onClick={changeToggler} alt="#" src={moderatingStatus ? statusImages[moderatingStatus] : no_moderate} />}
                    </div>
                    <div className={s.card_div}>
                        {adminMessageToggler ? 
                            <>
                            <label className={s.moder_label}>Сообщение модерации: </label>
                            <label>{moderatingMessage}</label>
                            </> : 
                            <>
                            <section className={s.section_description}>
                                <label>Описание: </label>
                                <label className={s.section_value_description}>{description}</label>
                            </section>
                            {isAdmin &&
                                <div>
                                    <div className={s.admin_container}>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="ACCEPTED"></input>
                                            <label>Опубликовать</label>
                                        </section>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="REWORK"></input>
                                            <label>Редактировать</label>
                                        </section>
                                        <section>
                                            <input onChange={handleChange} name="adminAnswer" type="radio" value="DECLINED"></input>
                                            <label>Отменить</label>
                                        </section>
                                    </div>
                                    {adminAnswer === 'REWORK' || adminAnswer === 'DECLINED' ? 
                                        <textarea className={s.admin_textarea} onChange={handleChange} name="adminDescription" value={adminDescription}></textarea> : 
                                        <></>
                                    }
                                    <button className={s.admin_button} disabled={!adminAnswer} onClick={handleSubmit} type="button">Отправить</button>
                                </div>
                            }
                            </>
                        }
                    </div>
                </div>
            }
        </div>
    );
};