import React, {useState, useEffect} from 'react';
import Modal from '../components/Modal/Modal.jsx';
import AddItemModal from '../ItemsModalWindows/AddItem/AddItem.jsx';
import OpenItemModal from '../ItemsModalWindows/OpenItem/OpenItem.jsx';
import './Analytics.css';

//Firebase
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from '../firebase/firebase.js';

//Получение сслыки на коллекцию айтемов из базы данных
const itemsCollectionRef = collection(db, 'users', 'user', 'items');
async function getItems (){
  const data = await getDocs(itemsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
let items = await getItems()

// Рендер элемментов списка
function renderItemsList(itemsList, openItemClick) {

  const colors = {
    'revenue': `analytics-list-item_revenue`,
    'expenses':`analytics-list-item_expenses`
  };

  const result = itemsList.map((item) => {
    const { img, title, coast, id, type,  date, category, description} = item;
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
  const [ itemsList, setItems ] = useState(renderItemsList(items, (e) => hand(e)));
  const [ isModalActive, setModalActive ] = useState(false);
  const [ isOpenItemModal, setOpenItemModal ] = useState(false);
  const [ id, setId ] = useState('');

  function hand(e) {
    setOpenItemModal(true)
    setId(e.currentTarget.id)
  }

  //Обновление списка при добавлении\удалении айтема
  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          items = await getItems();
          console.log('Новый айтем добавлен:');
          setItems(renderItemsList(items, (e) => hand(e)));
        } else if (change.type === 'modified') {
          console.log('Пользователь обновлен:');
          // Обновите itemsList, если необходимо
        } else if (change.type === 'removed') {
          console.log('Пользователь удален:');
          // Обновите itemsList, если необходимо
        }
      });
    });

    return () => unsubscribe();
  }, []);
  

  //Функция фильтрации списка
  const filterItems = (e) => {
    const filtertype = e.target.getAttribute('filtertype')
    if (filtertype === 'all') {
      setItems(renderItemsList(items, () => setOpenItemModal(true)));
    } else{
      const result = items.filter((item) => item.type === filtertype);
      setItems(renderItemsList(result, () => setOpenItemModal(true)));
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
          <Modal id={id} itemsList={items} onClose={(e) => setOpenItemModal(false)}>
            <OpenItemModal/>
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