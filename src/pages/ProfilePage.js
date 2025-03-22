// src/pages/ProfilePage.js
import React, { useEffect, useContext } from 'react';
import { PageTitleContext } from '../context/PageTitleContext';

const ProfilePage = () => {
  const { setPageTitle } = useContext(PageTitleContext);

  useEffect(() => {
    setPageTitle('Профиль'); // Устанавливаем заголовок
  }, [setPageTitle]);

  return (
    <div>
      <h1>Профиль</h1>
      <p>Информация о профиле пользователя.</p>
    </div>
  );
};

export default ProfilePage;