// src/pages/AnalyticsPage.js
import React, { useEffect, useContext } from 'react';
import { PageTitleContext } from '../context/PageTitleContext';

const AnalyticsPage = () => {
  const { setPageTitle } = useContext(PageTitleContext);

  useEffect(() => {
    setPageTitle('Analytics'); // Устанавливаем заголовок
  }, [setPageTitle]);

  return (
    <div>
      <h1>Аналитика</h1>
      <p>Графики и отчеты.</p>
    </div>
  );
};

export default AnalyticsPage;
