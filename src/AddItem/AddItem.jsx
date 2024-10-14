import { Toggle } from '../components/Buttons/ToggleButton/ToggleButton';
import { Button } from '../components/Buttons/Button/Button';
import React, {useState} from 'react';
import './AddItem.css';

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

function AddItemModal() {
  const [ discr, setDiscr ] = useState(''); //Стейт описания
  const [ categories,  setCategories ] = useState(renderCategories(categories1)) //Стейт категорий

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); //Стейт даты
  
  //Обработчик даты
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  
  //Валидация названия
  const titleValidation = (e) => {
    const value = e.target.value;
    // Удаляем все символы, кроме букв
    const letterValue = value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
    e.target.value = letterValue;
  };

  //Валидация суммы
  const coastValidation = (e) => {
    const value = e.target.value;
    // Удаляем все нечисловые символы
    const numericValue = value.replace(/[^0-9.]/g, '');
    // Удаляем лишние точки
    const cleanedValue = numericValue.replace(/\.{2,}/g, '.').replace(/^(\d*\.\d*)\./, '$1');
    e.target.value = cleanedValue;
  };

  // Скрыть/Показать окно ввода описания
  function showDiscriptionArea(discr){
    setDiscr(true)
    
    //Ограничение описания по кол-ву символов
    const descriptionValidation = (e) => {
      const value = e.target.value;
      if (value.length > 100) {
        e.target.value = value.slice(0, 100);
      }
    };

    if(discr === true) {
      setDiscr(
        <div className="form-main-description">
          <textarea className='form-main-description__textarea' name="form-description" id="" onInput={descriptionValidation} placeholder='Введите описание'></textarea>
        </div>
      )
    } else {
      return;
    };
  };

  return(
    <div className='add-item-modal-container'>
      <div className='form'>
        <div className="form-main-info">
          <div className="form-main-info-block">
            <div className='form-item'>
              <input className='form-item__input form-item__input_title' type="text" onInput={titleValidation} placeholder='Название'/>
            </div>
            <div className='form-item'>
              <input className='form-item__input form-item__input_coast' type="text" onInput={coastValidation} placeholder='Сумма'/>
            </div>
            <div className='form-item form-item_buttons'>
              <Button
                title = 'Доходы'
                className = 'form-button form-button_revenue'
              />
              <Button
                title = 'Расходы'
                className = 'form-button form-button_expenses'
              />
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
              <select className='form-item__input category' type="text">
                <option value="">Категория</option>
                {categories}
              </select>
            </div>
            <Toggle
                label="Пометки"
                toggled={false}
                onClick={showDiscriptionArea}
            />
            {discr}
          </div>
        </div>
      </div>

      <div className="add-item-modal-buttons">
        <Button
          title = 'Отменить'
          className = 'add-item-modal-buttons__button add-item-modal-buttons__button_cancel'
        />
        <Button
          title = 'Добавить'
          className = 'add-item-modal-buttons__button add-item-modal-buttons__button_add'
        />
      </div>
    </div>
  )
};

export default AddItemModal;