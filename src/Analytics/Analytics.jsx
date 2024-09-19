import './Analytics.css';
import React, {useState} from 'react';

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

function allFilter(){
  console.log('allFilter')
}

function revenueFilter(){
  console.log('revenueFilter')
}

function expensesFilter(){
  console.log('expensesFilter')
}

function addItem(){
  console.log('addItem')
}

function openItem(props){
  console.log('openItem', props.target.id)
}

// Отрисовка списка
function AnalyticsList() {
  const [page, setPage] = useState('revenue');

  // Отрисовка элемментов списка
  const renderItemsList = (itemsList) => {
    //Покраска блоков
    const colorize = (type) => {
      switch(type) {
        case 'revenue':
          return `analytics-list-item_revenue`
        case 'expenses':
          return `analytics-list-item_expenses`
      };
    };

    const result = itemsList.map((item) => {
      const { img, title, coast, id, type } = item;
      return (
        <div 
          className={`analytics-list-item ${colorize(type)}`}
          key={id} 
          id={id}
          type={type}
        >
          <div className="analytics-list-item__content" id={id} onClick={openItem}>
            <img className="content__image" src={img} alt=""/>
            <div className="content__title">{title}</div>
            <div className="content__coast">{coast}</div>
          </div>
        </div>
      );
    });

    return result;
  };
  
  return(
    <div className='analytics-window'>
      <div className="analytics-menu">
        <button className='analytics-menu__button' onClick={revenueFilter}>Доходы</button>
        <button className='analytics-menu__button' onClick={allFilter}>Все</button>
        <button className='analytics-menu__button' onClick={expensesFilter}>Расходы</button>
      </div>
      <div className="analytics-list">
        {renderItemsList(items)}
      </div>
        <button className='analytics-add-button' onClick={addItem}>Добавить</button>
    </div>
  )
}

function Analytics() {
  return(
    <div className='container'>
      <div className="analytics">
        <AnalyticsList/>
      </div>
    </div>
  )
}

export default Analytics;