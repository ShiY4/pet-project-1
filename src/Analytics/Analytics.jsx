import './Analytics.css';
import React, {useState} from 'react';
import Modal from '../components/modal/modal';
import AddItemModal from '../AddItem/AddItem.jsx';

const items = [
  {
    id: 1,
    type: 'revenue',
    img: "x",
    title: 'Название1',
    coast: 1000,
  },
  {
    id: 2,
    type: 'revenue',
    img: "x",
    title: 'Название2',
    coast: 3000,
  },
  {
    id: 3,
    type: 'expenses',
    img: "x",
    title: 'Название3',
    coast: 2000,
  },
  {
    id: 4,
    type: 'expenses',
    img: "x",
    title: 'Название4',
    coast: 2500,
  },
  {
    id: 5,
    type: 'expenses',
    img: "x",
    title: 'Название5',
    coast: 2500,
  },
  {
    id: 6,
    type: 'revenue',
    img: "x",
    title: 'Название6',
    coast: 2500,
  },
  {
    id: 7,
    type: 'revenue',
    img: "x",
    title: 'Название7',
    coast: 2500,
  },
  {
    id: 8,
    type: 'expenses',
    img: "x",
    title: 'Название8',
    coast: 2500,
  },
  {
    id: 9,
    type: 'revenue',
    img: "x",
    title: 'Название9',
    coast: 2500,
  },
]

function openItem(props){
  console.log('openItem', props.target.id)
};

//Покраска блоков
function colorize(type) {
  switch(type) {
    case 'revenue':
      return `analytics-list-item_revenue`
    case 'expenses':
      return `analytics-list-item_expenses`
    default:
      throw new Error('unknown type')
  };
};

// Отрисовка элемментов списка
function renderItemsList(itemsList) {
  const result = itemsList.map((item) => {
    const { img, title, coast, id, type } = item;
    return (
      <div 
        className={`analytics-list-item ${colorize(type)}`}
        key={id} 
        id={id}
        type={type}
        onClick={openItem}
      >
        <div className="analytics-list-item__content">
          <img className="content__image" src={img} alt=""/>
          <div className="content__title">{title}</div>
          <div className="content__coast">{coast}</div>
        </div>
      </div>
    );
  });
  return result;
};

function addItem( img, title, coast, id, type, props ){
  console.log('asd');
  const newItem = {
    itemImg: img, 
    itemTitle: title, 
    itemCoast: coast, 
    itemId: id, 
    itemType: type
  };
  // items.unshift(newItem)
}

// Отрисовка списка
function AnalyticsList() {
  const [itemsList, setItems] = useState(renderItemsList(items));
  const [isModalActive, setModalActive] = useState(false);

  //Функция фильтрации списка
  function filterItems(e) {
    const filtertype = e.target.getAttribute('filtertype')
    if (filtertype === 'all') {
      setItems(renderItemsList(items));
    } else{
      const result = items.filter((item) => item.type === filtertype);
      console.log(result);
      setItems(renderItemsList(result));
    };
  };

  //Открытие модального окна
  const handleModalOpen = () => {
    setModalActive(true);
  };
  //Закрытие модального окна
  const handleModalClose = () => {
    setModalActive(false);
  };

  return(
    <div className='analytics-window'>
      <div className="analytics-menu">
        <button className='analytics-menu__button' type='button' filtertype='revenue' onClick={filterItems}>Доходы</button>
        <button className='analytics-menu__button' type='button' filtertype='all' onClick={filterItems}>Все</button>
        <button className='analytics-menu__button' type='button' filtertype='expenses' onClick={filterItems}>Расходы</button>
      </div>
      <div className="analytics-list">
        {itemsList}
      </div>
      <button className='analytics-add-button' onClick={handleModalOpen}>Добавить</button>
      <div>
        {isModalActive && (
          <Modal title="Добавить" onClose={handleModalClose}>
            <AddItemModal/>
          </Modal>
        )}
      </div>
    </div>
  );
};

function Analytics() {
  return(
    <div className='container'>
      <div className="analytics">
        <AnalyticsList/>
      </div>
    </div>
  );
};

export default Analytics;