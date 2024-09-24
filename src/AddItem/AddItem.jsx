import './AddItem.css';

function AddItemModal() {
  return(
    <div className='add-item-modal-container'>
      <div className='form'>
        <div className='form-item'>
          <div className=''>Название:</div>
          <input className='form-item__input' type="text" placeholder='Сумма'/>
        </div>
        <div className='form-item'>
          <div className=''>Сумма:</div>
          <input className='form-item__input' type="text" placeholder='Сумма'/>
        </div>
        <div className='form-item'>
          <div className=''>Тип:</div>
          <input className='form-item__input' type="text" placeholder='Тип'/>
        </div>
      </div>
      <div className='toggle'>toggle</div>
      <button className='btn'>добавить</button>
    </div>
  )
}

export default AddItemModal;