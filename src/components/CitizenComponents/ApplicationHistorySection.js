// src/components/CitizenСomponents/ApplicationHistorySection.js
import React from 'react';
import { Timeline, Tag } from 'antd';

const statusColors = {
  'Одобрено': 'green',
  'Отклонено': 'red',
  'В обработке': 'blue',
};

const ApplicationHistorySection = ({ data }) => (
  <Timeline mode="alternate">
    {data.map((app, index) => (
      <Timeline.Item key={index} label={app.applicationDate}>
        <div className="application-item">
          <Tag color={statusColors[app.status]}>{app.status}</Tag>
          <span className="app-id">Заявка #{app.applicationId}</span>
          {app.comments && <div className="comments">{app.comments}</div>}
        </div>
      </Timeline.Item>
    ))}
  </Timeline>
);

export default ApplicationHistorySection;