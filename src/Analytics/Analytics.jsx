import React, {useState, useEffect} from 'react';
import Modal from '../components/Modal/Modal.jsx';
import AddItemModal from '../ItemsModalWindows/AddItem/AddItem.jsx';
import OpenItemModal from '../ItemsModalWindows/OpenItem/OpenItem.jsx';
import './Analytics.css';

//Firebase
import { collection, onSnapshot } from 'firebase/firestore';
import db, { getItems } from '../firebase/firebase.js';

//Получение сслыки на коллекцию айтемов из базы данных
const itemsCollectionRef = collection(db, 'users', 'user', 'items');
let items = await getItems(itemsCollectionRef)

// Рендер элемментов списка
function renderItemsList(itemsList, openItemClick) {
  
  const colors = {
    'revenue': `analytics-list-item_revenue`,
    'expenses':`analytics-list-item_expenses`
  };

  const result = itemsList.map((item) => {
    const { img, title, coast, id, type } = item;
    return (
      <div className={`analytics-list-item ${colors[type]}`} key={id}>
        <div className="analytics-list-item__content"
          key={id}
          id={id}
          type={type}
          onClick={openItemClick}
        >
          <img className="content__image" src={img} alt=""/>
          <div className="content__title">{title}</div>
          <div className="content__coast">{coast}</div>
        </div>
      </div>
    );
  });
  return result;
};

// Отрисовка списка
function AnalyticsList() {
  const [ itemsList, setItems ] = useState(() => {
    return renderItemsList(items, (e) => hand(e))
  });
  const [ isModalActive, setModalActive ] = useState(false);
  const [ isOpenItemModal, setOpenItemModal ] = useState(false);
  const [ id, setId ] = useState('');

  function hand(e) {
    setOpenItemModal(true)
    setId(e.currentTarget.id)
  }

  //Обновление списка при добавлении\удалении\изменении айтема
  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          console.log('Новый айтем добавлен:');
          items = await getItems(itemsCollectionRef);
          setItems(renderItemsList(items, (e) => hand(e)));
        } else if (change.type === 'modified') {
          console.log('Айтем обновлен:');
          items = await getItems(itemsCollectionRef);
          setItems(renderItemsList(items, (e) => hand(e)));
        } else if (change.type === 'removed') {
          console.log('Пользователь удален:');
          items = await getItems(itemsCollectionRef);
          setItems(renderItemsList(items, (e) => hand(e)));
        }
      });
    });

    return () => unsubscribe();
  }, []);
  

  //Функция фильтрации списка
  const filterItems = (e) => {
    const filtertype = e.target.getAttribute('filtertype')
    if (filtertype === 'all') {
      setItems(renderItemsList(items, (e) => hand(e)));
    } else{
      const result = items.filter((item) => item.type === filtertype);
      setItems(renderItemsList(result, (e) => hand(e)));
    };
  };

  return(
    <div className='analytics-window'>
      <div className="analytics-menu">
        <button className='button analytics-menu__button' type='button' filtertype='revenue' onClick={filterItems}>Доходы</button>
        <button className='button analytics-menu__button' type='button' filtertype='all' onClick={filterItems}>Все</button>
        <button className='button analytics-menu__button' type='button' filtertype='expenses' onClick={filterItems}>Расходы</button>
      </div>
      <div className="analytics-list">
        {itemsList}
      </div>
      <button className='analytics-add-button' onClick={(e) => setModalActive(true)}>Добавить</button>
      <div>
        {(isModalActive && (
          <Modal onClose={(e) => setModalActive(false)}>
            <AddItemModal/>
          </Modal>
        )) || (isOpenItemModal && (
          <Modal onClose={(e) => setOpenItemModal(false)}>
            <OpenItemModal id={id} itemsList={items}/>
          </Modal>
        ))}
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