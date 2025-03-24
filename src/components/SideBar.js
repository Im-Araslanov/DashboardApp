import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/SideBar.scss';

import { ReactComponent as MenuIcon } from '../assets/svgs/menu-icon.svg';
import { ReactComponent as CloseIcon } from '../assets/svgs/close-icon.svg';
import { ReactComponent as HomeIcon } from '../assets/svgs/home-icon.svg';
import { ReactComponent as AddUserIcon } from '../assets/svgs/addUser-icon.svg';
import { ReactComponent as NewsIcon } from '../assets/svgs/news-icon.svg';

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: <HomeIcon />, text: 'Главная', path: '/' },
    { icon: <AddUserIcon />, text: 'Добавить гражданина', path: '/new-citizen' },
    { icon: <NewsIcon />, text: 'Картотека', path: '/citizens' }
  ];

  return (
    <div className={`side-bar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="logo-container">
        <div className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <MenuIcon /> : <CloseIcon />}
        </div>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            key={index}
          >
            <div className="nav-icon">{item.icon}</div>
            {!isCollapsed && <span className="nav-text">{item.text}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
