import React, { useState, useEffect, useMemo } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Modal, 
  message, 
  Dropdown, 
  Menu, 
  Checkbox,
  Collapse 
} from 'antd';
import { 
  SettingOutlined, 
  ExportOutlined, 
  // MenuFoldOutlined, 
  // MenuUnfoldOutlined 
} from '@ant-design/icons';
import menuFoldIcon from '../assets/svgs/menu-fold-icon.svg';
import { useNavigate } from 'react-router-dom';
import CitizenCardPage from './CitizenCardPage';
import '../styles/CitizensListPage.scss';

const { Panel } = Collapse;

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
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const navigate = useNavigate();

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
        
        const initialColumns = [
          'id',
          'fullName',
          'birthDate',
          'maritalStatus',
          'email',
          'passportNumber',
          'registrationDate',
          'socialSecurityNumber',
          'education',
          'phone',
          'address'
        ];
        setVisibleColumns(initialColumns);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => [
    { title: 'ID', dataIndex: 'id', sorter: (a, b) => a.id - b.id, width: 100 },
    {
      title: 'ФИО',
      dataIndex: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div className="name-filter">
          <Input
            placeholder="Поиск по ФИО"
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
          />
          <Button type="primary" onClick={confirm}>
            Поиск
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.fullName.toLowerCase().includes(value.toLowerCase()),
    },
    { title: 'Дата рождения', dataIndex: 'birthDate' },
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
    { title: 'Дата регистрации', dataIndex: 'registrationDate' },
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
    { title: 'Телефон', dataIndex: 'phone' },
    { title: 'Адрес', dataIndex: 'address' },
  ], []);

  const handleExport = (format) => {
    const exportData = selectedRowKeys.length > 0 
      ? data.filter(item => selectedRowKeys.includes(item.id)) 
      : data;

    if (exportData.length === 0) {
      message.warning('Нет данных для экспорта');
      return;
    }
    message.success(`Экспортировано записей: ${exportData.length}`);
  };

  const handleMassDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Выберите записи для удаления');
      return;
    }

    Modal.confirm({
      title: `Удалить ${selectedRowKeys.length} записей?`,
      content: 'Это действие нельзя отменить!',
      onOk: () => {
        setData(prev => prev.filter(item => !selectedRowKeys.includes(item.id)));
        setSelectedRowKeys([]);
        message.success('Записи успешно удалены');
      },
    });
  };

  const exportMenuItems = [
    {
      key: 'csv',
      label: <span onClick={() => handleExport('csv')}>CSV</span>,
    },
    {
      key: 'xlsx',
      label: <span onClick={() => handleExport('xlsx')}>Excel</span>,
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    preserveSelectedRowKeys: true,
  };

  const columnMenu = (
    <Menu className="column-menu">
      <div className="column-menu-header">
        <Button 
          type="link" 
          onClick={() => setVisibleColumns(columns.map(c => c.dataIndex))}
        >
          Выбрать все
        </Button>
        <Button 
          type="link" 
          onClick={() => setVisibleColumns([])}
        >
          Сбросить
        </Button>
      </div>
      <Checkbox.Group
        value={visibleColumns}
        onChange={setVisibleColumns}
      >
        {columns.map(col => (
          <Menu.Item key={col.dataIndex}>
            <Checkbox value={col.dataIndex}>{col.title}</Checkbox>
          </Menu.Item>
        ))}
      </Checkbox.Group>
    </Menu>
  );


  return (
    <div className="citizens-page">
      <div className="toolbar-control">
      <Input.Search
          className="search-input"
          placeholder="Поиск по всем полям"
          allowClear
        />
        <Button 
          className="toolbar-toggle-button"
          type="text" 
          icon={<img src={menuFoldIcon} alt="Menu Fold Icon" />}
          // icon={isToolbarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setIsToolbarCollapsed(!isToolbarCollapsed)}
        />
      </div>

      <Collapse 
        className="toolbar-collapse" 
        activeKey={isToolbarCollapsed ? [] : ['toolbar']}
        bordered={false}
        ghost
      >
        <Panel 
          className="toolbar-panel"
          key="toolbar" 
          showArrow={false}
          header={null}
        >

          
          <div className="main-toolbar">
            <Button 
              className="add-button"
              type="primary" 
              onClick={() => navigate('/citizens/new')}
            >
              Добавить гражданина
            </Button>
            
            <Dropdown 
              className="export-dropdown"
              menu={{ items: exportMenuItems }}
              trigger={['click']}
              disabled={data.length === 0}
            >
              <Button 
                className="export-button"
                type="primary" 
                icon={<ExportOutlined />}
              >
                Экспорт данных
                {selectedRowKeys.length > 0 && <span className="export-counter">({selectedRowKeys.length})</span>}
              </Button>
            </Dropdown>

            <Button 
              className="delete-button"
              danger 
              onClick={handleMassDelete} 
              disabled={selectedRowKeys.length === 0}
            >
              Удалить выбранные <span className="delete-counter">({selectedRowKeys.length})</span>
            </Button>

            <Dropdown 
              className="columns-dropdown"
              overlay={columnMenu} 
              trigger={['click']}
            >
              <Button className="columns-button" icon={<SettingOutlined />}>
                Столбцы <span className="columns-counter">{visibleColumns.length}/{columns.length}</span>
              </Button>
            </Dropdown>
          </div>
        </Panel>
      </Collapse>

      <Table
        className="citizens-table"
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
        onChange={(pagination) => setPagination(pagination)}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => setSelectedCitizen(record),
        })}
        scroll={{ x: 1500 }}
      />

      <Modal
        className="citizen-modal"
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