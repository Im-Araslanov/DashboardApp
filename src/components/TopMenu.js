import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/TopMenu.scss";
import { ReactComponent as SearchIcon } from "../assets/svgs/search-icon.svg";
import { ReactComponent as NotificationIcon } from "../assets/svgs/notification-icon.svg";
import profilePhoto from "../assets/images/profile-photo.jpg";

const TopMenu = () => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleNotifications = () => setNotificationOpen(!isNotificationOpen);
  const toggleSearch = () => setSearchOpen(!isSearchOpen);

  return (
    <div className="top-menu">
      {/* Бургер-меню (только на мобильных) */}

      <div className={`top-menu__actions`}>
        {/* Поиск (скрывается на мобильных, но появляется при клике на иконку) */}
        <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
          <SearchIcon className="search-icon" onClick={toggleSearch} />
          {isSearchOpen && <input type="text" className="top-menu__search" placeholder="Search" />}
        </div>

        {/* Уведомления */}
        <div className="notification-container" onClick={toggleNotifications}>
          <NotificationIcon className="notification-icon" />
          {isNotificationOpen && (
            <div className="notification-dropdown">
              <div className="notification-item">Новое уведомление 1</div>
              <div className="notification-item">Новое уведомление 2</div>
              <div className="notification-item">Новое уведомление 3</div>
            </div>
          )}
        </div>

        {/* Фото профиля */}
        <Link to="/profile" className="profile-link">
          <img src={profilePhoto} alt="Профиль" className="profile-photo" />
        </Link>
      </div>
    </div>
  );
};

export default TopMenu;
