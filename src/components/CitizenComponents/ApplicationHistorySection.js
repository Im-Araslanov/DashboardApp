import React from 'react';
import { Table, Tag } from 'antd';
import '../../styles/ApplicationHistory.scss';

const statusColors = {
  'Одобрено': 'green',
  'Отклонено': 'red',
  'В обработке': 'blue',
};

const ApplicationHistorySection = ({ data }) => {
  const columns = [
    {
      title: 'ID заявки',
      dataIndex: 'applicationId',
      width: 120,
      fixed: 'left',
      sorter: (a, b) => a.applicationId - b.applicationId,
    },
    {
      title: 'Дата',
      dataIndex: 'applicationDate',
      width: 150,
      sorter: (a, b) => new Date(a.applicationDate) - new Date(b.applicationDate),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      width: 150,
      render: (status) => (
        <Tag color={statusColors[status] || 'gray'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Комментарии',
      dataIndex: 'comments',
      render: (comments) => comments || '—',
    },
  ];

  return (
    <div className="table-wrapper">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="applicationId"
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
    </div>
  );
};

export default ApplicationHistorySection;