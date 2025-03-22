import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/LineChartComponent.scss';
import CustomTooltip from './CustomTooltip'; // Импортируем кастомизированный Tooltip

const LineChartComponent = ({ data }) => {
  console.log("LineChart Data:", data); // Проверяем данные

  return (
    <div className="line-chart">
      <div className="line-chart__container">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} /> {/* Используем кастомизированный Tooltip */}
            <Line type="monotone" dataKey="value" stroke="#4318FF" name="Продажи" />
            <Line type="monotone" dataKey="value2" stroke="#6AD2FF" name="Возвраты" />
            <Line type="monotone" dataKey="value3" stroke="#EFF4FB" name="Скидки" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;