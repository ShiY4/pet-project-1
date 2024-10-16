import { Toggle } from '../../components/Buttons/ToggleButton/ToggleButton.jsx';
import React, {useState} from 'react';
import './OpenItem.css';

//Firebase
import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.js';

function OpenItemModal({id, onModalClose, itemsList }) {
    //Получение сслыки на коллекцию айтемов из базы данных
    const itemsCollectionRef = collection(db, 'users', 'user', 'items');
    async function getItem() {
        const data = await getDocs(itemsCollectionRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }; 

    // console.log(itemsList, id)
    function parseItemInfo(id, itemsList) {
        let item = {}
        for(let i = 0; i < itemsList.length; i += 1) {
            if(id === itemsList[i].id) {
                item = itemsList[i];
            } continue;
        }
        return item;
    }

    const item = parseItemInfo(id, itemsList);
    console.log(item)
    const { title, coast, type, date, itemCategory, discription, discriptionContainer } = item
    const [ modaltitle, setTitle ] = useState(title); //Стейт названия
    const [ modalcoast, setCoast ] = useState(''); //Стейт Стоимости
    const [ modaltype, setType ] = useState(''); //Стейт типа
    const [ modaldate, setDate ] = useState(new Date().toISOString().split('T')[0]); //Стейт даты
    const [ modalitemCategory,  setItemCategory ] = useState(''); //Стейт категори айтема
    const [ modaldiscription, setDiscription ] = useState(''); //Стейт описания
    const [ modaldiscriptionContainer, showDiscriptionContainer ] = useState(''); //Стейт для отображеня описания

    //Кнопка "Закрыть"
    const handleClose = () => {
        onModalClose();
    };
    
    //Кнопка "Изменить"
    const handleAdd = async () => {
        //Получение сслыки на коллекцию айтемов из базы данных
        const itemsCollectionRef = collection(db, 'users', 'user', 'items');

        const newItem = {
            title: title,
            coast: coast,
            date: date,
                type: type,
            discription: discription,
            category: itemCategory,
        };
        await addDoc(itemsCollectionRef, newItem);
        onModalClose();
    };

    //Обработчик даты
    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

  //Валидация названия
    const titleValidation = (e) => {
        const value = e.target.value;
        // Удаляем все символы, кроме букв и цифр
        const letterValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
        e.target.value = letterValue;
        setTitle(e.target.value);
    };

    //Валидация суммы
    const coastValidation = (e) => {
        const value = e.target.value;
        // Удаляем все нечисловые символы
        const numericValue = value.replace(/[^0-9.]/g, '');
        // Удаляем лишние точки
        const cleanedValue = numericValue.replace(/\.{2,}/g, '.').replace(/^(\d*\.\d*)\./, '$1');
        e.target.value = cleanedValue;
        setCoast(e.target.value);
    };

  // Скрыть/Показать окно ввода описания
    function showDiscriptionArea(discriptionContainer){
        showDiscriptionContainer(true);
        
        //Ограничение описания по кол-ву символов
        const descriptionValidation = (e) => {
            const value = e.target.value;
            if (value.length > 100) {
                e.target.value = value.slice(0, 100);
                setDiscription(e.target.value);
            }
            setDiscription(e.target.value);
        };

        if(discriptionContainer === true) {
            showDiscriptionContainer(
            <div className="form-main-description">
                <textarea className='form-main-description__textarea' name="form-description" id="" onInput={descriptionValidation} placeholder='Введите описание'></textarea>
            </div>
            )
        } else {
            return;
        };
    };

  //Смена типа "Расход"\"Доход"
    const handleChangeType = (props) => {
        const itemType = props.target.getAttribute('data-item-type');
        setType(itemType);
    };

    const handlerChangeCategory = (e) =>{
        const value = e.target.value
        setItemCategory(value)
    }

    return(
        <div className='add-item-modal-container'>
            <form className='form'>
                <div className="form-main-info">
                    <div className="form-main-info-block">
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_title' type="text" onChange={titleValidation} value={modaltitle}/>
                        </div>
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_coast' type="text" onChange={coastValidation} value={coast}/>
                        </div>
                        <div className='form-item form-item_buttons'>
                            <button
                                type='button'
                                data-item-type='revenue'
                                className='button form-button form-button_revenue'
                                onClick={handleChangeType}
                            >
                                Доходы
                            </button>
                            <button
                                type='button'
                                data-item-type='expenses'
                                className='button form-button form-button_expenses'
                                onClick={handleChangeType}
                            >
                                Расходы
                            </button>
                        </div>
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_date' 
                                type="date" 
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div> 
                    </div>

                    <div className="form-main-info-block">
                        <div className='form-item'>
                            <select className='form-item__input category' type="text" onChange={handlerChangeCategory}>
                                <option value="">Категория</option>
                                {/* {categories} */}
                            </select>
                        </div>
                        <Toggle
                            label="Пометки"
                            toggled={false}
                            onClick={showDiscriptionArea}
                        />
                        {discriptionContainer}
                    </div>
                </div>
            </form>

            <div className="add-item-modal-buttons">
                <button
                    className='button add-item-modal-buttons__button add-item-modal-buttons__button_add'
                    onClick={handleClose}
                >
                    Изменить
                </button>
            </div>
        </div>
    )
};

export default OpenItemModal;