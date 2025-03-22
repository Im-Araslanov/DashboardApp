import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import CitizenCard from '../components/CitizenComponents/CitizenCard';
import '../styles/CitizensListPage.scss';

const CitizensListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [pagination, setPagination] = useState({ 
    current: 1, 
    pageSize: 50,
    total: 0
  });
  const navigate = useNavigate();

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/citizens.json');
        const { citizens } = await response.json();
        setData(citizens);
        setPagination(prev => ({
          ...prev,
          total: citizens.length
        }));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { title: 'ФИО', dataIndex: 'fullName', sorter: true },
    { title: 'Дата рождения', dataIndex: 'birthDate', sorter: true },
    { title: 'Телефон', dataIndex: 'phone' },
    { title: 'Адрес', dataIndex: 'address' },
  ];

  const handleSearch = (value) => {
    // Реализация поиска
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  return (
    <div className="citizens-list-page">
      <div className="toolbar">
        <Input.Search
          placeholder="Поиск по всем полям"
          allowClear
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/citizens/new')}>
          Добавить гражданина
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '200'],
          showTotal: (total) => `Всего записей: ${total}`,
        }}
        onChange={(pagination) => setPagination(pagination)}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setSelectedCitizen(record),
        })}
        scroll={{ x: 1200 }}
      />

      <Modal
        title="Карточка гражданина"
        width={800}
        open={!!selectedCitizen}
        onCancel={() => setSelectedCitizen(null)}
        footer={null}
        destroyOnClose
      >
        {selectedCitizen && <CitizenCard data={selectedCitizen} />}
      </Modal>
    </div>
  );
};

export default CitizensListPage;