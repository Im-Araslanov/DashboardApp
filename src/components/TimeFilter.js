import React, { useState } from 'react';
import '../styles/TimeFilter.scss';

const TimeFilter = ({ onChange }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const handleChange = (e) => {
    const period = e.target.value;
    setSelectedPeriod(period);
    onChange(period);
  };

  return (
    <div className="time-filter">
      <select value={selectedPeriod} onChange={handleChange}>
        <option value="day">День</option>
        <option value="month">Месяц</option>
        <option value="year">Год</option>
      </select>
    </div>
  );
};

export default TimeFilter;