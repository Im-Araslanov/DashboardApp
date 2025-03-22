// components/CitizenComponents/CitizenCard.js
import React from 'react';
import { Tabs, Descriptions } from 'antd';

const CitizenCard = ({ data }) => {
  const items = [
    {
      key: '1',
      label: 'Основная информация',
      children: (
        <Descriptions column={2} bordered>
          <Descriptions.Item label="ФИО">{data.fullName}</Descriptions.Item>
          <Descriptions.Item label="Дата рождения">{data.birthDate}</Descriptions.Item>
          <Descriptions.Item label="Пол">{data.gender}</Descriptions.Item>
          <Descriptions.Item label="Семейное положение">{data.maritalStatus}</Descriptions.Item>
          <Descriptions.Item label="Адрес" span={2}>{data.address}</Descriptions.Item>
          <Descriptions.Item label="Телефон">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: '2',
      label: 'Члены семьи',
      children: (
        <div className="family-members">
          {data.familyMembers.map((member, index) => (
            <div key={index} className="member-card">
              <div className="member-name">{member.name}</div>
              <div className="member-info">
                {member.relationship} • {member.birthDate}
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: 'История заявок',
      children: (
        <div className="application-history">
          {data.applicationHistory.map((app, index) => (
            <div key={index} className="application-item">
              <div className="app-id">Заявка #{app.applicationId}</div>
              <div className="app-date">{app.applicationDate}</div>
              <div className={`app-status ${app.status.toLowerCase()}`}>
                {app.status}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="citizen-card">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default CitizenCard;