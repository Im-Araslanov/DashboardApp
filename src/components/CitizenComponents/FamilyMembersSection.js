// src/components/CitizenСomponents/FamilyMembersSection.js
import React from 'react';
import { Table } from 'antd';

const FamilyMembersSection = ({ data }) => {
  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Степень родства',
      dataIndex: 'relationship',
      filters: [
        { text: 'Супруг', value: 'Супруг' },
        { text: 'Ребенок', value: 'Ребенок' },
      ],
      onFilter: (value, record) => record.relationship === value,
    },
    {
      title: 'Дата рождения',
      dataIndex: 'birthDate',
      sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.name + record.birthDate}
      pagination={false}
    />
  );
};

export default FamilyMembersSection;