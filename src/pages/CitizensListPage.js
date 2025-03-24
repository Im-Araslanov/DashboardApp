import React, { useState, useEffect, useMemo } from 'react';
import { 
  Table, 
  Input, 
  Button, 
  Modal, 
  message, 
  Dropdown, 
  Checkbox,
  Collapse 
} from 'antd';
import { 
  SettingOutlined, 
  ExportOutlined
} from '@ant-design/icons';
import menuFoldIcon from '../assets/svgs/menu-fold-icon.svg';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState(['toolbar']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/citizens");
        const result = await response.json();
        
        setData(result);
        setPagination(prev => ({
          ...prev,
          total: result.length
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
      } catch (error) {
        message.error('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.refresh) {
      fetchData();
      navigate(location.pathname, { replace: true, state: {} });
    } else {
      fetchData();
    }
  }, [location.state, location.pathname, navigate]);

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
    { key: 'csv', label: <span onClick={() => handleExport('csv')}>CSV</span> },
    { key: 'xlsx', label: <span onClick={() => handleExport('xlsx')}>Excel</span> },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
    preserveSelectedRowKeys: true,
  };

  const columnMenuItems = [
    {
      key: 'selection-controls',
      label: (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '8px 12px',
          gap: '8px'
        }}>
          <Button 
            type="link" 
            onClick={() => setVisibleColumns(columns.map(c => c.dataIndex))}
            style={{ flex: 1 }}
          >
            Выбрать все
          </Button>
          <Button 
            type="link" 
            onClick={() => setVisibleColumns([])}
            style={{ flex: 1 }}
          >
            Сбросить
          </Button>
        </div>
      ),
      style: { cursor: 'default' },
      disabled: true
    },
    { type: 'divider' },
    ...columns.map(col => ({
      key: col.dataIndex,
      label: (
        <Checkbox 
          checked={visibleColumns.includes(col.dataIndex)}
          onChange={(e) => {
            if (e.target.checked) {
              setVisibleColumns(prev => [...prev, col.dataIndex]);
            } else {
              setVisibleColumns(prev => prev.filter(c => c !== col.dataIndex));
            }
          }}
          style={{ marginLeft: 8 }}
        >
          {col.title}
        </Checkbox>
      )
    }))
  ];

  const handleCollapseChange = (keys) => {
    setIsToolbarCollapsed(keys.length === 0);
    setActiveKey(keys);
  };

  const collapseItems = [
    {
      key: 'toolbar',
      label: null,
      showArrow: false,
      children: (
        <div className="main-toolbar">
          <Button 
            className="add-button"
            type="primary" 
            onClick={() => navigate('/new-citizen')}
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
            menu={{ items: columnMenuItems }}
            trigger={['click']}
          >
            <Button className="columns-button" icon={<SettingOutlined />}>
              Столбцы <span className="columns-counter">{visibleColumns.length}/{columns.length}</span>
            </Button>
          </Dropdown>
        </div>
      )
    }
  ];

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
          onClick={() => {
            setIsToolbarCollapsed(!isToolbarCollapsed);
            setActiveKey(isToolbarCollapsed ? ['toolbar'] : []);
          }}
        />
      </div>

      <Collapse 
        className="toolbar-collapse" 
        activeKey={activeKey}
        onChange={handleCollapseChange}
        bordered={false}
        ghost
        items={collapseItems}
      />

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