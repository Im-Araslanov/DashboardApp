import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Select, message, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import CitizenCardPage from './CitizenCardPage';
import '../styles/CitizensListPage.scss';

const CitizensListPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCitizen, setSelectedCitizen] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [pagination, setPagination] = useState({ 
    current: 1, 
    pageSize: 50,
    total: 0
  });
  const [professions, setProfessions] = useState([]);
  const [workplaces, setWorkplaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/citizens.json');
        const { citizens } = await response.json();
        
        const uniqueProfessions = [...new Set(citizens.map(c => c.profession))];
        const uniqueWorkplaces = [...new Set(citizens.map(c => c.workplace))];
        
        setData(citizens);
        setProfessions(uniqueProfessions);
        setWorkplaces(uniqueWorkplaces);
        setVisibleColumns(columns.map(col => col.dataIndex));
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
    { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id, width: 100 },
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Поиск по ФИО"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button type="primary" onClick={confirm} size="small" style={{ width: 90 }}>
            Поиск
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.fullName.toLowerCase().includes(value.toLowerCase()),
    },
    { title: 'Дата рождения', dataIndex: 'birthDate', sorter: (a, b) => new Date(a.birthDate) - new Date(b.birthDate) },
    {
      title: 'Семейное положение',
      dataIndex: 'maritalStatus',
      filters: [
        { text: 'Не замужем', value: 'Не замужем' },
        { text: 'Замужем', value: 'Замужем' },
        { text: 'Женат', value: 'Женат' },
        { text: 'Не женат', value: 'Не женат' },
      ],
      onFilter: (value, record) => record.maritalStatus === value,
    },
    { title: 'Почта', dataIndex: 'email' },
    { title: 'Номер паспорта', dataIndex: 'passportNumber' },
    { title: 'Дата регистрации', dataIndex: 'registrationDate', sorter: (a, b) => new Date(a.registrationDate) - new Date(b.registrationDate) },
    { title: 'СНИЛС', dataIndex: 'socialSecurityNumber' },
    {
      title: 'Образование',
      dataIndex: 'education',
      filters: [
        { text: 'Высшее', value: 'Высшее' },
        { text: 'Среднее профессиональное', value: 'Среднее профессиональное' },
        { text: 'Среднее', value: 'Среднее' },
      ],
      onFilter: (value, record) => record.education === value,
    },
    {
      title: 'Профессия',
      dataIndex: 'profession',
      filters: professions.map(p => ({ text: p, value: p })),
      onFilter: (value, record) => record.profession === value,
    },
    {
      title: 'Компания',
      dataIndex: 'workplace',
      filters: workplaces.map(w => ({ text: w, value: w })),
      onFilter: (value, record) => record.workplace === value,
    },
    { title: 'Телефон', dataIndex: 'phone' },
    { title: 'Адрес', dataIndex: 'address' },
  ];

  const handleExport = (format) => {
    const exportData = selectedRowKeys.length > 0 
      ? data.filter(item => selectedRowKeys.includes(item.id)) 
      : data;

    if (exportData.length === 0) {
      message.warning('Нет данных для экспорта');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Citizens');
    
    const fileName = selectedRowKeys.length > 0 
      ? `citizens_selected_${selectedRowKeys.length}_${new Date().toISOString().slice(0,10)}` 
      : `citizens_full_${new Date().toISOString().slice(0,10)}`;

    XLSX.writeFile(workbook, `${fileName}.${format}`, { bookType: format });
    message.success(`Экспортировано записей: ${exportData.length}`);
  };

  const handleMassDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Выберите записи для удаления');
      return;
    }

    Modal.confirm({
      title: `Вы уверены, что хотите удалить ${selectedRowKeys.length} записей?`,
      content: 'Это действие нельзя отменить!',
      onOk: () => {
        const newData = data.filter(item => !selectedRowKeys.includes(item.id));
        setData(newData);
        setSelectedRowKeys([]);
        message.success('Записи успешно удалены');
      },
    });
  };

  const exportMenuItems = [
    {
      key: 'csv',
      label: (
        <span onClick={() => handleExport('csv')}>
          Экспорт в CSV {selectedRowKeys.length > 0 && `(${selectedRowKeys.length} зап.)`}
        </span>
      ),
    },
    {
      key: 'xlsx',
      label: (
        <span onClick={() => handleExport('xlsx')}>
          Экспорт в Excel {selectedRowKeys.length > 0 && `(${selectedRowKeys.length} зап.)`}
        </span>
      ),
    },
  ];

  const columnOptions = columns.map(col => ({
    label: col.title,
    value: col.dataIndex,
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    preserveSelectedRowKeys: true,
  };

  return (
    <div className="citizens-list-page">
      <div className="toolbar">
        <Input.Search
          placeholder="Поиск по всем полям"
          allowClear
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={() => navigate('/citizens/new')}>
          Добавить гражданина
        </Button>
        
        <Dropdown.Button
          menu={{ items: exportMenuItems }}
          onClick={() => handleExport('xlsx')}
          disabled={data.length === 0}
        >
          Экспорт данных
        </Dropdown.Button>

        <Button danger onClick={handleMassDelete} disabled={selectedRowKeys.length === 0}>
          Удалить выбранные ({selectedRowKeys.length})
        </Button>

        <Select
          mode="multiple"
          placeholder="Видимые столбцы"
          value={visibleColumns}
          onChange={setVisibleColumns}
          style={{ width: 200 }}
          options={columnOptions}
        />
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns.filter(col => visibleColumns.includes(col.dataIndex))}
        dataSource={data}
        loading={loading}
        pagination={{
          ...pagination,
          showSizeChanger: true,
          pageSizeOptions: ['50', '100', '200'],
          showTotal: (total) => `Всего записей: ${total}`,
        }}
        onChange={setPagination}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setSelectedCitizen(record),
        })}
        scroll={{ x: 1500 }}
      />

      <Modal
        title="Карточка гражданина"
        width={800}
        open={!!selectedCitizen}
        onCancel={() => setSelectedCitizen(null)}
        footer={null}
        destroyOnClose
      >
        {selectedCitizen && <CitizenCardPage citizenData={selectedCitizen} />}
      </Modal>
    </div>
  );
};

export default CitizensListPage;