// src/components/Layout.js
import React, { useState } from 'react';
import SideBar from './SideBar';
import TopMenu from './TopMenu';
import '../styles/Layout.scss';

const Layout = ({ children }) => {
  const [pageTitle, setPageTitle] = useState('Main Dashboard'); // Состояние для заголовка

  // Передаем setPageTitle в children через пропсы
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setPageTitle });
    }
    return child;
  });

  return (
    <div className="layout">
      <TopMenu pageTitle={pageTitle} />
      <SideBar />
      <main className="main-content">
        {childrenWithProps}
      </main>
    </div>
  );
};

export default Layout;