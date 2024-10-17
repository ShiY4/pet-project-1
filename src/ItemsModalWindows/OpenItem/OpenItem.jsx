import { Toggle } from '../../components/Buttons/ToggleButton/ToggleButton.jsx';
import React, {useState, useEffect, useMemo} from 'react';
import './OpenItem.css';

//Firebase
import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.js';

function OpenItemModal({id, onModalClose, itemsList }) {
    console.log('xxxx')
    //Получение сслыки на коллекцию айтемов из базы данных
    const itemsCollectionRef = collection(db, 'users', 'user', 'items');
    async function getItem() {
        const data = await getDocs(itemsCollectionRef);
        return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    }; 

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
    
    const { title, coast, type, date, itemCategory } = item
    const [ modaltitle, setTitle ] = useState(title); //Стейт названия
    const [ modalcoast, setCoast ] = useState(coast); //Стейт Стоимости
    const [ modaltype, setType ] = useState(type); //Стейт типа
    const [ modaldate, setDate ] = useState(date); //Стейт даты
    const [ modalitemCategory,  setItemCategory ] = useState(itemCategory); //Стейт категори айтема

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

  //Смена типа "Расход"\"Доход"
    const handleChangeType = (props) => {
        const itemType = props.target.getAttribute('data-item-type');
        setType(itemType);
    };

    const handlerChangeCategory = (e) =>{
        const value = e.target.value
        setItemCategory(value)
    }

    const setButtonType = () => {
        const revenueButton = document.querySelector('form-button_revenue')
        const expensesButton = document.querySelector('form-button_expenses')
        // if(type === 'revenue') {
        //     revenueButton.click();
        // } else expensesButton.click();
        console.log(expensesButton, revenueButton)
    }

    const renderTypeButtons = (type) => {
        let expensesButtonClass = '';
        let revenueButtonClass = '';
        const activateRevenueButton = () => {
            if (type === 'revenue') {
                revenueButtonClass = 'form-button_revenue_active';
                return revenueButtonClass;
            } return revenueButtonClass;
        };
    
        const activateExpensesButton = () => {
            if (type === 'expenses') {
                expensesButtonClass = 'form-button_expenses_active';
                return expensesButtonClass;
            } return expensesButtonClass;
        };
        
        return(
            <div className='form-item_buttons'>
                <button
                //   ref={revenueRef}
                    type='button'
                    data-item-type='revenue'
                    className={`button form-button form-button_revenue ${activateRevenueButton(type)}`}
                    onClick={handleChangeType}
                >
                    Доходы
                </button>
                <button
                //   ref={expensesRef}
                    type='button'
                    data-item-type='expenses'
                    className={`button form-button form-button_expenses ${activateExpensesButton(type)}`}
                    onClick={handleChangeType}
                >
                    Расходы
                </button>
            </div>
        )
    };

    return(
        <div className='add-item-modal-container' onLoad={setButtonType}>
            <form className='form'>
                <div className="form-main-info">
                    <div className="form-main-info-block">
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_title' type="text" onChange={titleValidation} value={modaltitle}/>
                        </div>
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_coast' type="text" onChange={coastValidation} value={modalcoast}/>
                        </div>
                        <div className='form-item'>
                        {renderTypeButtons(modaltype)}
                        </div>
                        <div className='form-item'>
                            <select className='form-item__input category' type="text" onChange={handlerChangeCategory}>
                                <option value="">Категория</option>
                                {/* {categories} */}
                            </select>
                        </div>
                        <div className='form-item'>
                            <input className='form-item__input form-item__input_date' 
                                type="date" 
                                value={modaldate}
                                onChange={handleDateChange}
                            />
                        </div> 
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