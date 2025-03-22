import React, { useEffect, useContext, useState } from 'react';
import { FaUsers, FaChartBar, FaSmile, FaFire, FaClock, FaEnvelope } from 'react-icons/fa';
import InfoTooltip from '../components/InfoTooltip';
import { PageTitleContext } from '../context/PageTitleContext';
import KPICard from '../components/KPICard';
import LineChartComponent from '../components/LineChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';
import TimeFilter from '../components/TimeFilter';
import TasksTable from '../components/TasksTableComponent/TasksTable';
import TodoList from '../components/TodoListComponent/TodoList';
import '../styles/Dashboard.scss';

const DashboardPage = () => {
  const { setPageTitle } = useContext(PageTitleContext);
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    setPageTitle('Главная панель');
    fetch('/fakeData.json')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(err => console.error('Ошибка загрузки данных:', err));
  }, [setPageTitle]);

  const handlePeriodChange = (period) => {
    setPeriod(period);
    // Здесь можно добавить логику для обновления данных в зависимости от периода
  };

  if (!data) return <div className="dashboard__loading">Загрузка данных...</div>;

  return (
    <div className="dashboard">
      {/* <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
      </header> */}

      <section className="dashboard__kpi-cards">
  <KPICard 
    title="Общее число граждан" 
    value={data.totalCitizens} 
    icon={<FaUsers />} 
    tooltip="Общее количество граждан, зарегистрированных на портале." 
  />
  <KPICard 
    title="Процент выполнения плана" 
    value={data.planCompletion} 
    icon={<FaChartBar />} 
    tooltip="Процент выполнения плана по обработке заявок." 
  />
  <KPICard 
    title="Уровень удовлетворенности" 
    value={data.satisfactionLevel} 
    icon={<FaSmile />} 
    tooltip="Средний уровень удовлетворенности пользователей порталом." 
  />
  <KPICard 
    title="Активные пользователи" 
    value={data.activeUsers} 
    icon={<FaFire />} 
    tooltip="Количество пользователей, активно использующих портал в текущий момент." 
  />
  <KPICard 
    title="Среднее время обработки" 
    value={data.averageProcessingTime} 
    unit="дней" 
    icon={<FaClock />} 
    tooltip="Среднее время, затрачиваемое на обработку одной заявки." 
  />
  <KPICard 
    title="Новые заявки" 
    value={data.newRequests} 
    icon={<FaEnvelope />} 
    tooltip="Количество новых заявок, созданных за выбранный период." 
  />
</section>

<section className="dashboard__charts">
  {/* Динамика изменений */}
  <div className="dashboard__chart-header">
    <div className="dashboard__chart-wrapper">
      <h2 className="dashboard__chart-wrapper-title">Динамика изменений</h2>
      <TimeFilter onChange={handlePeriodChange} />
    </div>
    <LineChartComponent data={data.lineChartData} period={period} />
    <InfoTooltip text="График показывает изменение ключевых показателей (например, количество заявок) за выбранный период." />
  </div>

  {/* Сравнение по регионам */}
  <div className="dashboard__chart-header">
    <div className="dashboard__chart-wrapper">
      <h2 className="dashboard__chart-wrapper-title">Сравнение по регионам</h2>
      <TimeFilter onChange={handlePeriodChange} />
    </div>
    <BarChartComponent data={data.barChartData} period={period} />
    <InfoTooltip text="График показывает распределение объектов недвижимости или заявок по регионам." />
  </div>

  {/* Распределение статусов */}
  <div className="dashboard__chart-header">
    <div className="dashboard__chart-wrapper">
      <h2 className="dashboard__chart-wrapper-title">Распределение статусов</h2>
      <TimeFilter onChange={handlePeriodChange} />
    </div>
    <PieChartComponent data={data.pieChartData} period={period} />
    <InfoTooltip text="График показывает процентное соотношение заявок по их статусам (например, на рассмотрении, в работе, завершено)." />
  </div>
</section>

<section className="dashboard__tasks"> 
  <div className="dashboard__tasks-header">
    <div className="dashboard__tasks-wrapper">
    <h2 className="dashboard__tasks-wrapper-title">Сheck table</h2>
    <InfoTooltip text="[enkjnvkjfnkjfnkjdnfvkjndfvkjlnwkfljvnkjdnf" />
    </div>
    <TasksTable />
    <InfoTooltip text="Таблица отображает список задач, их статус, степень выполнения." />
  </div>

  <div className="dashboard__tasks-header">
    <div className="dashboard__tasks-wrapper">
    <h2 className="dashboard__tasks-wrapper-title">Tasks</h2>
    </div>
    <TodoList />
    <InfoTooltip text="Tasks table нужен для организации и планирования задач сотрудников." />
  </div>
</section>
    </div>
  );
};

export default DashboardPage;