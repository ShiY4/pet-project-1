import React, {useState, useEffect} from 'react';
import Modal from '../components/Modal/Modal.jsx';
import AddItemModal from '../AddItem/AddItem.jsx';
import './Analytics.css';

//Firebase
import { collection, getDocs, onSnapshot, doc } from 'firebase/firestore';
import db from '../firebase/firebase.js';

//Получение сслыки на коллекцию айтемов из базы данных
const itemsCollectionRef = collection(db, 'users', 'user', 'items');
async function getItems (){
  const data = await getDocs(itemsCollectionRef);
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};
let items = await getItems()


//Развернуть айтем
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
    const { img, title, coast, id, type,  date, category, description} = item;
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

// Отрисовка списка
function AnalyticsList() {
  const [itemsList, setItems] = useState(renderItemsList(items));
  const [isModalActive, setModalActive] = useState(false);

  //Обновление списка при добавлении\удалении айтема
  useEffect(() => {
    const unsubscribe = onSnapshot(itemsCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          items = await getItems();
          console.log('Новый айтем добавлен:');
          setItems(renderItemsList(items));
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
  function filterItems(e) {
    const filtertype = e.target.getAttribute('filtertype')
    if (filtertype === 'all') {
      setItems(renderItemsList(items));
    } else{
      const result = items.filter((item) => item.type === filtertype);
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
        <button className='button analytics-menu__button' type='button' filtertype='revenue' onClick={filterItems}>Доходы</button>
        <button className='button analytics-menu__button' type='button' filtertype='all' onClick={filterItems}>Все</button>
        <button className='button analytics-menu__button' type='button' filtertype='expenses' onClick={filterItems}>Расходы</button>
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