import React from 'react';
import { Table } from 'antd';
import '../../styles/FamilyMembersSection.scss';

const FamilyMembersSection = ({ data }) => {
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      width: 200, // Фиксированная ширина
      sorter: (a, b) => a.name.localeCompare(b.name),
      ellipsis: true, // Текст не выходит за границы
    },
    {
      title: 'Степень родства',
      dataIndex: 'relationship',
      width: 150, // Фиксированная ширина
      filters: [
        { text: 'Супруг', value: 'Супруг' },
        { text: 'Сын', value: 'Сын' },
        { text: 'Дочь', value: 'Дочь' },
      ],
      onFilter: (value, record) => record.relationship === value,
      ellipsis: true, // Текст не выходит за границы
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      width: 150, // Фиксированная ширина
      sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate),
      ellipsis: true, // Текст не выходит за границы
    },
  ];

  return (
    <div className="family-members-section">
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.name + record.birthDate}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default FamilyMembersSection;