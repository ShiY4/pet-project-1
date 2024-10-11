import './AddItem.css';

function AddItemModal() {
  return(
    <div className='add-item-modal-container'>
      <div className='form'>
        <div className='form-item'>
          <input className='form-item__input' type="text" placeholder='Название'/>
        </div>
        <div className='form-item'>
          <input className='form-item__input' type="text" placeholder='Сумма'/>
        </div>
        <div className='form-item'>
          <select className='form-item__input' type="text">
            <option value="">Тип</option>
            <option value="Java">Java</option>
            <option value="C#">C#</option>
            <option value="C++">C++</option>
          </select>
        </div>
      </div>
      <div className='toggle'>toggle</div>
      <button className='btn'>добавить</button>
    </div>
  );
};

export default AddItemModal;