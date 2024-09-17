import './Analytics.css';
import React, {useState} from 'react';

const items = [
  {
    id: 1,
    img: "x",
    title: 'Название1',
    coast: 1000,
  },
  {
    id: 2,
    img: "x",
    title: 'Название2',
    coast: 3000,
  },
  {
    id: 3,
    img: "x",
    title: 'Название3',
    coast: 2000,
  },
  {
    id: 4,
    img: "x",
    title: 'Название4',
    coast: 2500,
  },
  {
    id: 5,
    img: "x",
    title: 'Название5',
    coast: 2500,
  },
  {
    id: 6,
    img: "x",
    title: 'Название6',
    coast: 2500,
  },
  {
    id: 7,
    img: "x",
    title: 'Название7',
    coast: 2500,
  },
  {
    id: 8,
    img: "x",
    title: 'Название8',
    coast: 2500,
  },
  {
    id: 9,
    img: "x",
    title: 'Название9',
    coast: 2500,
  },
]

function revenue(){
  return(
    <div>
      revenue
    </div>
  )
}

function expenses(){
  return(
    <div>
      expenses
    </div>
  )
}

function AnalyticsList() {
  const [page, setPage] = useState('revenue');

  const renderItemsList = (itemsList) => {
    const result = itemsList.map((item) => {
      const { img, title, coast, id } = item
      return (
        <div className="analytics-list-item" key={id} id={id}>
          <img className="analytics-list-item__image" src={img} alt=""/>
          <div className="analytics-list-item__title">{title}</div>
          <div className="analytics-list-item__coast">{coast}</div>
        </div>
      )
    })
    return result
  }

  return(
    <div className='analytics-window'>
      <div className="analytics-menu">
        <button className='analytics-menu__button'>Доходы</button>
        <button className='analytics-menu__button'>Расходы</button>
      </div>
      <div className="analytics-list">
        {renderItemsList(items)}
      </div>
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