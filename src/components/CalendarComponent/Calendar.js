// components/CalendarComponent/Calendar.js
import React from 'react';
import styles from './Calendar.module.scss';

const Calendar = () => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
  <div className={styles.calendar}>
    <div className="calendar">
      <div className="calendar-header">
        <select className="month-select">
          <option>Июль 2023</option>
        </select>
      </div>
      <div className="weekdays">
        {days.map(day => (
          <div key={day} className="weekday">{day}</div>
        ))}
      </div>
      <div className="dates-grid">
        {dates.map(date => (
          <div 
            key={date} 
            className={`date-cell ${date % 7 === 0 ? 'weekend' : ''}`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default Calendar;