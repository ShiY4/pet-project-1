import React, { useCallback, useState, useRef } from 'react';
import './AddItem.css';

//Firebase
import { collection, addDoc } from 'firebase/firestore';
import db from '../../firebase/firebase.js';

//Хардкод категорий
const categories1 = [
  {name:1},
  {name:2},
  {name:3},
  {name:4},
  {name:5},
  {name:6},
]

//Отрисовка категорий в селекторе
function renderCategories(categoriesArr) {
  const result = categoriesArr.map((category) => {
    return <option value={category.name} key={category.name}>{category.name}</option>
  })
  return result;
}

function AddItemModal({ onModalClose }) {
  const [ title, setTitle ] = useState(''); //Стейт названия
  const [ coast, setCoast ] = useState(''); //Стейт Стоимости
  const [ type, setType ] = useState(''); //Стейт типа
  const [ date, setDate ] = useState(new Date().toISOString().split('T')[0]); //Стейт даты
  const [ itemCategory,  setItemCategory ] = useState(''); //Стейт категори айтема

  const [ categories,  setCategories ] = useState(renderCategories(categories1)); //Стейт доступных категорий
  

  //Кнопка "Отмена"
  const handleClose = useCallback(() => {
    onModalClose();
  }, [onModalClose]);

  //Кнопка "Добавить"
  const handleAdd = useCallback(async () => {
    //Получение сслыки на коллекцию айтемов из базы данных
    const itemsCollectionRef = collection(db, 'users', 'user', 'items');

    const newItem = {
      title: title,
      coast: coast,
      type: type,
      category: itemCategory,
      date: date,
      // description: description,
      
    };
    await addDoc(itemsCollectionRef, newItem);
    onModalClose();
  },  [title, coast, date, type, itemCategory, onModalClose]);

  //Обработчик даты
  const handleDateChange = useCallback((event) => {
    setDate(event.target.value);
  }, []);
  
  //Валидация названия
  const titleValidation = useCallback((e) => {
    const value = e.target.value;
    // Удаляем все символы, кроме букв
    const letterValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    e.target.value = letterValue;
    setTitle(e.target.value);
  }, []);

  //Валидация суммы
  const coastValidation = useCallback((e) => {
    const value = e.target.value;
    // Удаляем все нечисловые символы
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Удаляем лишние точки
    const cleanedValue = numericValue.replace(/\.{2,}/g, '.').replace(/^(\d*\.\d*)\./, '$1');
    e.target.value = cleanedValue;
    setCoast(e.target.value);
  }, []);

  //Смена типа "Расход"\"Доход"
  const handleChangeType = useCallback((e) => {
    const itemType = e.target.getAttribute('data-item-type');
    setType(itemType);
  }, []);

  const handlerChangeCategory = useCallback((e) =>{
    const value = e.target.value
    setItemCategory(value)
  }, []);

  
  const revenueRef = useRef(null);
  const expensesRef = useRef(null);
  console.log(revenueRef.current, expensesRef.current)

  const renderTypeButtons = (type) => {
    let expensesButtonClass = '';
    let revenueButtonClass = '';
    const activateRevenueButton = () => {
      if (type === 'revenue') {
        revenueButtonClass = 'form-button_revenue_active'
        return revenueButtonClass
      } return revenueButtonClass
    }

    const activateExpensesButton = () => {
      if (type === 'expenses') {
        expensesButtonClass = 'form-button_expenses_active'
        return expensesButtonClass
      } return expensesButtonClass
    }
    
    return(
      <div className='form-item_buttons'>
        <button
          ref={revenueRef}
          type='button'
          data-item-type='revenue'
          className={`button form-button form-button_revenue ${activateRevenueButton(type)}`}
          onClick={handleChangeType}
        >
          Доходы
        </button>
        <button
          ref={expensesRef}
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
    <div className='add-item-modal-container'>
      <form className='form'>
        <div className="form-main-info">
          <div className="form-main-info-block">
            <div className='form-item'>
              <input
                className='form-item__input form-item__input_title'
                type="text"
                onChange={titleValidation}
                placeholder='Название'
              />
            </div>
            <div className='form-item'>
              <input 
                className='form-item__input form-item__input_coast'
                type="text"
                onChange={coastValidation}
                placeholder='Сумма'
              />
            </div>
            <div className='form-item'>
              {renderTypeButtons(type)}
            </div>
            <div className='form-item'>
              <select 
                className='form-item__input category'
                type="text"
                onChange={handlerChangeCategory}
              >
                <option value="">Категория</option>
                {categories}
              </select>
            </div>
            <div className='form-item'>
              <input 
                className='form-item__input form-item__input_date' 
                type="date" 
                value={date}
                onChange={handleDateChange}
              />
            </div> 
          </div>
        </div>
      </form>
      <div className="add-item-modal-buttons">
        <button
          className='button add-item-modal-buttons__button add-item-modal-buttons__button_cancel'
          onClick={handleClose}
        >
          Отменить
        </button>
        <button
          className='button add-item-modal-buttons__button add-item-modal-buttons__button_add'
          onClick={handleAdd}
        >
          Добавить
        </button>
      </div>
    </div>
  )
};

export default AddItemModal;