import React from 'react';
import { Timeline, Tag } from 'antd';

const statusColors = {
  'Одобрено': 'green',
  'Отклонено': 'red',
  'В обработке': 'blue',
};

const ApplicationHistorySection = ({ data }) => {
  // Преобразуем данные в формат, ожидаемый Timeline
  const items = data.map((app, index) => ({
    key: index,
    label: app.applicationDate,
    children: (
      <div className="application-item">
        <Tag color={statusColors[app.status]}>{app.status}</Tag>
        <span className="app-id">Заявка #{app.applicationId}</span>
        {app.comments && <div className="comments">{app.comments}</div>}
      </div>
    ),
    color: statusColors[app.status] || 'gray',
  }));

  return (
    <Timeline
      mode="alternate"
      items={items}
    />
  );
};

export default ApplicationHistorySection;