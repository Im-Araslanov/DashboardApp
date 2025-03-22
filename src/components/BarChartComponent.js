import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/BarChartComponent.scss';
import CustomTooltip from './CustomTooltip'; // Импортируем кастомизированный Tooltip

const getFilteredData = (data, period) => {
  if (!data || data.length === 0) return [];

  switch (period) {
    case "day":
      return data.map(item => ({
        ...item,
        value: Math.max(1, Math.ceil(item.value / 30)),
        value2: Math.max(1, Math.ceil(item.value2 / 30)),
        value3: Math.max(1, Math.ceil(item.value3 / 30)),
      }));
    case "month":
      return data.map(item => ({
        ...item,
        value: Math.max(1, Math.ceil(item.value / 12)),
        value2: Math.max(1, Math.ceil(item.value2 / 12)),
        value3: Math.max(1, Math.ceil(item.value3 / 12)),
      }));
    case "year":
    default:
      return data;
  }
};

const BarChartComponent = ({ data, period }) => {
  const filteredData = getFilteredData(data, period);

  if (!filteredData.length) return <p>Нет данных для отображения</p>;

  return (
    <div className="bar-chart">
      <div className="bar-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} /> {/* Используем кастомизированный Tooltip */}
            <Bar dataKey="value" fill="#4318FF" name="Заявки" />
            <Bar dataKey="value2" fill="#6AD2FF" name="Одобрено" />
            <Bar dataKey="value3" fill="#EFF4FB" name="Отклонено" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;