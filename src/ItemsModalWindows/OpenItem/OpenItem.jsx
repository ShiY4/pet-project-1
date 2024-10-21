import React, { useState, useCallback } from 'react';
import './OpenItem.css';

//Firebase
import { getDoc, doc, setDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.js';

function OpenItemModal({id, onModalClose, itemsList }) {
    console.log('rendered openItemModl')

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

    const [ isChanged, setChanged ] = useState(true);

    //Кнопка "Отменить"
    const handleClose = useCallback((e) => {
        onModalClose();
    }, [onModalClose]);
    
    //Кнопка "Изменить"
    const handleChangeitem = async (e) => {
        e.preventDefault();
        //Получение айтема из базы данных
        const item = doc(db, 'users', 'user', 'items', id);
        const itemSnapshot = await getDoc(item);

        setDoc(itemSnapshot.ref, {
            title: modaltitle,
            coast: modalcoast,
            date: modaldate,
            type: modaltype,
        });
        onModalClose();
    };

    //Обработчик даты
    const handleDateChange = (event) => {
        setDate(event.target.value);
        setChanged(false);
    };

  //Валидация названия
    const titleValidation = (e) => {
        const value = e.target.value;
        // Удаляем все символы, кроме букв и цифр
        const letterValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
        e.target.value = letterValue;
        setTitle(e.target.value);
        setChanged(false);
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
        setChanged(false);
    };

    //Смена типа "Расход"\"Доход"
    const handleChangeType = (props) => {
        const itemType = props.target.getAttribute('data-item-type');
        setType(itemType);
        setChanged(false);
    };

    //Смена категории
    const handlerChangeCategory = (e) =>{
        const value = e.target.value;
        setItemCategory(value);
        setChanged(false);
    };

    //Отрисовка кнопок типа
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
                    type='button'
                    data-item-type='revenue'
                    className={`button form-button form-button_revenue ${activateRevenueButton(type)}`}
                    onClick={handleChangeType}
                >
                    Доходы
                </button>
                <button
                    type='button'
                    data-item-type='expenses'
                    className={`button form-button form-button_expenses ${activateExpensesButton(type)}`}
                    onClick={handleChangeType}
                >
                    Расходы
                </button>
            </div>
        );
    };

    const blockedChangeButton = () => {
        if(isChanged === true){
            return `button add-item-modal-buttons__button add-item-modal-buttons__button_add add-item-modal-buttons__button_add_blocked`;
        } return `button add-item-modal-buttons__button add-item-modal-buttons__button_add`;
    };

    return(
        <div className='add-item-modal-container'>
            <form className='form'>
                <div className="form-main-info">
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
                <div className="add-item-modal-buttons">
                    <button
                        type='button'
                        className='button add-item-modal-buttons__button add-item-modal-buttons__button_cancel'
                        onClick={handleClose}
                    >
                        Отменить
                    </button>
                    <button
                        disabled={isChanged}
                        className={blockedChangeButton()}
                        onClick={handleChangeitem}
                    >
                        Изменить
                    </button>
                </div>
            </form>
        </div>
    )
};

export default OpenItemModal;