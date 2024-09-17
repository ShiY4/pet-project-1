import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './Header/Header.jsx';
import Analytics from './Analytics/Analytics.jsx';

const dom = (
  <>
    <Header/>
    <Analytics/>
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(dom);

